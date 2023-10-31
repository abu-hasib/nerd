import { Link } from "react-router-dom";
import { ResponseData } from "../types";
import { Dispatch, SetStateAction } from "react";
import { Star, Trash } from "lucide-react";

interface WeatherCardProps {
  data: ResponseData;
  setFavorites?: Dispatch<SetStateAction<ResponseData[]>>;
  setData?: Dispatch<SetStateAction<ResponseData[]>>;
  payload: ResponseData[];
}

function WeatherCard({
  data,
  setFavorites,
  setData,
  payload,
}: WeatherCardProps) {
  const handleFavorites = () => {
    if (!setFavorites) return;
    setFavorites((prev) => {
      console.log({ prev });
      const index = prev.findIndex((el) => el.geoname_id === data.geoname_id);
      if (index !== -1) return prev;
      else return [...prev, data];
    });
  };

  const handleDelete = () => {
    const filteredItems = payload.filter((el) => el !== data);
    if (!setData) return;
    setData(filteredItems);
    console.log({ filteredItems });
  };

  console.log({idddd: data.geoname_id})

  return (
    <div
      className="p-8 bg-primary rounded-[24px] max-w-[792px] hover:bg-transparent hover:border hover:border-[#b7ddf7] transition-all relative"
      key={data?.geoname_id}
    >
      <span
        className="absolute top-2 right-3 cursor-pointer"
        onClick={() => handleFavorites()}
      >
        <Star />
      </span>
      <Trash
        className="absolute top-2 right-10 hover:text-red-400"
        onClick={handleDelete}
      />
      <Link to={data?.id.toString()} className="flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <img
            className="rounded-full max-h-full max-w-full"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt=""
          />
          <div>
            <h1 className="text-[#202b3bff] text-[32px] font-semibold">
              {data?.name}
            </h1>
            <p>{data?.location?.localtime}</p>
          </div>
        </div>
        <div>
          <p className="text-4xl">{data?.main?.temp}°</p>
          <p className="font-medium text-lg italic">
            Population: {data?.population}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default WeatherCard;
