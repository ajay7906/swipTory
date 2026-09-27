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

  if (!article) return <main className="min-h-screen bg-slate-50 px-4 py-20 text-center text-slate-500">{notice || 'Loading article…'}</main>;
  const title = article.title || article.stories?.[0]?.heading || 'Untitled post';
  const body = article.body || article.stories?.map((slide) => slide.description).filter(Boolean).join('\n\n') || '';
  const cover = article.coverImage || article.stories?.[0]?.image;
  return <main className="min-h-screen bg-[#f7f6f3] px-4 py-8 sm:py-12">
    <article className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70">
      <header className="px-5 pb-6 pt-7 sm:px-10 sm:pt-10">
        <Link to="/" className="text-sm font-bold text-violet-700 hover:text-violet-900">← Back to feed</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-violet-700">{article.chooseCategory || article.stories?.[0]?.chooseCategory || 'Article'}</p>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link to={article.author?._id ? `/creator/${article.author._id}` : '#'} className="flex items-center gap-2 font-semibold text-slate-800"><img className="h-10 w-10 rounded-full object-cover" src={article.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author?.username || 'Creator')}`} alt="" />@{article.author?.username || 'Creator'}</Link>
          <span>·</span><time>{new Date(article.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time><span>·</span><span>{article.viewCount || 0} views</span>
        </div>
      </header>
      {cover && <img src={cover} alt="" className="max-h-[520px] w-full bg-slate-100 object-cover" />}
      <div className="px-5 py-8 sm:px-10 sm:py-10"><div className="whitespace-pre-wrap break-words text-[17px] leading-8 text-slate-700 sm:text-lg sm:leading-9">{body}</div>
        {article.tags?.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">#{tag}</span>)}</div>}
        <div className="mt-8 flex flex-wrap gap-3 border-y border-slate-100 py-4"><button onClick={toggleLike} className={`rounded-full px-4 py-2 text-sm font-bold ${liked ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>{liked ? '♥ Liked' : '♡ Like'} · {article.likes?.length || 0}</button><button onClick={toggleSave} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">{saved ? '✓ Saved' : '＋ Save'}</button><button onClick={share} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">↗ Share · {article.shareCount || 0}</button></div>
        {notice && <p role="status" className="mt-4 text-sm text-violet-700">{notice}</p>}
        <section className="mt-9"><h2 className="text-xl font-black text-slate-900">Discussion <span className="text-slate-400">{comments.length}</span></h2><form onSubmit={submitComment} className="mt-4 flex flex-col gap-3 sm:flex-row"><textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} maxLength={1000} rows={2} placeholder="Share a thoughtful comment…" className="min-w-0 flex-1 resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500" /><button disabled={busy} className="self-end rounded-xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-violet-700 disabled:opacity-50">{busy ? 'Posting…' : 'Comment'}</button></form><div className="mt-6 space-y-4">{comments.map((comment) => <div key={comment._id} className="rounded-2xl bg-slate-50 p-4"><p className="text-sm font-bold text-slate-800">@{comment.author?.username || 'Reader'} <span className="ml-2 font-normal text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span></p><p className="mt-2 whitespace-pre-wrap text-slate-700">{comment.text}</p></div>)}</div></section>
      </div>
    </article>
  </main>;
}
