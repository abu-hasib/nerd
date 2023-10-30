import { ChangeEvent } from "react";
import { NoteType } from "../types";
import Textarea from "./pieces/Textarea";

interface NoteProps {
  note: NoteType;
  handleChange: (
    ...args: [React.ChangeEvent<HTMLInputElement>, NoteType]
  ) => void;
  handleDelete: (...args: [NoteType]) => void;
}

function Note({ note, handleChange, handleDelete }: NoteProps) {
  return (
    <div
      className="flex gap-2 justify-between items-center rounded-[12px]"
      key={note.id}
    >
      <Textarea
        rows={1}
        className=""
        value={note.text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, note)}
      />

      <span onClick={() => handleDelete(note)}>x</span>
    </div>
  );
}

export default Note;
