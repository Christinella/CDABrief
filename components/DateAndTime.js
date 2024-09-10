import { useEffect, useState } from 'react';
import { getWeekDay, getTime, getAMPM } from '../services/helpers';
import styles from './DateAndTime.module.css';

export const DateAndTime = ({ weatherData, unitSystem }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setCurrentDateTime(new Date()); // Met à jour l'état avec la date actuelle
    };

    // Met à jour l'heure toutes les secondes
    const intervalId = setInterval(updateTime, 1000);

    // Nettoie l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);

  if (!weatherData || !weatherData.current || !weatherData.timezone) {
    console.error("Données météo manquantes.");
    return <p>Données indisponibles</p>; // Gérer l'absence de données proprement
  }

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(currentDateTime)}, ${getTime(
          unitSystem,
          currentDateTime.toISOString(), // Temps actuel au format ISO 8601
          weatherData.timezone // Fuseau horaire
        )} ${getAMPM(
          unitSystem,
          currentDateTime.toISOString(),
          weatherData.timezone
        )}`}
      </h2>
    </div>
  );
};
