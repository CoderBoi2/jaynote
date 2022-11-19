import React from "react";
import { NotesCard, SideNav, Header } from "../../components/";
import { useNotes } from "../../context";
import { useParams } from "react-router-dom";
import "./Label.css";

const Label = () => {
  const {
    notesState: { notes },
  } = useNotes();

  const { labelName } = useParams();

  return (
    <>
      <main className="main-section">
        <SideNav />
        <section className="notes-content">
          <Header />
          <section className="section-title-container">
            <h2 className="section-title">{labelName}</h2>
          </section>
          {notes.length > 0 ? (
            <section className="cards-container">
              {notes
                .filter((note) => note.label === labelName)
                .map((note) => (
                  <NotesCard key={note._id} note={note} />
                ))}
            </section>
          ) : (
            <section className="empty-container">
              <h3 className="empty-text">This Label has no notes.</h3>
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export { Label };
