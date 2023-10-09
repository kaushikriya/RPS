import { useEffect, useState } from "react";
import Button from "./Button";

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

export const Timer = ({ targetTime, timeout, stake, text }) => {
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
    return (
      <div className="grid gap-10">
        <p className="text-lg">
          The other player failed to respond in the given time limit
        </p>
        <Button onClick={timeout}>Withdraw assets</Button>
      </div>
    );
  }

  if (stake === 0) {
    return (
      <p className="text-lg">
        Game has been settled, you have received the total stake amount
      </p>
    );
  }

  return <div>{`${text} ${time}`}</div>;
};

export default Timer;
