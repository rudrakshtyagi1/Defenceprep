import { useEffect, useState, useRef } from 'react';

/**
 * Countdown timer hook.
 * @param initialSeconds - starting value in seconds
 * @param onExpire - callback when timer hits 0
 * @param autoStart - whether to start immediately
 */
export function useTimer(
  initialSeconds: number,
  onExpire?: () => void,
  autoStart = true
) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);
  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const formatted = [
    hours > 0 ? String(hours).padStart(2, '0') : null,
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ]
    .filter(Boolean)
    .join(':');

  const percentUsed = initialSeconds > 0 ? ((initialSeconds - secondsLeft) / initialSeconds) * 100 : 0;

  const isWarning = secondsLeft <= 300 && secondsLeft > 60; // last 5 min
  const isCritical = secondsLeft <= 60; // last 1 min

  return {
    secondsLeft,
    formatted,
    isRunning,
    pause,
    resume,
    reset,
    percentUsed,
    isWarning,
    isCritical,
  };
}
