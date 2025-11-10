import React, { useContext, useEffect } from "react";
import { TrackContext } from "../contexts/TrackContext";
import API from "../services/api";

export default function Player() {
  const {
    queue,
    currentIndex,
    isPlaying,
    audioRef,
    setIsPlaying,
    next,
    prev,
  } = useContext(TrackContext);

  const current = queue[currentIndex];

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    if (isPlaying) audioEl.play().catch(() => {});
    else audioEl.pause();
  }, [isPlaying, currentIndex, queue]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = async () => {
      if (current && current._id) {
        try {
          await API.post(`/tracks/play/${current._id}`);
        } catch (err) {}
      }
      next();
    };
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [current, next]);

  if (!current) {
    return <div className="mini-player">Nothing playing</div>;
  }

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const src = current.src.startsWith("/")
    ? `${baseUrl}${current.src}`
    : current.src;

  return (
    <div className="mini-player">
      <div className="mini-left">
        {current.cover ? (
          <img
            src={`${baseUrl}${current.cover}`}
            alt="cover"
            width="64"
            height="64"
            className="mini-player-cover"
          />
        ) : null}
        <div className="meta" style={{ display: "flex", flexDirection: "column" }}>
          <div className="title">{current.title}</div>
          <div className="artist">{current.artist}</div>
        </div>
      </div>

      <div className="mini-controls">
        <button onClick={prev}>&#9664;</button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "X" : "O"}
        </button>
        <button onClick={next}>&#9654;</button>
      </div>

      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls
      />
    </div>
  );
}
