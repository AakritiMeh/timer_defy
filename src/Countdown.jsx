// CountdownTimer.jsx
import React, { useState, useEffect } from 'react';
import './Countdown.css';


const COUNTDOWN_DURATION_HOURS = 36;

const CountdownTimer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(COUNTDOWN_DURATION_HOURS * 3600);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (timerRunning) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleStart = () => {
    setTimerRunning(true);
  };

  const handlePause = () => {
    setTimerRunning(false);
  };

  const handleStop = () => {
    setTimerRunning(false);
    setTimeInSeconds(COUNTDOWN_DURATION_HOURS * 3600);
  };

  return (
    <div className="countdown-container">
     
      <div className="timer">{formatTime(timeInSeconds)}</div>
      <div className="controls">
        <div className='buttons'>
          <button onClick={handleStart} disabled={timerRunning}>
            Start Timer
          </button>
          <button onClick={handlePause} disabled={!timerRunning}>
            Pause Timer
          </button>
          <button onClick={handleStop}>Stop Timer</button>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
};

export default CountdownTimer;
