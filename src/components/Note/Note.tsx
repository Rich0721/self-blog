import typescriptIcon from "../../asserts/icons/typescript.png";
import pythonIcon from "../../asserts/icons/python.png";
import agentIcon from "../../asserts/icons/software-agent.png";
import dockerIcon from "../../asserts/icons/docker1.png";
import type { Note as NoteData } from "../../types/note";
import "./Note.css";

const categoryIcons = new Map([
  ["typescript", typescriptIcon],
  ["python", pythonIcon],
  ["agent", agentIcon],
  ["docker", dockerIcon],
]);

interface NoteProps {
  note: NoteData;
}

function Note({ note }: NoteProps) {
  const icon = categoryIcons.get(note.categoryImage);

  return (
    <a
      className="note-card"
      href={note.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={note.title}
    >
      <div className="note-card__heading">
        {icon && <img src={icon} alt={note.categoryImage} width="56" height="56" />}
        <div>
          <h2>{note.title}</h2>
          {note.hashTags.length > 0 && (
            <p className="note-card__tags">{note.hashTags.join(" ")}</p>
          )}
        </div>
      </div>
      <p className="note-card__summary">{note.summary}</p>
    </a>
  );
}

export default Note;
