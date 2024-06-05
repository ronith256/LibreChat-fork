import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import store from '~/store';

export default function useCustomAudioRef({
  setIsPlaying,
}: {
  setIsPlaying: (isPlaying: boolean) => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trigger, setTrigger] = useRecoilState<boolean>(store.audioRecorderTriggerState);
  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
      console.log('message audio ended');
      if (audioRef.current) {
        URL.revokeObjectURL(audioRef.current.src);
      }
      if (store.continuousConversationSwitch) {
        setTrigger(true);
        if (trigger) {
          console.log('Trigger is true');
        }
      }
    };

    const handleStart = () => {
      setIsPlaying(true);
      console.log('message audio started');
    };

    const handlePause = () => {
      setIsPlaying(false);
      console.log('message audio paused');
    };

    const audioElement = audioRef.current;

    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('play', handleStart);
      audioRef.current.addEventListener('pause', handlePause);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('play', handleStart);
        audioElement.removeEventListener('pause', handlePause);
        URL.revokeObjectURL(audioElement.src);
      }
    };
  }, [setIsPlaying]);

  return { audioRef };
}
