import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams } from 'react-router-dom';

export default function PlaylistPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`/playlists/${id}`);
        setPlaylist(data);
      } catch (err) {}
    };
    fetch();
  }, [id]);

  if (!playlist) return <div>Loading...</div>;
  return (
    <div className="app-shell">
      <main className="main">
        <h2>{playlist.name}</h2>
        <div>
          {playlist.tracks.map((t) => (
            <div key={t._id} className="track">
              <div>{t.title} - {t.artist}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
