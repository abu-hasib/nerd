// @ts-nocheck
import { useParams } from "react-router-dom";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { SetStateAction, useState } from "react";
import StatsCard from "./components/StatsCard";
import Button from "./components/pieces/Button";
import Note from "./components/Note";
import Textarea from "./components/pieces/Textarea";

function Details() {
  const [data,,] = useLocalStorage();
  const params = useParams();
  const details = data?.find(
    (el: { id: string | undefined }) => el.id == params.id
  );
  console.log({ details });
  const [notes, setNotes] = useState<{ id: number; text: string }[]>([]);
  const [text, setText] = useState("");

  const handleSave = () => {
    setNotes((prev) => [...prev, { id: notes.length + 1, text: text }]);
    setText("");
  };

  const handleDelete = (item: { id: number }) => {
    const filtered = notes.filter((note) => note.id !== item.id);
    console.log({ filtered });
    setNotes(filtered);
  };

  const handleChange = (
    e: { target: { value: any } },
    note: { id: string | number }
  ) => {
    const temp = notes;
    console.log({ temp });
    temp[note.id] = { id: note.id, text: e.target.value };
    setNotes(temp);
  };
  return (
    <main className="h-screen gap-8 p-8 flex flex-col lg:flex-row justify-between">
      <div className="flex flex-col space-y-12 p-4 lg:w-[70%] border border-primary-100 rounded-[16px]">
        <section className="flex items-center justify-between pr-12 pl-4">
          <div className="flex flex-col px-8 gap-8">
            <div className="">
              <h1 className="text-[#202b3bff] text-[32px] font-semibold">
                {details.name}
              </h1>
              <p className="text-[#9399a2ff]">
                Description: {details.weather[0].description}
              </p>
            </div>
            <p className="text-[64px] leading-[72px] font-semibold">
              {details.main.temp}°
            </p>
          </div>
          <div className="rounded-full h-[200px] w-[200px]">
            <img
              className="rounded-full h-full w-full object-cover"
              src={`https://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`}
              alt=""
              loading="lazy"
            />
          </div>
        </section>

        <section className="flex flex-wrap gap-2 justify-between">
          <StatsCard
            icon="humidity"
            stat="humidity"
            value={`${details.main.humidity} %`}
          />
          <StatsCard
            icon="temperature"
            stat="feels like"
            value={`${details.main.feels_like}°`}
          />
          <StatsCard
            icon="wind"
            stat="Wind speed"
            value={`${details.wind.speed} km/h`}
          />
          <StatsCard
            icon="pressure"
            stat="pressure"
            value={`${details.main.pressure} hpa`}
          />
        </section>
      </div>

      <div className="border border-primary-100 rounded-[16px] p-8 space-y-4">
        <section className="">
          <Textarea
            value={text}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setText(e.target.value)
            }
          />
          <Button disabled={!text?.length} onClick={() => handleSave()}>
            Save
          </Button>
        </section>
        <section className="space-y-2 border border-primary p-4 rounded-[16px] divide-y-1">
          {notes.length
            ? notes.map((note) => (
                <Note
                  note={note}
                  handleChange={handleChange}
                  handleDelete={handleDelete}
                />
              ))
            : null}
        </section>
      </div>
    </main>
  );
}

export default Details;
