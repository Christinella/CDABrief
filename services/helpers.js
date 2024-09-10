// Convertir un temps ISO 8601 en heure locale
export const isoToLocalTime = (isoTime, timezone) => {
  const date = new Date(isoTime);
  return date.toLocaleTimeString('en-GB', { timeZone: timezone, hour12: false }); // Retourne l'heure en format 24 heures
};

// Convertir l'heure en format 12 heures
export const timeTo12HourFormat = (time24h) => {
  const [hours, minutes] = time24h.split(":");
  const hours12 = (hours % 12) || 12; // Convertit 00 en 12 pour l'affichage
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hours12}:${minutes} ${ampm}`;
};

// Obtenir le jour de la semaine
export const getWeekDay = (currentTime) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(currentTime);
  return weekday[date.getUTCDay()];
};

// Obtenir l'heure formatée
export const getTime = (unitSystem, currentTime, timezone) => {
  const localTime = isoToLocalTime(currentTime, timezone);
  return unitSystem === "metric"
    ? localTime
    : timeTo12HourFormat(localTime);
};

// Obtenir AM/PM pour le système impérial
export const getAMPM = (unitSystem, currentTime, timezone) => {
  if (unitSystem === "imperial") {
    const localTime = isoToLocalTime(currentTime, timezone);
    const hours = parseInt(localTime.split(":")[0], 10);
    return hours >= 12 ? "PM" : "AM";
  }
  return "";  // Pas de AM/PM pour le système métrique
};
