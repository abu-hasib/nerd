// @ts-nocheck
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useMemo, useState } from "react";
import { ResponseData } from "./types";
import WeatherCard from "./components/WeatherCard";
import Favorite from "./components/Favorite";
import { compare, debounce } from "./lib/utils";
import Button from "./components/pieces/Button";
import { wsURL } from "./lib/constants";

function App() {
  const [data, setData] = useLocalStorage();
  const [searchTerm, setTerm] = useState("");
  const [favorites, setFavorites] = useState<ResponseData[]>([]);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    fetch(
      `${wsURL}?lat=${latitude}&lon=${longitude}&appid=${
        import.meta.env.VITE_AK
      }`
    )
      .then((response) => response.json())
      .then((data: ResponseData) => {
        const arr = [];
        console.log({ geo: data });
        arr.push(data);
        setData(arr);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  const handleSearch = useMemo(
    () =>
      debounce(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(value);
        fetch(
          `${wsURL}?q=${value}&appid=${import.meta.env.VITE_AK}`
        )
          .then((res) => res.json())
          .then((data) => {
            const arr = [];
            arr.push(data);
            return setData(arr);
          })
          .catch((err) => console.error(err));
      }, 1500),
    [searchTerm]
  );
  return (
    <main className="grid p-8 gap-4 space-y-8">
      <div className="flex items-center gap-4">
        <form className="max-w-[792px] flex-1" onSubmit={handleSearch}>
          <input
            className="border border-primary bg-primary rounded-[16px] px-8 py-4 w-full focus:outline-0 focus:border-0 flex-1"
            type="text"
            name="search"
            placeholder="Search for cities"
            // value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <Button onClick={handleLocationClick}>Get Yours</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <section className="flex flex-col gap-4 md:w-[70%]">
          {data.length
            ? data
                .sort(compare)
                .map((el: ResponseData) => (
                  <WeatherCard
                    key={el.geoname_id}
                    data={el}
                    setFavorites={setFavorites}
                    setData={setData}
                    payload={data}
                  />
                ))
            : null}
        </section>
        <section className="border border-primary-100 p-4 md:w-[30%] rounded-[16px] ">
          <h3 className="font-semibold  text-2xl">Favorites</h3>
          <div className="flex flex-col gap-3">
            {favorites.length
              ? favorites
                  .sort(compare)
                  .map((favorite) => (
                    <Favorite data={favorite} key={favorite.geoname_id} />
                  ))
              : null}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
