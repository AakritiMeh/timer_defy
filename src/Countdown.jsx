// CountdownTimer.jsx
import React, { useState, useEffect } from 'react';
import './Countdown.css';
import daowords from "./daowords.png";

const COUNTDOWN_DURATION_HOURS = 36;
const STORAGE_KEY = 'countdownTimerState';

const CountdownTimer = () => {
  const storedTimerState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    startTime: null,
    elapsedTime: 0,
    timerRunning: false,
  };

  const [elapsedTime, setElapsedTime] = useState(storedTimerState.elapsedTime);
  const [timerRunning, setTimerRunning] = useState(storedTimerState.timerRunning);

  useEffect(() => {
    let interval;

    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
  
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        startTime: storedTimerState.startTime,
        elapsedTime,
        timerRunning,
      })
    );
  }, [elapsedTime, timerRunning,storedTimerState.startTime]);

  const handleStart = () => {
    if (!timerRunning) {
      const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ startTime: now, elapsedTime, timerRunning: true }));
      setTimerRunning(true);
    }
  };

  const handlePause = () => {
    if (timerRunning) {
      setTimerRunning(false);
    }
  };

  const handleStop = () => {
    setTimerRunning(false);
    setElapsedTime(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="countdown-container">
      <div className="timer">{formatTime(COUNTDOWN_DURATION_HOURS * 3600 - elapsedTime)}</div>
     
        <div className='buttons'>
          <button onClick={handleStart} disabled={timerRunning}>
            Start Timer
          </button>
          <button onClick={handlePause} disabled={!timerRunning}>
            Pause Timer
          </button>
          <button onClick={handleStop}>Stop Timer</button>          
        </div>   
        <div className='controls'>
        <div className="DAOwords"><img src={daowords} alt="dao"></img></div>    
        <div className='instagram'><a href="https://www.instagram.com/de.fy24/">@de.fy24</a></div>
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
