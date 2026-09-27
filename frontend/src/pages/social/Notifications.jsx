import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = 'https://swiptory-2.onrender.com/api/v1/user';
export default function Notifications() {
  const [items, setItems] = useState([]); const [error, setError] = useState('');
  useEffect(() => {
    const headers = { Authorization: localStorage.getItem('token') };
    axios.get(`${api}/notifications`, { headers }).then((response) => setItems(response.data.data || []))
      .then(() => axios.put(`${api}/notifications/read`, {}, { headers }))
      .catch((e) => setError(e.response?.data?.message || 'Sign in to see your notifications.'));
  }, []);
  const words = { like: 'liked your story', comment: 'commented on your story', follow: 'started following you' };
  return <main className="min-h-screen bg-gradient-to-br from-violet-50 to-rose-50 px-4 py-12"><section className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl"><header className="bg-gradient-to-r from-violet-700 to-fuchsia-600 p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-white/70">Your activity</p><h1 className="mt-2 text-3xl font-black">Notifications</h1></header>{error ? <p className="p-8 text-center text-gray-500">{error}</p> : !items.length ? <p className="p-10 text-center text-gray-500">You’re all caught up. New likes, comments, and followers will show up here.</p> : <div className="divide-y">{items.map((item) => <Link key={item._id} to={item.story ? `/share/${item.story}` : item.actor?._id ? `/creator/${item.actor._id}` : '/'} className={`flex items-center gap-4 p-5 hover:bg-violet-50 ${item.read ? '' : 'bg-violet-50/60'}`}><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-700 font-black text-white">{item.actor?.username?.[0]?.toUpperCase() || 'S'}</div><div className="flex-1"><p className="text-sm text-gray-800"><b>@{item.actor?.username || 'Someone'}</b> {words[item.type] || item.message}</p><p className="mt-1 text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p></div>{!item.read && <span className="h-2.5 w-2.5 rounded-full bg-violet-600" />}</Link>)}</div>}</section></main>;
}
