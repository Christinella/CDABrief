import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.current.relative_humidity_2m}
        unit={"%"}
      />
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={weatherData.current.wind_speed_10m}
        unit={unitSystem == "metric" ? "km/h" : ""}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={weatherData.current.wind_direction_10m}
        unit={"°"}
      />
      <MetricsCard
        title={"precipitation"}
        iconSrc={"/icons/compass.png"}
        metric={weatherData.current.precipitation}
        unit={"°"}
      />
  {getAMPM(unitSystem,  weatherData.timezone)}
   
    </div>
  );
};
