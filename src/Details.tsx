import { useLocation, useParams } from "react-router-dom";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState } from "react";

function Details() {
  const [data] = useLocalStorage();
  const params = useParams();
  console.log({ data });
  const details = data?.find((el) => el.geoname_id === params.id);
  console.log({ details });
  const [notes, setNotes] = useState<{ id: number; text: string }[]>([]);
  const [text, setText] = useState("");
  const [canEdit, setEdit] = useState(false);
  let count = 0;

  const handleSave = () => {
    console.log("clicled");
    setNotes((prev) => [...prev, { id: count++, text: text }]);
    console.log({ notes });
  };

  const handleDelete = (item) => {
    const filtered = notes.filter((note) => note.id !== item.id);
    setNotes(filtered);
  };

  const handleChange = (e, note) => {
    const temp = notes;
    console.log({ temp });
    temp[note.id] = { id: note.id, text: e.target.value };
    setNotes(temp);
  };
  return (
    <main>
      <h1>Details</h1>
      <p>{details.population}</p>
      <p>{details.name}</p>
      <p>{details.current.temperature}</p>
      <p>{details.current.weather_descriptions}</p>
      <img src={details.current.weather_icons} alt="" loading="lazy" />

      <textarea
        name=""
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={() => handleSave()}>Save</button>
      <pre>
        {notes.length
          ? notes.map((note) => (
              <div key={note.id}>
                <input
                  type="text"
                  value={note.text}
                  onChange={(e) => handleChange(e, note)}
                />

                <span onClick={() => handleDelete(note)}>x</span>
              </div>
            ))
          : null}
      </pre>
    </main>
  );
}

export default Details;
