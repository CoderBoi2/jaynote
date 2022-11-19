import React, { useState } from "react";
import { formatDate } from "../../backend/utils/authUtils";
import { TextEditor, LabelModal } from "../index";
import { toast } from "react-toastify";
import { useNotes, useAuth, useLabel } from "../../context/";
import { addNoteHandler, editNoteHandler } from "../../functions/";
import { FaTimes } from "react-icons/fa";
import "./NotesModal.css";

const NotesModal = ({ setShowCreateModal, editData, noteData }) => {
  const { notesDispatch } = useNotes();

  const {
    labelState: { labels },
  } = useLabel();

  const data = editData
    ? noteData
    : {
        title: "",
        text: "",
        label: "",
        color: "White",
        priority: "low",
        isPinned: false,
      };

  const [newNote, setNewNote] = useState(data);

  const [showLabelModal, setShowLabelModal] = useState(false);

  const {
    authState: { token },
  } = useAuth();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({ ...prev, [name]: value }));
  };

  const checkInputs = () => {
    if (newNote.title === "") {
      toast.warning("Note Title is required");
      return false;
    } else if (newNote.text === "") {
      toast.warning("Note Content is required");
      return false;
    } else {
      return true;
    }
  };

  const createNoteHandler = () => {
    const currentDate = formatDate();
    const note = { ...newNote, date: currentDate };
    if (checkInputs()) {
      editData
        ? editNoteHandler(token, note, notesDispatch)
        : addNoteHandler(token, note, notesDispatch);
      setShowCreateModal(false);
    }
  };

  return (
    <section className="note-editor-wrapper  modal-active">
      <section className="note-editor">
        <div className="note-editor-header">
          <h2 className="note-editor-title">
            {editData ? "Update Note" : "Create Note"}
          </h2>
          <button onClick={() => setShowCreateModal(false)}>
            <FaTimes className="close-btn" />
          </button>
        </div>
        <div className="note-editor-content">
          <input
            type="text"
            name="title"
            placeholder="Title..."
            className="note-title"
            value={newNote.title}
            onChange={inputHandler}
          />
          <TextEditor
            className={newNote.color}
            newNote={newNote}
            setNewNote={setNewNote}
          />
        </div>
        <div className="note-editor-options">
          <div className="note-editor-options-element">
            <label htmlFor="label" className="note-editor-label">
              Label
            </label>
            <select
              id="label"
              name="label"
              value={newNote.label}
              onChange={inputHandler}
            >
              <option value="">Select Label</option>
              {labels.map((label) => (
                <option value={label}>{label}</option>
              ))}
            </select>
          </div>
          <div className="note-editor-options-element">
            <label className="note-editor-label" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={newNote.priority}
              onChange={inputHandler}
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="note-editor-options-element">
            <label className="note-editor-label" htmlFor="color">
              Color
            </label>
            <select
              id="color"
              name="color"
              value={newNote.color}
              onChange={inputHandler}
            >
              <option value="white">White</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="orange">Orange</option>
            </select>
          </div>
        </div>
        <div className="note-editor-footer">
          <button onClick={createNoteHandler} className="btn btn-primary">
            {editData ? "Update Note" : "Create Note"}
          </button>
          <button
            onClick={() => setShowLabelModal(true)}
            className="btn btn-primary"
          >
            Add Label
          </button>
        </div>
      </section>
      <LabelModal
        setShowLabelModal={setShowLabelModal}
        showLabelModal={showLabelModal}
      />
    </section>
  );
};

export { NotesModal };
