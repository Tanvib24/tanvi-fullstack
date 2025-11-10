import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function TrackUpload() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [trackFile, setTrackFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!trackFile) return alert('Please select an audio file');
    const form = new FormData();
    form.append('title', title);
    form.append('artist', artist);
    form.append('album', album);
    form.append('track', trackFile);
    if (coverFile) form.append('cover', coverFile);

    try {
      await API.post('/tracks/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Uploaded');
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h2>Upload Track</h2>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <input placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} />
        <input type="file" accept="audio/*" onChange={(e) => setTrackFile(e.target.files[0])} required />
        <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
