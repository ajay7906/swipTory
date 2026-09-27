import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const api = 'https://swiptory-2.onrender.com/api/v1/user';
export default function AccountAction({ mode }) {
  const location = useLocation(); const token = new URLSearchParams(location.search).get('token');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [status, setStatus] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (mode === 'verify' && token) { axios.post(`${api}/verify-email`, { token }).then((r) => setStatus(r.data.message)).catch((e) => setStatus(e.response?.data?.errorMessage || 'Verification link is invalid or expired.')); }
  }, [mode, token]);
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setStatus('');
    try {
      const result = mode === 'recover' ? await axios.post(`${api}/forgot-password`, { email }) : await axios.post(`${api}/reset-password`, { token, password });
      setStatus(result.data.message);
    } catch (error) { setStatus(error.response?.data?.errorMessage || 'Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  };
  const title = mode === 'verify' ? 'Verify your email' : mode === 'reset' ? 'Choose a new password' : 'Reset your password';
  return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-white to-rose-100 p-4"><section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-fuchsia-500 text-2xl text-white">✦</div><p className="text-xs font-bold uppercase tracking-widest text-violet-600">SwipTory account</p><h1 className="mt-2 text-3xl font-black text-gray-900">{title}</h1><p className="mt-2 text-sm text-gray-500">{mode === 'recover' ? 'We’ll email you a secure link if an account matches.' : mode === 'reset' ? 'Reset links expire after one hour.' : 'We’re checking your secure verification link.'}</p>
    {mode === 'recover' && <form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-sm font-semibold text-gray-700">Email address<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-violet-300" placeholder="you@example.com" /></label><button disabled={busy} className="w-full rounded-xl bg-violet-700 p-3 font-bold text-white disabled:opacity-50">{busy ? 'Sending…' : 'Send reset link'}</button></form>}
    {mode === 'reset' && <form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-sm font-semibold text-gray-700">New password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-violet-300" placeholder="At least 8 characters" /></label><button disabled={busy || !token} className="w-full rounded-xl bg-violet-700 p-3 font-bold text-white disabled:opacity-50">{busy ? 'Updating…' : 'Update password'}</button></form>}
    {mode === 'verify' && !token && <p className="mt-6 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">This verification link is missing its token.</p>}
    {status && <p role="status" className="mt-5 rounded-xl bg-violet-50 p-4 text-sm text-violet-800">{status}</p>}<Link to="/" className="mt-7 inline-block text-sm font-bold text-violet-700 hover:underline">Return to SwipTory</Link>
  </section></main>;
}
