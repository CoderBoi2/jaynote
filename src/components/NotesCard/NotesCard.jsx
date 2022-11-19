import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";
import { getDate, getTime } from "../../functions/";
import { NotesModal } from "../NotesModal/NotesModal";
import { useAuth, useArchive, useNotes, useTrash } from "../../context/";
import {
  addToArchiveHandler,
  restoreArchivesHandler,
  deleteFromArchivesHandler,
  deleteNoteHandler,
  restoreFromTrashHandler,
  removeFromTrashHandler,
  pinNoteHandler,
} from "../../functions/";
import { BsPin, BsPinFill } from "react-icons/bs";
import { FaTrash, FaEdit, FaArchive, FaTrashRestore } from "react-icons/fa";
import "./NotesCard.css";

const NotesCard = ({ note }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    authState: { token },
  } = useAuth();

  const {
    archiveState: { archives },
    archiveDispatch,
  } = useArchive();

  const {
    trashState: { trash },
    trashDispatch,
  } = useTrash();

  const {
    notesState: { notes },
    notesDispatch,
  } = useNotes();

  const { pathname } = useLocation();

  const restoreFromTrash = () => {
    restoreFromTrashHandler(
      token,
      note,
      notes,
      trash,
      trashDispatch,
      notesDispatch
    );
  };

  const addToTrash = () => {
    if (pathname === "/notes" || pathname.includes("labels")) {
      deleteNoteHandler(token, note, notesDispatch, trashDispatch);
    } else if (pathname === "/archive") {
      deleteFromArchivesHandler(token, note, archiveDispatch, trashDispatch);
    } else {
      removeFromTrashHandler(token, note, trashDispatch);
    }
  };

  const pinNote = () => pinNoteHandler(token, note, notesDispatch);

  const addToArchive = () =>
    addToArchiveHandler(token, note, archiveDispatch, notesDispatch);

  const restoreFromArchive = () =>
    restoreArchivesHandler(
      token,
      note,
      notes,
      archives,
      archiveDispatch,
      notesDispatch
    );

  const editModalHandler = () => {
    setShowCreateModal(true);
  };
  return (
    <>
      {console.log(note)}
      <div className={`notes-card ${note.color.toLowerCase()}`}>
        <div className="notes-card-header">
          <h3 className="notes-card-title">{note.title}</h3>
          <div className="notes-card-header-side">
            {note.priority !== "Default" ? (
              <div className="priority">{note.priority}</div>
            ) : null}
            <button title="Pin" className="notes-card-action" onClick={pinNote}>
              {note.isPinned ? (
                <BsPinFill className="thumb-icon" />
              ) : (
                <BsPin className="thumb-icon" />
              )}
            </button>
          </div>
        </div>
        <div className="notes-card-text">{ReactHtmlParser(note.text)}</div>
        {note.label !== "" ? <div className="label">{note.label}</div> : null}
        <div className="notes-card-footer">
          <div className="notes-creation-details">
            <p>
              {getDate(note.date)} | {getTime(note.date)}
            </p>
          </div>
          <div className="notes-card-footer-actions">
            <button
              title="Delete"
              className="notes-card-action"
              onClick={addToTrash}
            >
              <FaTrash className="note-icon" />
            </button>

            {pathname === "/trash" ? (
              <button
                title="Restore"
                className="notes-card-action"
                onClick={restoreFromTrash}
              >
                <FaTrashRestore className="note-icon" />
              </button>
            ) : null}

            {pathname === "/notes" || pathname.includes("labels") ? (
              <button
                title="Edit"
                className="notes-card-action"
                onClick={editModalHandler}
              >
                <FaEdit className="note-icon" />
              </button>
            ) : null}

            {pathname === "/trash" ? null : pathname !== "/archive" ? (
              <button
                title="Archive"
                className="notes-card-action"
                onClick={addToArchive}
              >
                <FaArchive className="note-icon" />
              </button>
            ) : (
              <button
                title="Unarchive"
                className="notes-card-action"
                onClick={restoreFromArchive}
              >
                <FaArchive className="note-icon" />
              </button>
            )}
          </div>
        </div>
      </div>
      {showCreateModal ? (
        <NotesModal
          setShowCreateModal={setShowCreateModal}
          noteData={note}
          editData={true}
        />
      ) : null}
    </>
  );
};
export { NotesCard };
