import { useState, useEffect } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const useCountdown = (targetDate: Date): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds, isComplete: false };
    };

    const syncTimer = () => {
      const now = new Date();
      const delay = 1000 - (now.getTime() % 1000);

      const timeoutId = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());

        const intervalId = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(intervalId);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    };

    const cleanup = syncTimer();

    return cleanup;
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;
