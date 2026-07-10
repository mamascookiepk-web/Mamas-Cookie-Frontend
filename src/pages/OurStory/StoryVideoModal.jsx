import { useEffect, useRef, useState } from 'react';
import { X, Volume2, Volume1, VolumeX, Play, Pause } from 'lucide-react';

export default function StoryVideoModal({ title, clips, onClose }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  const goTo = (next) => {
    if (next < 0) {
      setProgress(0);
      setIndex(0);
      return;
    }
    if (next >= clips.length) {
      onClose();
      return;
    }
    setProgress(0);
    setPaused(false);
    setIndex(next);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = muted;
    }
  }, [volume, muted, index]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video?.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    setMuted(value === 0);
  };

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>

      <div
        className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1 p-3">
          {clips.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-white"
                style={{
                  width: `${i < index ? 100 : i === index ? progress : 0}%`,
                  transition: i === index ? 'width 0.1s linear' : 'none',
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-7 z-20 flex items-center justify-between gap-3 px-3">
          <p className="truncate text-xs font-bold uppercase tracking-wide text-white drop-shadow">
            {title}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={paused ? 'Play video' : 'Pause video'}
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white"
            >
              {paused ? <Play size={14} className="ml-0.5 fill-white" /> : <Pause size={14} className="fill-white" />}
            </button>
            <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-1.5">
              <button
                type="button"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                onClick={() => setMuted((prev) => !prev)}
                className="flex h-5 w-5 items-center justify-center text-white"
              >
                <VolumeIcon size={15} />
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                onClick={(e) => e.stopPropagation()}
                aria-label="Volume"
                className="h-1 w-14 cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>

        <video
          key={clips[index]}
          ref={videoRef}
          src={clips[index]}
          autoPlay
          muted={muted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => goTo(index + 1)}
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          aria-label="Previous clip"
          onClick={() => goTo(index - 1)}
          className="absolute inset-y-0 left-0 z-10 w-1/2"
        />
        <button
          type="button"
          aria-label="Next clip"
          onClick={() => goTo(index + 1)}
          className="absolute inset-y-0 right-0 z-10 w-1/2"
        />
      </div>
    </div>
  );
}
