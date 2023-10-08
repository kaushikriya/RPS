import { useEffect, useState } from "react";

const countdown = (targetTimestamp) => {
  const now = Date.now();
  const nowUtc = Date.UTC(
    new Date(now).getUTCFullYear(),
    new Date(now).getUTCMonth(),
    new Date(now).getUTCDate(),
    new Date(now).getUTCHours(),
    new Date(now).getUTCMinutes(),
    new Date(now).getUTCSeconds(),
    new Date(now).getUTCMilliseconds()
  );

  const difference = targetTimestamp - nowUtc;

  if (difference <= 0) {
    return "";
  }

  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  const countdownString = `${minutes}m ${seconds}s`;

  return countdownString;
};

export const Timer = ({ targetTime, timeout, stake }) => {
  const [time, setTime] = useState(countdown(targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(countdown(targetTime));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetTime]);

  if (time === "") {
    return <button onClick={timeout}>Settle the game</button>;
  }

  if (stake === 0) {
    return (
      <div>Game has been settled, you have received the total stake amount</div>
    );
  }

  return <div>{`starts in ${time}`}</div>;
};

export default Timer;
