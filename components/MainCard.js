import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";
import config from "../config";

// Associer des descriptions et des noms d'icônes aux codes météo
const weatherDescriptions = {
  0: { description: "Clear sky", icon: "soleil" },
  1: { description: "Mainly clear", icon: "soleiNuage" },
  61: { description: "Partly cloudy", icon: "Nuage" },
  3: { description: "Overcast", icon: "nuageux" },
  4: { description: "Fog", icon: "fog" },
  5: { description: "Depositing rime fog", icon: "pluvieux" },
  6: { description: "Light drizzle", icon: "nuit" },
  7: { description: "Moderate drizzle", icon: "eclair" },
  8: { description: "Dense drizzle", icon: "brouillard" },
  9: { description: "Slight rain", icon: "neige" },
  10: { description: "Moderate rain", icon: "nuitNuage" },
  
  // Ajoutez d'autres codes si nécessaire
};

export const MainCard = ({
  city,
  country,
  unitSystem,
  weatherData,
}) => {

  const temperature = unitSystem === "metric"
    ? Math.round(weatherData.current.temperature_2m)
    : Math.round(ctoF(weatherData.current.temperature_2m));

 
  const weather_code = weatherData.current.weather_code;
  const weatherInfo = weatherDescriptions[weather_code] || {
    description: "Unknown",
    
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {config.city},{config.country}
      </h1>
      <p className={styles.description}>{city}</p>
      {/* Afficher l'icône météo */}
      <Image
        width="300"
        height="300"
        src={`/icons/${weatherInfo.icon}.svg`} // Utiliser l'icône correspondant au code météo
        alt={weatherInfo.description}
      />
      <h1 className={styles.temperature}>
        {temperature}°{unitSystem === "metric" ? "C" : "F"}
      </h1>
      <p>
        Feels like {temperature}°{unitSystem === "metric" ? "C" : "F"}
      </p>
    </div>
  );
};
