/* eslint-disable no-unused-vars */
import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner.jsx";
import ButtonBack from "./ButtonBack";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date * 1000));

function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCities();
  useEffect(() => {
    (async () => await getCity(id))();
  }, [id, currentCity]);
  if (isLoading || !currentCity) return <Spinner />;
  const { name, emoji, date, note } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <img src={emoji} alt={`${name} flag`} />
          {name}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {name} on</h6>
        <p>{formatDate(date.seconds || null)}</p>
      </div>
      {note && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{note}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${name}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {name} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <ButtonBack navigate={"/app/cities"} />
      </div>
    </div>
  );
}

export default City;
