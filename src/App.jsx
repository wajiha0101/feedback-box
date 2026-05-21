import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    min-height: 100vh;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  /* ── PUBLIC THEME ─────────────────────────────── */
  .public-bg {
    font-family: 'Nunito', sans-serif;
    background: #fff0f6;
    background-image:
      radial-gradient(circle at 15% 15%, #ffd6e7 0%, transparent 45%),
      radial-gradient(circle at 85% 85%, #d6e8ff 0%, transparent 45%),
      radial-gradient(circle at 70% 10%, #ead6ff 0%, transparent 35%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 16px;
    position: relative;
  }

  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(70px);
    opacity: 0.3;
    pointer-events: none;
    animation: floatBlob 9s ease-in-out infinite;
    z-index: 0;
  }
  .blob-1 { width: 300px; height: 300px; background: #ffb3d1; top: -60px; left: -60px; }
  .blob-2 { width: 220px; height: 220px; background: #b3d4ff; bottom: -50px; right: -50px; animation-delay: 3s; }
  .blob-3 { width: 160px; height: 160px; background: #d4b3ff; top: 45%; left: 5%; animation-delay: 6s; }
  @keyframes floatBlob {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-18px) scale(1.04); }
  }

  .public-card {
    background: rgba(255,255,255,0.78);
    backdrop-filter: blur(24px);
    border-radius: 32px;
    padding: 44px 40px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 8px 48px rgba(255,140,190,0.16), 0 2px 12px rgba(0,0,0,0.05);
    border: 1.5px solid rgba(255,255,255,0.95);
    position: relative;
    z-index: 1;
    animation: popIn .5s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes popIn {
    from { opacity:0; transform:scale(.88) translateY(20px); }
    to   { opacity:1; transform:scale(1)  translateY(0); }
  }

  .pub-emoji { text-align:center; font-size:1.6rem; letter-spacing:6px; margin-bottom:12px; }

  .pub-title {
    font-family: 'Pacifico', cursive;
    font-size: 2.1rem;
    background: linear-gradient(135deg, #ff6eb4, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin-bottom: 4px;
  }
  .pub-sub {
    text-align: center;
    color: #c0a0b8;
    font-size: .88rem;
    font-weight: 700;
    margin-bottom: 32px;
  }

  .pub-label {
    display:block;
    font-size:.78rem;
    font-weight:900;
    color:#c47ea0;
    text-transform:uppercase;
    letter-spacing:.09em;
    margin-bottom:6px;
  }

  .pub-textarea, .pub-select {
    width:100%;
    padding:14px 16px;
    border-radius:18px;
    border:2px solid #ffd6eb;
    background:rgba(255,240,250,.55);
    font-family:'Nunito',sans-serif;
    font-size:.95rem;
    color:#5a3a50;
    outline:none;
    transition:border-color .2s,box-shadow .2s;
    margin-bottom:18px;
  }
  .pub-textarea { resize:none; }
  .pub-textarea:focus, .pub-select:focus {
    border-color:#ff80be;
    box-shadow:0 0 0 4px rgba(255,128,190,.14);
  }
  .pub-textarea::placeholder { color:#d4a0b8; }

  .pub-select {
    appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ff80be' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat;
    background-position:right 16px center;
    padding-right:40px;
    cursor:pointer;
  }

  .pub-btn {
    width:100%;
    padding:15px;
    border-radius:18px;
    border:none;
    background:linear-gradient(135deg,#ff6eb4,#a78bfa);
    color:#fff;
    font-family:'Nunito',sans-serif;
    font-size:1rem;
    font-weight:900;
    cursor:pointer;
    box-shadow:0 4px 22px rgba(255,110,180,.32);
    transition:transform .15s,box-shadow .15s;
    letter-spacing:.02em;
  }
  .pub-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(255,110,180,.42); }
  .pub-btn:active { transform:scale(.97); }
  .pub-btn:disabled { opacity:.65; cursor:not-allowed; }

  .pub-success {
    background:linear-gradient(135deg,#d4f5e2,#b8f0d0);
    border:2px solid #6dd99a;
    border-radius:16px;
    padding:14px;
    color:#267a4a;
    font-weight:800;
    font-size:.9rem;
    text-align:center;
    margin-bottom:18px;
    animation:popIn .35s ease both;
  }

  .pub-footer {
    text-align:center;
    margin-top:24px;
    position:relative;
    z-index:1;
  }
  .pub-footer a {
    display:inline-flex;
    align-items:center;
    gap:6px;
    font-size:.85rem;
    color:#fff;
    font-weight:700;
    text-decoration:none;
    letter-spacing:.03em;
    background:rgba(167,99,160,0.5);
    backdrop-filter:blur(8px);
    border:1.5px solid rgba(255,255,255,0.5);
    padding:10px 24px;
    border-radius:30px;
    transition:background .2s,transform .15s,box-shadow .15s;
    box-shadow:0 4px 16px rgba(180,80,150,0.2);
  }
  .pub-footer a:hover {
    background:rgba(167,99,160,0.7);
    transform:translateY(-2px);
    box-shadow:0 6px 20px rgba(180,80,150,0.3);
  }

  /* ── ADMIN THEME ──────────────────────────────── */
  .admin-bg {
    font-family:'Nunito',sans-serif;
    background:#fff0f6;
    background-image:
      radial-gradient(circle at 10% 10%, #ffd6e7 0%, transparent 40%),
      radial-gradient(circle at 90% 90%, #d6e8ff 0%, transparent 40%),
      radial-gradient(circle at 60% 5%,  #ead6ff 0%, transparent 30%);
    min-height:100vh;
    display:flex;
    flex-direction:column;
  }

  .admin-topbar {
    background:rgba(255,255,255,0.7);
    backdrop-filter:blur(20px);
    border-bottom:2px solid rgba(255,214,235,0.6);
    padding:0 32px;
    height:66px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    position:sticky;
    top:0;
    z-index:100;
    box-shadow:0 4px 20px rgba(255,140,190,0.1);
  }
  .admin-brand {
    font-family:'Pacifico',cursive;
    font-size:1.3rem;
    background:linear-gradient(135deg,#ff6eb4,#a78bfa);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    display:flex;
    align-items:center;
    gap:10px;
  }
  .admin-brand span {
    font-family:'Nunito',sans-serif;
    background:linear-gradient(135deg,#ff6eb4,#a78bfa);
    color:#fff;
    border-radius:20px;
    padding:3px 12px;
    font-size:.72rem;
    font-weight:900;
    letter-spacing:.06em;
    -webkit-text-fill-color:#fff;
  }

  .admin-signout {
    padding:8px 20px;
    border-radius:20px;
    border:2px solid #ffd6eb;
    background:rgba(255,255,255,0.8);
    font-family:'Nunito',sans-serif;
    font-size:.85rem;
    font-weight:800;
    color:#c47ea0;
    cursor:pointer;
    transition:all .15s;
  }
  .admin-signout:hover { background:#fff0f6; border-color:#ff80be; color:#ff6eb4; }

  .admin-main {
    max-width:900px;
    width:100%;
    margin:0 auto;
    padding:36px 24px 60px;
  }

  .admin-page-title {
    font-family:'Pacifico',cursive;
    font-size:1.6rem;
    background:linear-gradient(135deg,#ff6eb4,#a78bfa);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    margin-bottom:4px;
  }
  .admin-page-sub {
    font-size:.86rem;
    color:#c0a0b8;
    font-weight:700;
    margin-bottom:28px;
  }

  .stats-row {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:16px;
    margin-bottom:28px;
  }
  .stat-card {
    background:rgba(255,255,255,0.75);
    backdrop-filter:blur(16px);
    border-radius:22px;
    padding:22px 24px;
    border:2px solid rgba(255,214,235,0.7);
    box-shadow:0 4px 20px rgba(255,140,190,0.1);
    transition:transform .15s,box-shadow .15s;
  }
  .stat-card:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(255,140,190,0.18); }
  .stat-val {
    font-size:2rem;
    font-weight:900;
    color:#5a3a50;
    line-height:1;
    margin-bottom:6px;
  }
  .stat-label {
    font-size:.76rem;
    color:#c0a0b8;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:.08em;
    display:flex;
    align-items:center;
    gap:5px;
  }
  .stat-dot { display:inline-block; width:8px; height:8px; border-radius:50%; }
  .dot-purple { background:linear-gradient(135deg,#a78bfa,#7c5cfc); }
  .dot-pink   { background:linear-gradient(135deg,#ff6eb4,#ff4da0); }
  .dot-green  { background:linear-gradient(135deg,#4ade80,#22c97a); }

  .filter-bar {
    display:flex;
    gap:10px;
    margin-bottom:20px;
    flex-wrap:wrap;
    align-items:center;
  }
  .filter-bar select {
    padding:9px 36px 9px 14px;
    border-radius:14px;
    border:2px solid #ffd6eb;
    background:rgba(255,255,255,0.8);
    font-family:'Nunito',sans-serif;
    font-size:.85rem;
    font-weight:700;
    color:#5a3a50;
    outline:none;
    cursor:pointer;
    appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23ff80be' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat;
    background-position:right 12px center;
    transition:border-color .2s,box-shadow .2s;
  }
  .filter-bar select:focus { border-color:#ff80be; box-shadow:0 0 0 4px rgba(255,128,190,.12); }

  .filter-count {
    margin-left:auto;
    font-size:.82rem;
    color:#c0a0b8;
    font-weight:800;
  }

  .fb-list { display:flex; flex-direction:column; gap:12px; }

  .fb-card {
    background:rgba(255,255,255,0.75);
    backdrop-filter:blur(16px);
    border:2px solid #ffd6eb;
    border-radius:22px;
    padding:20px 22px;
    box-shadow:0 4px 16px rgba(255,140,190,0.08);
    transition:box-shadow .15s,transform .15s;
    animation:fadeUp .3s ease both;
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .fb-card:hover { box-shadow:0 8px 28px rgba(255,140,190,0.16); transform:translateY(-2px); }
  .fb-card.is-reviewed { border-color:#b8f0d4; background:rgba(240,255,248,0.7); }
  .fb-card.is-pending  { border-color:#ffd6eb; }

  .fb-card-top {
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:12px;
    flex-wrap:wrap;
    gap:8px;
  }

  .tag {
    display:inline-flex;
    align-items:center;
    gap:4px;
    padding:4px 13px;
    border-radius:20px;
    font-size:.74rem;
    font-weight:800;
    letter-spacing:.04em;
  }
  .tag-cat      { background:#ede9fe; color:#7c3aed; }
  .tag-reviewed { background:#d4f5e4; color:#1a9960; }
  .tag-pending  { background:#fff0f6; color:#c47ea0; border:1.5px solid #ffd6eb; }

  .fb-message {
    font-size:.95rem;
    color:#5a3a50;
    line-height:1.6;
    font-weight:600;
    margin-bottom:14px;
  }

  .fb-card-bottom {
    display:flex;
    align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;
    gap:8px;
  }
  .fb-time { font-size:.76rem; color:#d4a0b8; font-weight:700; }

  .fb-actions { display:flex; gap:8px; }

  .act-btn {
    padding:7px 16px;
    border-radius:12px;
    border:2px solid #ffd6eb;
    background:rgba(255,255,255,0.8);
    font-family:'Nunito',sans-serif;
    font-size:.8rem;
    font-weight:800;
    cursor:pointer;
    transition:all .15s;
    color:#c47ea0;
  }
  .act-btn:hover { background:#fff0f6; }
  .act-btn.mark  { border-color:#a78bfa; color:#7c3aed; }
  .act-btn.mark:hover { background:#f5f0ff; }
  .act-btn.del   { border-color:#ffb3c8; color:#e03060; }
  .act-btn.del:hover { background:#fff0f4; }

  .empty-admin {
    text-align:center;
    padding:60px 0;
    color:#d4a0b8;
    font-size:.95rem;
    font-weight:700;
  }
  .empty-admin .ico { font-size:3rem; display:block; margin-bottom:10px; }

  /* ── LOGIN SCREEN ─────────────────────────────── */
  .login-bg {
    font-family:'Nunito',sans-serif;
    background:#fff0f6;
    background-image:
      radial-gradient(circle at 15% 15%, #ffd6e7 0%, transparent 45%),
      radial-gradient(circle at 85% 85%, #d6e8ff 0%, transparent 45%),
      radial-gradient(circle at 70% 10%, #ead6ff 0%, transparent 35%);
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:60px 16px;
  }
  .login-card {
    background:rgba(255,255,255,0.78);
    backdrop-filter:blur(24px);
    border-radius:32px;
    padding:44px 40px;
    width:100%;
    max-width:420px;
    box-shadow:0 8px 48px rgba(255,140,190,0.16), 0 2px 12px rgba(0,0,0,0.05);
    border:1.5px solid rgba(255,255,255,0.95);
    animation:popIn .4s cubic-bezier(.34,1.56,.64,1) both;
  }
  .login-icon {
    width:56px; height:56px;
    background:linear-gradient(135deg,#ff6eb4,#a78bfa);
    border-radius:18px;
    display:flex; align-items:center; justify-content:center;
    font-size:1.5rem;
    margin-bottom:20px;
    box-shadow:0 4px 16px rgba(255,110,180,0.35);
  }
  .login-title {
    font-family:'Pacifico',cursive;
    font-size:1.6rem;
    background:linear-gradient(135deg,#ff6eb4,#a78bfa);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    margin-bottom:4px;
  }
  .login-sub { font-size:.86rem; color:#c0a0b8; font-weight:700; margin-bottom:28px; }

  .admin-label {
    display:block;
    font-size:.78rem;
    font-weight:900;
    color:#c47ea0;
    text-transform:uppercase;
    letter-spacing:.09em;
    margin-bottom:6px;
  }
  .admin-input {
    width:100%;
    padding:13px 16px;
    border-radius:16px;
    border:2px solid #ffd6eb;
    background:rgba(255,240,250,.55);
    font-family:'Nunito',sans-serif;
    font-size:.95rem;
    color:#5a3a50;
    outline:none;
    transition:border-color .2s,box-shadow .2s;
    margin-bottom:16px;
  }
  .admin-input:focus { border-color:#ff80be; box-shadow:0 0 0 4px rgba(255,128,190,.14); }
  .admin-input::placeholder { color:#d4a0b8; }

  .login-btn {
    width:100%;
    padding:14px;
    border-radius:18px;
    border:none;
    background:linear-gradient(135deg,#ff6eb4,#a78bfa);
    color:#fff;
    font-family:'Nunito',sans-serif;
    font-size:1rem;
    font-weight:900;
    cursor:pointer;
    box-shadow:0 4px 22px rgba(255,110,180,.32);
    transition:transform .15s,box-shadow .15s;
    margin-top:4px;
  }
  .login-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(255,110,180,.42); }
  .login-btn:active { transform:scale(.97); }
  .login-btn:disabled { opacity:.65; cursor:not-allowed; }

  .login-err {
    background:#ffe4ec;
    border:2px solid #ffb3c8;
    border-radius:14px;
    padding:11px 14px;
    color:#c0395a;
    font-size:.86rem;
    font-weight:800;
    margin-bottom:16px;
    text-align:center;
  }

  .login-back {
    display:block;
    text-align:center;
    margin-top:20px;
    font-size:.84rem;
    color:#c0a0b8;
    font-weight:800;
    cursor:pointer;
    text-decoration:none;
    transition:color .15s;
  }
  .login-back:hover { color:#ff6eb4; }
  @media(max-width:560px){
    .public-card,.login-card { padding:32px 20px; }
    .admin-main { padding:20px 14px 48px; }
    .stats-row { grid-template-columns:1fr 1fr; }
    .admin-topbar { padding:0 16px; }
    .pub-title { font-size:1.7rem; }
  }
`

// ── PUBLIC FORM ─────────────────────────────────────────────────────
function FeedbackForm({ onAdminClick }) {
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('General')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) return
    setLoading(true)
    const { error } = await supabase.from('feedback').insert({ message, category })
    setLoading(false)
    if (!error) {
      setSubmitted(true)
      setMessage('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <div className="public-bg">
      <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      <div className="public-card">
        <div className="pub-emoji">🌸 💌 🌷</div>
        <div className="pub-title">Whisper Box</div>
        <div className="pub-sub">share your thoughts, completely anonymous ✨</div>

        {submitted && <div className="pub-success">🎉 Sent! Your feedback is on its way.</div>}

        <label className="pub-label">Your message</label>
        <textarea
          className="pub-textarea"
          rows={5}
          placeholder="Type anything on your mind..."
          value={message}
          onChange={e => { setMessage(e.target.value); setSubmitted(false) }}
        />

        <label className="pub-label">Category</label>
        <select className="pub-select" value={category} onChange={e => setCategory(e.target.value)}>
          <option>General</option>
          <option>Bug Report</option>
          <option>Suggestion</option>
          <option>Complaint</option>
        </select>

        <button className="pub-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '✨ Sending...' : '💌 Send Anonymously'}
        </button>
      </div>

      <div className="pub-footer">
        <a onClick={onAdminClick} style={{ cursor: 'pointer' }}> Admin Access</a>
      </div>
    </div>
  )
}

// ── ADMIN LOGIN ─────────────────────────────────────────────────────
function AdminLogin({ onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async () => {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-icon">🔐</div>
        <div className="login-title">Admin Sign In</div>
        <div className="login-sub">Access the feedback dashboard</div>

        {error && <div className="login-err">{error}</div>}

        <label className="admin-label">Email</label>
        <input className="admin-input" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />

        <label className="admin-label">Password</label>
        <div style={{ position:'relative', marginBottom:0 }}>
          <input className="admin-input" type={showPass ? 'text' : 'password'} placeholder="Enter your password"
            value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ marginBottom:16, paddingRight:48 }} />
          <button onClick={() => setShowPass(p => !p)}
            style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-75%)',
              background:'none', border:'none', cursor:'pointer', fontSize:'1.1rem', color:'#c47ea0' }}>
            {showPass ? '🙈' : '👁️'}
          </button>
        </div>

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <a className="login-back" onClick={onBack}>← Back to Whisper Box</a>
      </div>
    </div>
  )
}

// ── ADMIN DASHBOARD ─────────────────────────────────────────────────
function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([])
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const fetchFeedback = async () => {
    const { data } = await supabase.from('feedback').select('*').order('created_at', { ascending: false })
    if (data) setFeedbackList(data)
  }

  useEffect(() => {
    fetchFeedback()
    const ch = supabase.channel('fb-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feedback' }, fetchFeedback)
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [])

  const toggleReviewed = async (id, current) => {
    await supabase.from('feedback').update({ is_reviewed: !current }).eq('id', id)
    fetchFeedback()
  }
  const deleteFeedback = async (id) => {
    await supabase.from('feedback').delete().eq('id', id)
    fetchFeedback()
  }
  const signOut = () => supabase.auth.signOut()

  const total    = feedbackList.length
  const pending  = feedbackList.filter(f => !f.is_reviewed).length
  const reviewed = feedbackList.filter(f => f.is_reviewed).length

  const filtered = feedbackList.filter(f => {
    if (filterCategory !== 'All' && f.category !== filterCategory) return false
    if (filterStatus === 'Reviewed' && !f.is_reviewed) return false
    if (filterStatus === 'Pending'  &&  f.is_reviewed) return false
    return true
  })

  return (
    <div className="admin-bg">
      {/* Top bar */}
      <div className="admin-topbar">
        <div className="admin-brand">
          Whisper Box <span>ADMIN</span>
        </div>
        <button className="admin-signout" onClick={signOut}>Sign Out</button>
      </div>

      <div className="admin-main">
        <div className="admin-page-title">Feedback Overview</div>
        <div className="admin-page-sub">All submissions are shown below. Updates arrive in real time.</div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-val">{total}</div>
            <div className="stat-label"><span className="stat-dot dot-purple" />Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">{pending}</div>
            <div className="stat-label"><span className="stat-dot dot-pink" />Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">{reviewed}</div>
            <div className="stat-label"><span className="stat-dot dot-green" />Reviewed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option>All</option>
            <option>General</option>
            <option>Bug Report</option>
            <option>Suggestion</option>
            <option>Complaint</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option>All</option>
            <option>Reviewed</option>
            <option>Pending</option>
          </select>
          <span className="filter-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* List */}
        <div className="fb-list">
          {filtered.length === 0 ? (
            <div className="empty-admin">
              <span className="ico">📭</span>
              No feedback matches your filters.
            </div>
          ) : filtered.map(f => (
            <div key={f.id} className={`fb-card ${f.is_reviewed ? 'is-reviewed' : 'is-pending'}`}>
              <div className="fb-card-top">
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <span className="tag tag-cat">{f.category}</span>
                  <span className={`tag ${f.is_reviewed ? 'tag-reviewed' : 'tag-pending'}`}>
                    {f.is_reviewed ? '✓ Reviewed' : 'Pending'}
                  </span>
                </div>
              </div>
              <div className="fb-message">{f.message}</div>
              <div className="fb-card-bottom">
                <span className="fb-time">{new Date(f.created_at).toLocaleString()}</span>
                <div className="fb-actions">
                  <button className="act-btn mark" onClick={() => toggleReviewed(f.id, f.is_reviewed)}>
                    {f.is_reviewed ? 'Mark Pending' : 'Mark Reviewed'}
                  </button>
                  <button className="act-btn del" onClick={() => deleteFeedback(f.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── ROOT ────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(undefined)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    supabase.auth.onAuthStateChange((_e, s) => setSession(s))
  }, [])

  return (
    <>
      <style>{styles}</style>
      {session === undefined ? (
        <div className="login-bg">
          <div style={{ color:'#9a9ab0', fontFamily:'DM Sans,sans-serif', fontWeight:600 }}>Loading...</div>
        </div>
      ) : session ? (
        <AdminDashboard />
      ) : showLogin ? (
        <AdminLogin onBack={() => setShowLogin(false)} />
      ) : (
        <FeedbackForm onAdminClick={() => setShowLogin(true)} />
      )}
    </>
  )
}