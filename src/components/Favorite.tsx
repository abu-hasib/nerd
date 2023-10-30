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
      className="p-2 bg-primary rounded-[24px] hover:bg-transparent hover:border hover:border-[#b7ddf7] transition-all relative"
      key={data?.geoname_id}
    >
      <Link to={data.geoname_id} className="flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <img
            className="rounded-full max-h-full max-w-full"
            src={data?.current?.weather_icons}
            alt=""
          />
          <div>
            <h1 className="text-[#202b3bff] text-[32px] font-semibold">
              {data?.location?.name}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Favorite;
