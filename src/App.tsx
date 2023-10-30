import { Link } from "react-router-dom";
import "./App.css";
import useLocalStorage, { DataObj } from "./hooks/useLocalStorage";
import { useState } from "react";

function App() {
  const [data, setData] = useLocalStorage();
  const [searchTerm, setTerm] = useState("");
  const [results, setResults] = useState<any>({});
  // console.log({ data });
  const handleDelete = (item: keyof typeof data) => {
    const filteredItems = data.filter((el) => el !== item);
    setData(filteredItems);
    console.log({ filteredItems });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const data = fetch(
      `http://api.weatherstack.com/current?access_key=eab9e72468966111cf6634cc7c3c38c4&query=${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data));
    console.log({ data });
    
    setTerm("");
  };
  return (
    <main className="grid p-4 gap-4">
      <form className="max-w-[792px]" onSubmit={handleSearch}>
        <input
          className="border border-primary bg-primary rounded-[16px] px-8 py-4 w-full focus:outline-0 focus:border-0"
          type="text"
          name="search"
          placeholder="Search for cities"
          value={searchTerm}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="grid gap-4">
        {data.length
          ? data.map((el: DataObj) => (
              <Link
                className="p-8 flex justify-between items-center bg-primary rounded-[24px] max-w-[792px] hover:bg-transparent hover:border hover:border-[#b7ddf7] transition-all"
                to={el.geoname_id}
                key={el.geoname_id}
              >
                <div className="flex gap-6 items-center">
                  <img
                    className="rounded-full max-h-full max-w-full"
                    src={el.current.weather_icons}
                    alt=""
                  />
                  <div>
                    <h1 className="text-[#202b3bff] text-[32px] font-semibold">
                      {el.name}
                    </h1>
                    <p>Population: {el.population}</p>
                    <p>{el.location.localtime}</p>
                  </div>
                </div>
                <p className="text-4xl">{el.current?.temperature}°</p>
                {/* <p onClick={() => handleDelete(el)}>Delete</p> */}
              </Link>
            ))
          : null}
      </div>
    </main>
  );
}

export default App;
