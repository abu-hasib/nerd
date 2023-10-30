import { useLocation, useParams } from "react-router-dom";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";

function Details() {
  const [data] = useLocalStorage()
  const params = useParams()
  console.log({data})
  const details = data?.find(el => el.geoname_id === params.id)
  console.log({details})
  return (
    <main>
      <h1>Details</h1>
      <p>{details.population}</p>
      <p>{details.name}</p>
      <p>{details.current.temperature}</p>
    </main>
  );
}

export default Details;
