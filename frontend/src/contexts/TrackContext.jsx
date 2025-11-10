import React, { createContext, useState, useRef } from 'react';

export const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const [queue, setQueue] = useState([]); // array of track objects
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playTrack = (track, index = 0) => {
    if (index >= 0) setCurrentIndex(index);
    else {
      // push single track to queue
      setQueue([track]);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const playAtIndex = (idx) => {
    if (idx < 0 || idx >= queue.length) return;
    setCurrentIndex(idx);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying((p) => !p);

  const next = () => {
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex((i) => i + 1);
      setIsPlaying(true);
    }
  };

  const prev = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex((i) => i - 1);
      setIsPlaying(true);
    }
  };

  return (
    <TrackContext.Provider
      value={{
        queue,
        setQueue,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        audioRef,
        playTrack,
        playAtIndex,
        togglePlay,
        next,
        prev
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
