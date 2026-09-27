import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from './authContext';

const NotificationContext = createContext({ notifications: [], unreadCount: 0, ready: false, markAllRead: async () => {} });
const api = 'https://swiptory-2.onrender.com/api/v1/user';
const socketUrl = import.meta.env.VITE_SOCKET_URL || 'https://swiptory-2.onrender.com';

export function NotificationProvider({ children }) {
  const { isLoggedIns } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [connected, setConnected] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const seenIds = useRef(new Set());

  const refresh = useCallback(async (token) => {
    const response = await axios.get(`${api}/notifications`, { headers: { Authorization: token } });
    const items = response.data.data || [];
    setNotifications(items);
    setUnreadCount(response.data.unreadCount ?? items.reduce((total, item) => total + (item.read ? 0 : 1), 0));
    setHasMore(Boolean(response.data.hasMore));
    items.forEach((item) => seenIds.current.add(item._id));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!isLoggedIns || !token || token === 'undefined') {
      setNotifications([]); setUnreadCount(0); setConnected(false); setReady(true); return undefined;
    }
    let active = true;
    setReady(false);
    refresh(token).catch(() => {}).finally(() => { if (active) setReady(true); });
    const socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 10_000,
      timeout: 15_000,
    });
    const reloadAfterReconnect = () => { if (active) refresh(token).catch(() => {}); };
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('connect_error', () => setConnected(false));
    socket.on('notification:new', (incoming) => {
      if (!active || !incoming?._id) return;
      if (seenIds.current.has(incoming._id)) return;
      seenIds.current.add(incoming._id);
      setNotifications((current) => [incoming, ...current].slice(0, 50));
      setUnreadCount((count) => count + (incoming.read ? 0 : 1));
      const name = incoming.actor?.username ? `@${incoming.actor.username}` : 'Someone';
      toast.info(`${name} ${incoming.message || 'interacted with your story'}`, { toastId: incoming._id, autoClose: 4500 });
    });
    socket.on('connect', reloadAfterReconnect);
    return () => { active = false; socket.removeAllListeners(); socket.disconnect(); };
  }, [isLoggedIns, refresh]);

  const markAllRead = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') return;
    await axios.put(`${api}/notifications/read`, {}, { headers: { Authorization: token } });
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
    setUnreadCount(0);
  }, []);

  const loadMore = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || !hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = Math.floor(notifications.length / 50) + 1;
      const response = await axios.get(`${api}/notifications?page=${page}`, { headers: { Authorization: token } });
      const items = response.data.data || [];
      items.forEach((item) => seenIds.current.add(item._id));
      setNotifications((current) => [...current, ...items.filter((item) => !current.some((existing) => existing._id === item._id))]);
      setHasMore(Boolean(response.data.hasMore));
      setUnreadCount(response.data.unreadCount ?? unreadCount);
    } finally { setLoadingMore(false); }
  }, [hasMore, loadingMore, notifications.length, unreadCount]);

  const value = useMemo(() => ({ notifications, unreadCount, ready, connected, hasMore, loadingMore, loadMore, markAllRead }), [notifications, unreadCount, ready, connected, hasMore, loadingMore, loadMore, markAllRead]);
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => useContext(NotificationContext);
