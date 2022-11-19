import React, { useState, useEffect } from "react";
import {
  NotesCard,
  SideNav,
  FilterModal,
  NotesModal,
  Header,
} from "../../components/";
import {
  getPinnedAndUnpinnedNotes,
  sortNotesByDate,
  sortNotesByPriority,
  searchNotes,
} from "../../functions/";
import "./Notes.css";
import { useNotes, useSideNav, useFilter } from "../../context";
import { FaPlus } from "react-icons/fa";

const Notes = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { setSideNavOpen } = useSideNav();

  const {
    notesState: { notes },
  } = useNotes();

  const {
    filterState: { sortByDate, sortByPriority, search },
  } = useFilter();

  const { pinnedNotes, unPinnedNotes } = getPinnedAndUnpinnedNotes(notes);

  const sortedByDateNotes = sortNotesByDate(unPinnedNotes, sortByDate);

  const sortedByPriorityNotes = sortNotesByPriority(
    sortedByDateNotes,
    sortByPriority
  );

  const searchedNotes = searchNotes(sortedByPriorityNotes, search);

  useEffect(() => {
    setSideNavOpen(false);
  }, []);

  return (
    <main className="main-section">
      <SideNav />
      <section className="notes-content">
        <Header />
        <section className="notes-section-title">
          <div className="notes-title-text">
            <h2 className="notes-page-title">Notes</h2>
            <span className="notes-subtitle">({notes.length})</span>
          </div>
        </section>

        <hr />

        <section className="notes-page-actions">
          <FilterModal
            setShowFilterModal={setShowFilterModal}
            showFilterModal={showFilterModal}
          />
          <div className="new-notes">
            <button
              className="btn btn-primary no-max-width flex-align"
              onClick={() => setShowCreateModal(true)}
            >
              <FaPlus className="margin-right" />
              Add New Note
            </button>
            {showCreateModal ? (
              <NotesModal
                setShowCreateModal={setShowCreateModal}
                editData={false}
                noteData={null}
              />
            ) : null}
          </div>
        </section>

        <hr />
        {pinnedNotes.length === 0 && unPinnedNotes.length === 0 ? (
          <section className="empty-container">
            <h3 className="empty-text">
              You have not added any notes till now.
            </h3>
          </section>
        ) : (
          <section className="cards-container">
            {pinnedNotes.map((note) => {
              return <NotesCard key={note._id} note={note} />;
            })}
            {searchedNotes.map((note) => {
              return <NotesCard key={note._id} note={note} />;
            })}
          </section>
        )}
      </section>
    </main>
  );
};

export { Notes };
