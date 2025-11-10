import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import API from '../services/api';
import { TrackContext } from '../contexts/TrackContext';
import Player from '../components/Player';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const { setQueue, playAtIndex } = useContext(TrackContext);
  const [tracks, setTracks] = useState([]);
  const [q, setQ] = useState('');

  const fetchTracks = async (query = '') => {
    try {
      const { data } = await API.get(`/tracks${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      setTracks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    fetchTracks(q);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <img src="/IMG_2831.JPG" alt="Logo" className="logo"/>
        <nav>
          <button>Home</button>
          <Link to="/upload"><button>Upload</button></Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>Welcome, {user?.name}</div>
          <form onSubmit={onSearch} style={{ display: 'flex', gap: 8 }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" />
            <button type="submit">Search</button>
          </form>
        </header>

        <section className="content">
          <h2>Tracks</h2>
          <div className="tracks">
            {tracks.map((t, idx) => (
              <div key={t._id} className="track" onDoubleClick={() => { setQueue(tracks); playAtIndex(idx); }}>
                {t.cover && <img src={t.cover} alt={t.title} className="track-cover" />}
                <div className="meta" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="title">{t.title}</div>
                  <div className="artist">{t.artist}</div>
                </div>
                <div className="actions">
                  <button onClick={() => { setQueue(tracks); playAtIndex(idx); }}>Play</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Player />
    </div>
  );
}
