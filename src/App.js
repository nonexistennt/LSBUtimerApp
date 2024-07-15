
import React, { useState } from 'react';
import Timer from './Timer';
import moment from 'moment';
import './App.css';
import Picture1 from './Picture1.png';

const App = () => {
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');
  const [firstNotAllowed, setFirstNotAllowed] = useState(30);
  const [lastNotAllowed, setLastNotAllowed] = useState(30);
  
  const [timerConfig, setTimerConfig] = useState({
    start: '10:00',
    end: '12:00',
    restrictedPeriods: [
      [0, 30],
      [90, 120]
    ]
  });

  const handleUpdateTimer = () => {
    const totalMinutes = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'minutes');
    setTimerConfig({
      start: startTime,
      end: endTime,
      restrictedPeriods: [
        [0, firstNotAllowed],
        [totalMinutes - lastNotAllowed, totalMinutes]
      ]
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src ={Picture1.png} alt = "logo"/>
        <h1>Timer App</h1>
        <div className="inputs">
          <div>
            <label>Start Time: </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label>End Time: </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div>
            <label>First Minutes Not Allowed: </label>
            <input
              type="number"
              value={firstNotAllowed}
              onChange={(e) => setFirstNotAllowed(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Last Minutes Not Allowed: </label>
            <input
              type="number"
              value={lastNotAllowed}
              onChange={(e) => setLastNotAllowed(parseInt(e.target.value))}
            />
          </div>
          <button onClick={handleUpdateTimer}>Update Timer</button>
        </div>
      </header>
      <Timer
        start={timerConfig.start}
        end={timerConfig.end}
        restrictedPeriods={timerConfig.restrictedPeriods}
      />
    </div>
  );
};

export default App;
