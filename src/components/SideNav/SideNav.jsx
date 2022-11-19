import React, { useState } from "react";
import { LabelModal } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useAuth,
  useNotes,
  useArchive,
  useTrash,
  useLabel,
  useSideNav,
} from "../../context/";
import { toast } from "react-toastify";
import {
  FaLightbulb,
  FaTags,
  FaTag,
  FaArchive,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import "./SideNav.css";

const SideNav = () => {
  const [showLabelModal, setShowLabelModal] = useState(false);

  const { authDispatch } = useAuth();

  const { archiveDispatch } = useArchive();

  const { trashDispatch } = useTrash();

  const { notesDispatch } = useNotes();

  const { sideNavOpen, setSideNavOpen } = useSideNav();

  const {
    labelState: { labels },
  } = useLabel();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authDispatch({ type: "LOGOUT" });
    notesDispatch({ type: "CLEAR_NOTES" });
    archiveDispatch({ type: "CLEAR_ARCHIVES" });
    trashDispatch({ type: "CLEAR_TRASH" });
    setSideNavOpen(false);
    toast.success("Logout Successful");
  };

  return (
    <>
      <aside className={`side-nav ${sideNavOpen ? "side-nav-active" : ""}`}>
        <div className="side-nav-brand">
          <h1 onClick={() => navigate("/")}>
            <span className="primary">Notes</span>Up
          </h1>

          <FaTimes
            className="close-side-nav"
            onClick={() => setSideNavOpen(false)}
          />
        </div>
        <div className="side-nav-items">
          <NavLink to="/notes" className="side-nav-item">
            <div className="side-nav-icon">
              <FaLightbulb />
            </div>
            <div className="side-nav-text">Notes</div>
          </NavLink>

          <hr />

          <div>
            <div className="side-nav-item">
              <div className="side-nav-icon">
                <FaTags />
              </div>
              <div className="side-nav-text">Labels</div>
            </div>
            <div className="tag-labels">
              {labels &&
                labels.map((label, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/labels/${label}`)}
                    className="side-nav-item tag-label"
                  >
                    <FaTag className="tag-menu-icon" />
                    {label}
                  </div>
                ))}
            </div>
            <button
              className="btn btn-primary no-max-width flex-align"
              onClick={() => setShowLabelModal(true)}
            >
              <FiPlus className="margin-right" />
              Add Label
            </button>
          </div>

          <hr />

          <NavLink to="/archive" className="side-nav-item">
            <div className="side-nav-icon">
              <FaArchive />
            </div>
            <div className="side-nav-text">Archive</div>
          </NavLink>

          <NavLink to="/trash" className="side-nav-item">
            <div className="side-nav-icon">
              <FaTrash />
            </div>
            <div className="side-nav-text">Trash</div>
          </NavLink>

          <button
            onClick={logoutHandler}
            className="side-nav-item no-max-width"
          >
            <div className="side-nav-icon">
              <RiLogoutCircleRLine />
            </div>
            <div className="side-nav-text">Logout</div>
          </button>
        </div>
      </aside>
      <LabelModal
        setShowLabelModal={setShowLabelModal}
        showLabelModal={showLabelModal}
      />
    </>
  );
};

export { SideNav };
