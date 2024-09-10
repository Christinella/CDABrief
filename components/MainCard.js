import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

// Associer des descriptions et des noms d'icônes aux codes météo
const weatherDescriptions = {
  0: { description: "Clear sky", icon: "soleil" },
  1: { description: "Mainly clear", icon: "soleiNuage" },
  2: { description: "Partly cloudy", icon: "Nuage" },
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
  // Convertir la température
  const temperature = unitSystem === "metric"
    ? Math.round(weatherData.current.temperature_2m)
    : Math.round(ctoF(weatherData.current.temperature_2m));

  // Utiliser les codes météo pour obtenir la description et l'icône
  const weather_code = weatherData.weather_code;
  const weatherInfo = weatherDescriptions[weather_code] || {
    description: "Unknown",
    icon: "default_icon",  // Icône par défaut si le code est inconnu
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {weatherData.latitude}, {weatherData.longitude}
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
