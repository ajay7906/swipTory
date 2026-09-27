import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUserPost } from '../../api/post';
import AddStoryPage from '../../components/addStory/AddStory';

export default function Drafts() {
  const [drafts, setDrafts] = useState([]); const [editing, setEditing] = useState(null); const [error, setError] = useState('');
  const load = () => getAllUserPost().then((result) => setDrafts((result?.stories || []).filter((story) => story.isDraft))).catch(() => setError('Sign in to manage your drafts.'));
  useEffect(() => { load(); }, []);
  if (editing) return <AddStoryPage postId={editing._id} myStoryEdit={editing.stories} initialTags={editing.tags || []} />;
  return <main className="min-h-screen bg-gradient-to-br from-violet-50 to-white px-4 py-10"><div className="mx-auto max-w-5xl"><Link to="/profile" className="text-sm font-bold text-violet-700">← Your profile</Link><h1 className="mt-4 text-4xl font-black text-gray-900">Story drafts</h1><p className="mt-2 text-gray-500">Pick up where you left off, then publish when you’re ready.</p>{error && <p className="mt-6 rounded-xl bg-rose-50 p-4 text-rose-700">{error}</p>}{!error && !drafts.length && <div className="mt-8 rounded-2xl bg-white p-10 text-center text-gray-500 shadow">No drafts yet. Start a story and choose Save draft.</div>}<div className="mt-8 grid gap-4 sm:grid-cols-2">{drafts.map((draft) => <article key={draft._id} className="flex gap-4 rounded-2xl bg-white p-4 shadow"><div className="h-28 w-24 shrink-0 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${draft.stories?.[0]?.image || ''})` }} /><div className="min-w-0 flex-1"><span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">DRAFT · {draft.stories?.length || 0} slides</span><h2 className="mt-3 truncate font-bold text-gray-900">{draft.stories?.[0]?.heading || 'Untitled story'}</h2><p className="mt-1 text-sm text-gray-500">{draft.tags?.map((tag) => `#${tag}`).join(' ')}</p><button onClick={() => setEditing(draft)} className="mt-3 rounded-lg bg-violet-700 px-4 py-2 text-sm font-bold text-white">Continue editing</button></div></article>)}</div></div></main>;
}
