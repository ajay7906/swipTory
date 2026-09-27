import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStatuses } from '../../api/post';
import StoryStatus from '../status/StoryStatus';

export default function YourStoryCompo() {
  const [statuses, setStatuses] = useState([]);
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    let alive = true;
    getStatuses().then((result) => { if (alive) setStatuses(result?.data || []); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  const grouped = [...new Map(statuses.map((status) => [String(status.postedBy), status])).values()];
  return <section className="mx-auto mb-7 max-w-7xl rounded-3xl border border-slate-100 bg-white px-4 py-5 shadow-sm sm:px-6">
    <div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-black text-slate-900">Stories</h2><p className="text-xs text-slate-500">Quick updates from you and creators you follow</p></div><Link to="/addstory" className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 hover:bg-violet-100">＋ Create status</Link></div>
    <div className="flex gap-4 overflow-x-auto pb-2">
      <Link to="/addstory" className="w-[76px] shrink-0 text-center"><span className="mx-auto flex h-[66px] w-[66px] items-center justify-center rounded-full border-2 border-dashed border-violet-300 bg-violet-50 text-2xl text-violet-600">＋</span><span className="mt-2 block truncate text-xs font-semibold text-slate-700">Your story</span></Link>
      {grouped.map((status) => <button key={status._id} onClick={() => setActiveId(status._id)} className="w-[76px] shrink-0 text-center"><span className="mx-auto block h-[66px] w-[66px] rounded-full bg-gradient-to-tr from-pink-500 via-violet-500 to-amber-400 p-[3px]"><span className="block h-full w-full rounded-full bg-white p-[3px]"><img className="h-full w-full rounded-full object-cover" src={status.author?.avatar || status.coverImage || status.stories?.[0]?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(status.author?.username || 'Story')}`} alt="" /></span></span><span className="mt-2 block truncate text-xs font-semibold text-slate-700">{status.author?.username || 'Creator'}</span></button>)}
      {grouped.length === 0 && <p className="self-center py-3 text-sm text-slate-400">No active statuses yet. Follow creators to see their updates here.</p>}
    </div>
    {activeId && <StoryStatus postId={activeId} closeStoryModal={() => setActiveId(null)} />}
  </section>;
}
