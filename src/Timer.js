
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Timer = ({ start, end, restrictedPeriods }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [isAllowedToLeave, setIsAllowedToLeave] = useState(true);
  const [isClassStarted, setIsClassStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkClassStatus = () => {
      const now = moment();
      const startMoment = moment(start, 'HH:mm');
      const endMoment = moment(end, 'HH:mm');

      if (now.isBetween(startMoment, endMoment)) {
        setIsClassStarted(true);
        let restricted = false;
        restrictedPeriods.forEach(period => {
          const periodStart = moment(start, 'HH:mm').add(period[0], 'minutes');
          const periodEnd = moment(start, 'HH:mm').add(period[1], 'minutes');

          if (now.isBetween(periodStart, periodEnd)) {
            restricted = true;
          }
        });

        setIsAllowedToLeave(!restricted);
      } else {
        setIsClassStarted(false);
        setIsAllowedToLeave(true);  // Default to allowed to leave when class is not in session
      }
    };

    checkClassStatus();
  }, [currentTime, start, end, restrictedPeriods]);

  return (
    <div className="timer-container">
      <h1>Current Time: {currentTime.format('HH:mm:ss')}</h1>
      <h2>Duration: {start} - {end}</h2>
      {isClassStarted ? (
        <>
          <h3 className={isAllowedToLeave ? 'allowed' : 'not-allowed'}>
            {isAllowedToLeave ? 'You are allowed to leave.' : 'You are not allowed to leave.'}
          </h3>
          <div>
            {isAllowedToLeave ? '✔️' : '❌'}
          </div>
        </>
      ) : (
        <h3>{currentTime.isBefore(moment(start, 'HH:mm')) ? 'Class not started yet' : 'Class has ended'}</h3>
      )}
    </div>
  );
};

export default Timer;
