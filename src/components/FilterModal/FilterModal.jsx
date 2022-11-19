import React from "react";
import { useFilter } from "../../context/";
import { FaFilter } from "react-icons/fa";
import "./FilterModal.css";

const FilterModal = ({ showFilterModal, setShowFilterModal }) => {
  const {
    filterState: { sortByDate, sortByPriority },
    filterDispatch,
  } = useFilter();
  return (
    <div className="filter">
      <button
        className="btn btn-primary no-max-width flex-align"
        onClick={() => setShowFilterModal((prevVal) => !prevVal)}
      >
        <FaFilter className="margin-right" />
        Filters
      </button>
      <div className={`filter-menu ${showFilterModal ? "filter-active" : ""}`}>
        <div className="filter-header">
          <h2 className="filter-heading">Filters</h2>
          <button
            className="btn btn-primary"
            onClick={() => filterDispatch({ type: "CLEAR_FILTER" })}
          >
            Clear
          </button>
        </div>
        <div className="filter-menu-section">
          <h3 className="filter-title">By Priority</h3>
          <div className="input-group">
            <input
              type="radio"
              name="priority"
              id="lowToHigh"
              checked={sortByPriority === "lowToHigh"}
              onChange={() =>
                filterDispatch({
                  type: "SORT_BY_PRIORITY",
                  payload: "lowToHigh",
                })
              }
            />
            <label htmlFor="lowToHigh">Low To High</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              name="priority"
              id="highToLow"
              checked={sortByPriority === "highToLow"}
              onChange={() => {
                filterDispatch({
                  type: "SORT_BY_PRIORITY",
                  payload: "highToLow",
                });
              }}
            />
            <label htmlFor="highToLow">High To Low</label>
          </div>
        </div>
        <div className="filter-menu-section">
          <h3 className="filter-title">By Time</h3>
          <div className="input-group">
            <input
              type="radio"
              id="newestFirst"
              name="time-filter"
              checked={sortByDate === "newestFirst"}
              onChange={() =>
                filterDispatch({ type: "SORT_BY_DATE", payload: "newestFirst" })
              }
            />
            <label htmlFor="newestFirst">Newest First</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="oldestFirst"
              name="time-filter"
              checked={sortByDate === "oldestFirst"}
              onChange={() =>
                filterDispatch({ type: "SORT_BY_DATE", payload: "oldestFirst" })
              }
            />
            <label htmlFor="oldestFirst">Oldest First</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FilterModal };
