import { useSearchParams } from "react-router-dom";

export default function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  return [lat, lon];
}
