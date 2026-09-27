require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const { initializeRealtime } = require('./utils/realtime');

const bodyParser = require('body-parser');
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/storyRoutes")
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const corsOptions = {
    origin: [...new Set(["http://localhost:5173", "http://swip-tory-six.vercel.app", "https://swip-tory-six.vercel.app", process.env.CLIENT_URL].filter(Boolean))],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}
app.use(cors(corsOptions))

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods",
        "GET, HEAD, OPTIONS, POST, PUT, DELETE "
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    next();
        
      
})

app.use(express.json({ limit: '12mb' }));
app.use(bodyParser.json());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected!"))
    .catch((error) => console.log("DB failed to connect", error));

    

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);






app.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});



const PORT = process.env.PORT || 3000;
const io = initializeRealtime(server, corsOptions.origin);

async function startServer() {
    if (process.env.REDIS_URL) {
        const pubClient = createClient({ url: process.env.REDIS_URL });
        const subClient = pubClient.duplicate();
        pubClient.on('error', (error) => console.error('Socket Redis publisher error:', error.message));
        subClient.on('error', (error) => console.error('Socket Redis subscriber error:', error.message));
        await Promise.all([pubClient.connect(), subClient.connect()]);
        io.adapter(createAdapter(pubClient, subClient));
        console.log('Socket.IO Redis adapter connected');
    }
    server.listen(PORT, () => console.log(`Backend server running at port ${PORT}`));
}

startServer().catch((error) => {
    console.error('Backend startup failed:', error.message);
    process.exit(1);
});
