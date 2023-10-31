import { Link } from "react-router-dom";
import { ResponseData } from "../types";
import { Dispatch, SetStateAction } from "react";

interface WeatherCardProps {
  data: ResponseData;
  setFavorites?: Dispatch<SetStateAction<ResponseData[]>>;
}

function Favorite({ data }: WeatherCardProps) {
  return (
    <div
      className="p-1 bg-primary rounded-[16px] hover:bg-transparent hover:border hover:border-[#b7ddf7] transition-all relative"
    >
      <Link to={data.geoname_id} className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="h-[50px] w-[50px]">

          <img
            className="rounded-full max-h-full max-w-full"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt=""
            />
            </div>
          <div>
            <h1 className="text-[#202b3bff] text-[32px] font-semibold">
              {data?.name}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Favorite;
