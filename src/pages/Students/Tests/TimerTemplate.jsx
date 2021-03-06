import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Swal from 'sweetalert2';
import './TimerTemplate.scss';

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 4,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div className="dimension">{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function TimerTemplate({ examTime, setTimeUp }) {
  //   const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  //   const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + examTime / 1000; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;

  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  return (
    <div className="d-flex justify-content-center text-center">
      {/* <div className="mr-2">
        <CountdownCircleTimer
          {...timerProps}
          colors={[['#7E2E84']]}
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime }) =>
            renderTime('days', getTimeDays(daysDuration - elapsedTime))
          }
        </CountdownCircleTimer>
      </div> */}
      <div className="mr-2">
        <CountdownCircleTimer
          {...timerProps}
          colors={[['#D14081']]}
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > hourSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime('hours', getTimeHours(daySeconds - elapsedTime))
          }
        </CountdownCircleTimer>
      </div>
      <div className="mr-2">
        <CountdownCircleTimer
          {...timerProps}
          colors={[['#EF798A']]}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > minuteSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))
          }
        </CountdownCircleTimer>
      </div>

      <CountdownCircleTimer
        {...timerProps}
        colors={[['#218380']]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0,
        ]}
      >
        {({ elapsedTime }) =>
          renderTime('seconds', getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
    </div>
  );
}
