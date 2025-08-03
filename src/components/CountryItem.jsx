/* eslint-disable react/prop-types */
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <img src={country.emoji} alt={`${country.name} flag`} />
      <span>{country.name}</span>
    </li>
  );
}

export default CountryItem;
