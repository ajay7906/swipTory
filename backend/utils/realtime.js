const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

let io;

function initializeRealtime(httpServer, origins) {
  io = new Server(httpServer, {
    cors: { origin: origins, methods: ['GET', 'POST'], credentials: true },
    transports: ['websocket', 'polling'],
    pingInterval: 25_000,
    pingTimeout: 20_000,
    connectionStateRecovery: { maxDisconnectionDuration: 2 * 60 * 1000, skipMiddlewares: false },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication required'));
      const decoded = jwt.verify(token, process.env.SECRET_CODE);
      const exists = await User.exists({ _id: decoded.userId });
      if (!exists) return next(new Error('Account not found'));
      socket.data.userId = String(decoded.userId);
      next();
    } catch (_) { next(new Error('Invalid or expired token')); }
  });

  io.on('connection', (socket) => {
    socket.join(`user:${socket.data.userId}`);
  });
  return io;
}

function getIO() { return io; }

module.exports = { initializeRealtime, getIO };
