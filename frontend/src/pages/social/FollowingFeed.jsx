import { useEffect, useState } from 'react';
import axios from 'axios';
import MainCompo from '../../components/main/MainCompo';

const api = 'https://swiptory-2.onrender.com/api/v1/user';
export default function FollowingFeed() {
  const [stories, setStories] = useState([]); const [loading, setLoading] = useState(true); const [notice, setNotice] = useState('');
  useEffect(() => {
    axios.get(`${api}/feed/following`, { headers: { Authorization: localStorage.getItem('token') } })
      .then((response) => setStories(response.data.data || []))
      .catch((error) => setNotice(error.response?.data?.message || 'Sign in and follow creators to build your feed.'))
      .finally(() => setLoading(false));
  }, []);
  return <main className="min-h-screen bg-gradient-to-b from-violet-50 to-white px-4 py-10"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-widest text-violet-600">Your circle</p><h1 className="mt-2 text-4xl font-black text-gray-900">Following</h1><p className="mt-2 text-gray-500">Fresh stories from the creators you follow.</p>{loading ? <div className="py-20 text-center text-gray-500">Loading your feed…</div> : stories.length ? <div className="mt-8"><MainCompo sendData={stories} allData="Following" /></div> : <div className="mt-8 rounded-3xl bg-white p-12 text-center shadow-sm"><p className="text-gray-600">{notice || 'Your feed is quiet for now.'}</p><p className="mt-2 text-sm text-gray-400">Explore a creator profile and tap Follow to see their stories here.</p></div>}</div></main>;
}
