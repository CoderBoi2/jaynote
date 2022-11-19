import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLabel } from "../../context/";
import { FaTimes } from "react-icons/fa";
import "./LabelModal.css";

const LabelModal = ({ setShowLabelModal, showLabelModal }) => {
  const [newLabel, setNewLabel] = useState("");

  const {
    labelState: { labels },
    labelDispatch,
  } = useLabel();

  const addNewLabel = () => {
    if (
      !labels.some(
        (label) => label.toLowerCase() === newLabel.trim().toLowerCase()
      )
    ) {
      labelDispatch({ type: "ADD_LABEL", payload: newLabel });
      toast.info("New Label Created!!");
      setShowLabelModal(false);
      setNewLabel("");
    } else {
      toast.error("Label Already Exists");
    }
  };

  return (
    <section
      className={`label-backdrop ${showLabelModal ? "modal-active" : ""}`}
    >
      <section className="add-label-modal">
        <div className="modal-header">
          <h3 className="modal-title">Add New Label</h3>
          <FaTimes
            className="close-btn"
            onClick={() => {
              setShowLabelModal(false);
              setNewLabel("");
            }}
          />
        </div>
        <input
          className="new-label-text"
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Enter Label Name"
          maxLength="10"
        />
        <button onClick={addNewLabel} className="btn btn-primary add-label-btn">
          Create Label
        </button>
      </section>
    </section>
  );
};

export { LabelModal };
