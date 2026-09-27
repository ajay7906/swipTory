import { useContext, useState } from 'react';
import { createPost, updatePostById } from '../../api/post';
import { showToast } from '../../utils/showToast';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const categories = ['Fruits', 'Sports', 'World', 'India', 'Education', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Art'];

export default function AddStoryPage({ myStoryEdit, myStoryHomeEdits, postId, initialTags = [] }) {
  const navigate = useNavigate();
  const { upDateNewStory } = useContext(AuthContext);
  const editing = Array.isArray(myStoryEdit) || Array.isArray(myStoryHomeEdits);
  const existing = Array.isArray(myStoryEdit) ? myStoryEdit : myStoryHomeEdits;
  const first = existing?.[0] || {};
  const [postType, setPostType] = useState('article');
  const [title, setTitle] = useState(first.heading || '');
  const [body, setBody] = useState(existing?.map((slide) => slide.description).filter(Boolean).join('\n\n') || '');
  const [image, setImage] = useState(first.image || '');
  const [category, setCategory] = useState(first.chooseCategory || '');
  const [tags, setTags] = useState(initialTags.join(', '));
  const [isDraft, setIsDraft] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadImage = (file) => {
    if (!file) return;
    if (file.size > 1_000_000) return showToast('Choose an image under 1 MB', { type: 'error' });
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const save = async (draft) => {
    if (!title.trim() || !body.trim() || !category || (postType === 'article' && !image.trim())) {
      showToast('Add a title, text, category, and an article cover image', { type: 'error' });
      return;
    }
    setLoading(true);
    const slide = { heading: title.trim(), description: body.trim(), image: image.trim(), chooseCategory: category };
    const metadata = { postType, title: slide.heading, body: slide.description, coverImage: slide.image, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean), isDraft: draft };
    try {
      if (editing) await updatePostById(postId, [slide], metadata);
      else await createPost([slide], metadata);
      setIsDraft(draft);
      upDateNewStory?.();
      showToast(draft ? 'Draft saved' : `${postType === 'status' ? 'Status' : 'Post'} published`, { type: 'success' });
      if (!draft) navigate(-1);
    } catch (error) {
      showToast(error?.response?.data?.message || 'Could not save your content', { type: 'error' });
    } finally { setLoading(false); }
  };

  return <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-pink-50 px-4 py-8 sm:px-6">
    <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-violet-100/70">
      <header className="bg-gradient-to-r from-violet-700 to-fuchsia-600 px-6 py-7 text-white sm:px-9">
        <button onClick={() => navigate(-1)} className="float-right rounded-full bg-white/15 px-3 py-1 text-sm hover:bg-white/25">Close</button>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-100">Create something</p>
        <h1 className="mt-2 text-3xl font-black">{editing ? 'Edit your content' : 'Share with your community'}</h1>
        <p className="mt-2 text-sm text-violet-100">A quick status or a thoughtful, category based article.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 p-5 sm:px-9 sm:pt-7">
        {[['status', '✨', 'Status', 'A quick update in your story tray'], ['article', '📝', 'Full post', 'A longer read in the category feed']].map(([value, icon, label, caption]) =>
          <button key={value} type="button" onClick={() => setPostType(value)} className={`rounded-2xl border p-4 text-left transition ${postType === value ? 'border-violet-500 bg-violet-50 ring-2 ring-violet-100' : 'border-slate-200 hover:border-violet-300'}`}>
            <span className="text-2xl">{icon}</span><span className="mt-2 block font-bold text-slate-900">{label}</span><span className="mt-1 block text-xs text-slate-500">{caption}</span>
          </button>)}
      </div>
      <form className="space-y-5 px-5 pb-7 sm:px-9" onSubmit={(event) => { event.preventDefault(); save(false); }}>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{postType === 'status' ? 'Status headline' : 'Post title'}</span><input maxLength={180} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give it a clear, memorable title" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{postType === 'status' ? 'Your update' : 'Article'}</span><textarea maxLength={postType === 'status' ? 1000 : 30000} rows={postType === 'status' ? 5 : 10} value={body} onChange={(event) => setBody(event.target.value)} placeholder={postType === 'status' ? 'What would you like to share today?' : 'Share useful information, a story, or your perspective…'} className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100" /><span className="mt-1 block text-right text-xs text-slate-400">{body.length}/{postType === 'status' ? 1000 : 30000}</span></label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Category</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-500"><option value="">Choose a category</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Tags <span className="font-normal text-slate-400">(comma separated)</span></span><input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="ideas, travel" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500" /></label>
        </div>
        <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">{postType === 'status' ? 'Image (optional)' : 'Cover image'}</span><input value={image.startsWith('data:') ? '' : image} onChange={(event) => setImage(event.target.value)} placeholder="Paste an image URL" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500" /><input type="file" accept="image/*" onChange={(event) => uploadImage(event.target.files?.[0])} className="mt-3 block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:font-semibold file:text-violet-700" /></label>
        {image && <img src={image} alt="Content preview" className="max-h-72 w-full rounded-2xl bg-slate-100 object-cover" />}
        {postType === 'status' && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">Statuses appear in the story tray for 24 hours. You can publish one slide at a time.</p>}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"><button type="button" disabled={loading} onClick={() => save(true)} className="rounded-xl border border-violet-200 px-5 py-3 font-semibold text-violet-700 hover:bg-violet-50 disabled:opacity-50">Save draft</button><button disabled={loading} className="rounded-xl bg-gradient-to-r from-violet-700 to-fuchsia-600 px-7 py-3 font-bold text-white shadow-lg shadow-violet-200 hover:brightness-105 disabled:opacity-60">{loading ? 'Saving…' : postType === 'status' ? 'Publish status' : 'Publish post'}</button></div>
      </form>
    </section>
  </main>;
}
