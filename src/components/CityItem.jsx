import { useCities } from "../contexts/CitiesContext";
import styles from "./cityItem.module.css";
import { Link } from "react-router-dom";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date * 1000));
export default function cityItem({ city }) {
  const {
    emoji,
    name,
    date,
    id,
    position: { lat, lon },
  } = city;
  const { currentCity, deleteCity } = useCities();
  function deleteHandler(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity?.id == id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lon=${lon}`}
      >
        <img src={emoji} alt={`${name} flag`} />
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>{formatDate(date.seconds)}</span>
        <span className={styles.deleteBtn} onClick={deleteHandler}>
          ❌
        </span>
      </Link>
    </li>
  );
}
