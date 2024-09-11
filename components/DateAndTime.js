import { useEffect, useState } from 'react';
import { getWeekDay, getTime, getAMPM } from '../services/helpers';
import styles from './DateAndTime.module.css';

export const DateAndTime = ({ weatherData, unitSystem }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setCurrentDateTime(new Date()); 
    };

   
    const intervalId = setInterval(updateTime, 1000);

   
    return () => clearInterval(intervalId);
  }, []);

  if (!weatherData || !weatherData.current || !weatherData.timezone) {
    console.error("Données météo manquantes.");
    return <p>Données indisponibles</p>; 
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(currentDateTime)}, ${getTime(
          unitSystem,
          currentDateTime.toISOString(), 
          weatherData.timezone 
        )} ${getAMPM(
          unitSystem,
          currentDateTime.toISOString(),
          weatherData.timezone
        )}`}
      </h2>
    </div>
  );
};
