import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { getAllUserPost } from '../../api/post';

const usersApi = 'https://swiptory-2.onrender.com/api/v1/user';

export default function ProfilePage() {
  const { userId: viewedId } = useParams();
  const token = localStorage.getItem('token');
  const ownId = token ? jwtDecode(token).userId : null;
  const userId = viewedId || ownId;
  const isOwn = !viewedId || viewedId === ownId;
  const [profile, setProfile] = useState(null);
  const [stories, setStories] = useState([]);
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [following, setFollowing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  const load = async () => {
    try {
      if (isOwn) {
        const response = await axios.get(`${usersApi}/profile/${userId}`, { headers: { Authorization: token } });
        setProfile(response.data.user); setStories(response.data.stories); setBio(response.data.user.bio || ''); setAvatar(response.data.user.avatar || '');
      } else {
        const response = await axios.get(`${usersApi}/profile/${userId}`, { headers: token ? { Authorization: token } : {} });
        setProfile(response.data.user); setStories(response.data.stories); setFollowing(response.data.isFollowing);
      }
    } catch (error) { setNotice(error.response?.data?.message || 'Could not load this profile.'); }
  };
  useEffect(() => { if (userId) load(); else setNotice('Sign in to view your profile.'); }, [userId]);

  const save = async (event) => {
    event.preventDefault(); setBusy(true); setNotice('');
    try { const response = await axios.patch(`${usersApi}/profile`, { bio, avatar }, { headers: { Authorization: token } }); setProfile((current) => ({ ...current, ...response.data.user })); setNotice('Profile saved.'); }
    catch (error) { setNotice(error.response?.data?.message || 'Could not save your profile.'); }
    finally { setBusy(false); }
  };
  const toggleFollow = async () => {
    if (!token) return setNotice('Sign in to follow creators.');
    try {
      if (following) await axios.delete(`${usersApi}/${userId}/follow`, { headers: { Authorization: token } });
      else await axios.post(`${usersApi}/${userId}/follow`, {}, { headers: { Authorization: token } });
      setFollowing(!following); load();
    } catch (error) { setNotice(error.response?.data?.message || 'Could not update follow status.'); }
  };
  const block = async () => {
    if (!token || !window.confirm('Block this creator? Their profile will no longer appear to you.')) return;
    try { await axios.post(`${usersApi}/${userId}/block`, {}, { headers: { Authorization: token } }); setNotice('Creator blocked.'); }
    catch (error) { setNotice(error.response?.data?.message || 'Could not block this creator.'); }
  };
  const pickAvatar = (file) => {
    if (!file) return;
    if (file.size > 1_000_000) return setNotice('Choose a profile image under 1 MB.');
    const reader = new FileReader(); reader.onload = () => setAvatar(String(reader.result)); reader.readAsDataURL(file);
  };

  if (!profile) return <main className="mx-auto max-w-4xl p-8 text-center text-gray-600">{notice || 'Loading profile…'}</main>;
  return <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 px-4 py-10">
    <div className="mx-auto max-w-5xl">
      <section className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
        <div className="h-36 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500" />
        <div className="px-6 pb-7 md:px-10">
          <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <img src={avatar || profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}&background=6d28d9&color=fff`} alt="" className="h-28 w-28 rounded-3xl border-4 border-white bg-white object-cover shadow-lg" />
              <div className="pb-1"><h1 className="text-3xl font-black text-gray-900">@{profile.username}</h1><p className="mt-1 text-sm text-gray-500">Creator on SwipTory</p></div>
            </div>
            {!isOwn && <div className="flex gap-2"><button onClick={toggleFollow} className="rounded-xl bg-violet-700 px-5 py-3 font-bold text-white shadow hover:bg-violet-800">{following ? 'Following' : 'Follow creator'}</button><button onClick={block} className="rounded-xl border px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50">Block</button></div>}
            {isOwn && <div className="flex gap-2"><Link to="/drafts" className="rounded-xl border border-violet-200 px-4 py-3 text-center font-bold text-violet-700 hover:bg-violet-50">Drafts</Link><Link to="/addstory" className="rounded-xl bg-violet-700 px-5 py-3 text-center font-bold text-white shadow hover:bg-violet-800">Create a story</Link></div>}
          </div>
          <div className="mt-6 flex gap-8 text-sm"><span><b className="text-gray-900">{stories.length}</b> stories</span><span><b className="text-gray-900">{profile.followers}</b> followers</span><span><b className="text-gray-900">{profile.following}</b> following</span></div>
          {isOwn ? <form onSubmit={save} className="mt-7 grid gap-4 rounded-2xl bg-gray-50 p-5 md:grid-cols-[1fr_2fr_auto] md:items-end">
            <label className="text-sm font-semibold text-gray-700">Profile image<input type="file" accept="image/*" onChange={(e) => pickAvatar(e.target.files?.[0])} className="mt-2 block w-full text-xs" /></label>
            <label className="text-sm font-semibold text-gray-700">About you<textarea maxLength={300} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell readers what you love to write about…" className="mt-2 min-h-20 w-full rounded-xl border border-gray-200 bg-white p-3 font-normal outline-none focus:ring-2 focus:ring-violet-300"/><span className="text-xs font-normal text-gray-400">{bio.length}/300</span></label>
            <button disabled={busy} className="rounded-xl bg-gray-900 px-5 py-3 font-bold text-white disabled:opacity-50">{busy ? 'Saving…' : 'Save profile'}</button>
          </form> : <p className="mt-6 max-w-2xl text-gray-600">{profile.bio || 'This creator has not added a bio yet.'}</p>}
          {notice && <p role="status" className="mt-3 text-sm text-violet-700">{notice}</p>}
        </div>
      </section>
      <section className="mt-10"><div className="mb-5 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-violet-600">Creator library</p><h2 className="mt-1 text-2xl font-black text-gray-900">Published stories</h2></div></div>
        {!stories.length ? <p className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-sm">No published stories yet.</p> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{stories.map((story) => <Link key={story._id} to={`/share/${story._id}`} className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"><div className="h-52 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(0deg,#1119,transparent 75%),url(${story.stories?.[0]?.image})` }} /><div className="p-5"><span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">{story.chooseCategory || story.stories?.[0]?.chooseCategory}</span><h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-violet-700">{story.stories?.[0]?.heading}</h3><p className="mt-2 line-clamp-2 text-sm text-gray-500">{story.stories?.[0]?.description}</p><div className="mt-4 flex gap-4 text-xs text-gray-400"><span>♥ {story.likes?.length || 0}</span><span>◉ {story.views?.length || 0} views</span></div></div></Link>)}</div>}
      </section>
    </div>
  </main>;
}
