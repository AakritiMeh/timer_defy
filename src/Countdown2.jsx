import React, { useState, useEffect } from "react";
import './Countdown2.css';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const headerVariant = {
  visible: { scaleY: 1, transition: { duration: 0.5 } },
  hidden: { scaleY: 0 },
};

const timerVariant = {
  visible: { opacity: 1, transition: { duration: 0.8 } },
  hidden: { opacity: 0 },
};

function Index() {
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMilli, setTimerMilli] = useState(0);

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    startTimer();

    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  });

  let interval;
  const startTimer = () => {
    const countDownDate = new Date("January 24, 2024 10:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      
      const hours = Math.floor(
        (distance) / (1000 * 60 * 60)
      ) 
        .toString()
        .padStart(2, "0");

      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
        .toString()
        .padStart(2, "0");

      const seconds = Math.floor((distance % (60 * 1000)) / 1000)
        .toString()
        .padStart(2, "0");

      const milli = Math.floor((distance % (1000)) / (10))
        .toString()
        .padStart(2, "0");

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
        setTimerMilli(milli);
      }
    }, 1000);
  };

  return (
    <>
      <motion.div
        ref={ref}
        variants={timerVariant}
        initial="visible"
        animate={control}
      >
        <div className="countdown-container">
          <div className="timer">
            <div className="counter-day">
              <p className="counter-day-number">{timerHours}:</p>
            </div>
            <div className="counter-minute">
              <p className="counter-minute-number">{timerMinutes}:</p>
            </div>
            <div className="counter-seconds">
              <p className="counter-seconds-number">{timerSeconds}</p>
            </div>
            <div className="counter-milli">
              <p className="counter-milli-number">{timerMilli}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Index;
