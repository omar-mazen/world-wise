import {
  addCity as addCityAPI,
  getCity as getCityAPI,
  deleteCity as deleteCityAPI,
  subscribeToCities,
} from "../services/cities";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticaed, user } = useAuth();
  // Realtime listener for all cities
  useEffect(() => {
    if (!isAuthenticaed) return;
    setIsLoading(true);
    const unsubscribe = subscribeToCities(
      (data) => {
        setCities(data);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthenticaed]);

  async function getCity(id) {
    setIsLoading(true);
    setError("");
    try {
      const city = cities?.filter((city) => city.id == id)[0];
      if (city) setCurrentCity(city);
      else {
        const city = await getCityAPI(id);
        setCurrentCity(city);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(cityData) {
    setIsLoading(true);
    setError("");
    try {
      const id = await addCityAPI(cityData);
      setCurrentCity({ id, ...cityData });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    setIsLoading(true);
    setError("");
    try {
      await deleteCityAPI(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  const value = {
    cities,
    currentCity,
    isLoading,
    error,
    getCity,
    createCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
