import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addComment, bookMarkPost, getArticleById, getComments, likePost, trackShare, unlikePost, unbookMarkPost } from '../../api/post';

export default function ArticleDetail() {
  const { postId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const token = localStorage.getItem('token');
  const userId = (() => { try { const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'); return JSON.parse(atob(payload)).userId; } catch { return null; } })();
  const liked = Boolean(article?.likes?.some((id) => String(id) === String(userId)));
  const saved = Boolean(article?.bookmarkedBy?.some((id) => String(id) === String(userId)));

  useEffect(() => {
    let active = true;
    Promise.all([getArticleById(postId), getComments(postId)]).then(([data, commentData]) => {
      if (!active) return;
      setArticle(data);
      setComments(commentData?.data || []);
    }).catch(() => { if (active) setNotice('This post could not be loaded. It may have been removed.'); });
    return () => { active = false; };
  }, [postId]);

  const toggleLike = async () => {
    if (!token) return setNotice('Sign in to like this post.');
    try { const result = liked ? await unlikePost(postId) : await likePost(postId); if (result?.data) setArticle((item) => ({ ...item, likes: result.data.likes })); }
    catch { setNotice('Could not update your like. Please try again.'); }
  };
  const toggleSave = async () => {
    if (!token) return setNotice('Sign in to save this post.');
    try {
      if (saved) await unbookMarkPost(postId); else await bookMarkPost(postId);
      setArticle((item) => ({ ...item, bookmarkedBy: saved ? item.bookmarkedBy.filter((id) => String(id) !== String(userId)) : [...item.bookmarkedBy, userId] }));
    } catch { setNotice('Could not update your saved posts. Please try again.'); }
  };
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: article.title || article.stories?.[0]?.heading, url });
      else { await navigator.clipboard.writeText(url); setNotice('Link copied to clipboard.'); }
      await trackShare(postId);
    } catch (error) { if (error?.name !== 'AbortError') setNotice('Could not share this post.'); }
  };
  const submitComment = async (event) => {
    event.preventDefault();
    if (!token) return setNotice('Sign in to join the discussion.');
    if (!commentText.trim()) return;
    setBusy(true);
    try { const result = await addComment(postId, commentText.trim()); setComments((items) => [...items, result.comment]); setCommentText(''); }
    catch { setNotice('Could not add your comment. Please try again.'); }
    finally { setBusy(false); }
  };

  if (!article) return <main className="min-h-[70vh] bg-gradient-to-b from-violet-50 to-slate-50 px-4 py-16 sm:py-24"><section className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-lg shadow-violet-100"><div className="mx-auto mb-5 h-12 w-12 animate-pulse rounded-2xl bg-violet-100"/><h1 className="text-xl font-black text-slate-900">{notice ? 'Post unavailable' : 'Opening your article'}</h1><p className="mt-2 text-sm leading-6 text-slate-500">{notice || 'Loading the story and its discussion…'}</p><Link to="/" className="mt-6 inline-flex rounded-full bg-violet-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-800">Back to explore</Link></section></main>;
  const title = article.title || article.stories?.[0]?.heading || 'Untitled post';
  const body = article.body || article.stories?.map((slide) => slide.description).filter(Boolean).join('\n\n') || '';
  const cover = article.coverImage || article.stories?.[0]?.image;
  return <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#ede9fe_0,_#f8fafc_38rem,_#f8fafc_100%)] px-0 pb-24 pt-4 sm:px-5 sm:pb-16 sm:pt-10">
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 px-4 sm:px-0"><Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-bold text-violet-800 shadow-sm backdrop-blur transition hover:-translate-x-0.5 hover:bg-white">← <span>Back to feed</span></Link></div>
      <article className="overflow-hidden bg-white shadow-xl shadow-slate-900/5 sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200/70">
      <header className="px-5 pb-7 pt-8 sm:px-12 sm:pb-10 sm:pt-12">
        <p className="inline-flex rounded-full bg-violet-50 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[.14em] text-violet-700">{article.chooseCategory || article.stories?.[0]?.chooseCategory || 'Article'}</p>
        <h1 className="mt-5 max-w-4xl text-[2rem] font-black leading-[1.1] tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-5xl sm:leading-[1.08]">{title}</h1>
        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-4 text-sm text-slate-500">
          <Link to={article.author?._id ? `/creator/${article.author._id}` : '#'} className="group flex items-center gap-2.5 font-bold text-slate-800"><img className="h-11 w-11 rounded-full object-cover ring-2 ring-violet-100" src={article.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author?.username || 'Creator')}`} alt="" /><span className="group-hover:text-violet-700">@{article.author?.username || 'Creator'}</span></Link>
          <span className="hidden text-slate-300 sm:inline">•</span><time className="w-[calc(100%-4rem)] sm:w-auto">{new Date(article.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time><span className="hidden text-slate-300 sm:inline">•</span><span>{article.viewCount || 0} reads</span>
        </div>
      </header>
      {cover && <div className="bg-slate-100 sm:px-8"><img src={cover} alt="" className="max-h-[560px] min-h-48 w-full object-cover sm:rounded-2xl" /></div>}
      <div className="px-5 py-8 sm:px-12 sm:py-12"><div className="mx-auto max-w-[68ch] whitespace-pre-wrap break-words text-[17px] leading-[1.85] text-slate-700 sm:text-[19px] sm:leading-[1.9]">{body}</div>
        {article.tags?.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">#{tag}</span>)}</div>}
        <div className="mx-auto mt-9 hidden max-w-[68ch] flex-wrap gap-3 border-y border-slate-100 py-5 sm:flex"><button onClick={toggleLike} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${liked ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700'}`}>{liked ? '♥ Liked' : '♡ Like'} · {article.likes?.length || 0}</button><button onClick={toggleSave} className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700">{saved ? '✓ Saved' : '＋ Save'}</button><button onClick={share} className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700">↗ Share · {article.shareCount || 0}</button></div>
        {notice && <p role="status" className="mt-4 text-sm text-violet-700">{notice}</p>}
        <section className="mx-auto mt-12 max-w-[68ch] border-t border-slate-100 pt-8"><div className="flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-violet-600">Community</p><h2 className="mt-1 text-2xl font-black text-slate-900">Join the discussion</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">{comments.length}</span></div><form onSubmit={submitComment} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end"><textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} maxLength={1000} rows={3} placeholder="Share a thoughtful comment…" className="min-h-24 min-w-0 flex-1 resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100" /><button disabled={busy} className="rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-violet-700 disabled:opacity-50">{busy ? 'Posting…' : 'Post comment'}</button></form><div className="mt-6 space-y-3">{comments.map((comment) => <div key={comment._id} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5"><p className="text-sm font-bold text-slate-800">@{comment.author?.username || 'Reader'} <span className="ml-2 font-normal text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span></p><p className="mt-2 whitespace-pre-wrap break-words leading-7 text-slate-700">{comment.text}</p></div>)}</div></section>
      </div>
      </article>
    </div>
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_rgba(15,23,42,.08)] backdrop-blur sm:hidden"><div className="mx-auto flex max-w-lg gap-2"><button onClick={toggleLike} className={`min-h-11 flex-1 rounded-xl px-2 text-sm font-bold ${liked ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>{liked ? '♥' : '♡'} {article.likes?.length || 0}</button><button onClick={toggleSave} className="min-h-11 flex-1 rounded-xl bg-violet-50 px-2 text-sm font-bold text-violet-800">{saved ? '✓ Saved' : '＋ Save'}</button><button onClick={share} className="min-h-11 flex-1 rounded-xl bg-slate-900 px-2 text-sm font-bold text-white">↗ Share</button></div></div>
  </main>;
}
