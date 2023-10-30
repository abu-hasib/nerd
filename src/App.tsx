import { Link } from "react-router-dom";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [data, setData] = useLocalStorage();
  // console.log({ data });
  const handleDelete = (item: keyof typeof data) => {
    const filteredItems = data.filter((el) => el !== item);
    setData(filteredItems);
    console.log({ filteredItems });
  };
  return (
    <main>
      {data.length
        ? data.map((el: any) => (
            <Link to={el.geoname_id} key={el.geoname_id}>
              <h1>{el.name}</h1>
              <p>{el.population}</p>
              <p>{el.current?.temperature}</p>
              <p onClick={() => handleDelete(el)}>Delete</p>
            </Link>
          ))
        : null}
    </main>
  );
}

export default App;
