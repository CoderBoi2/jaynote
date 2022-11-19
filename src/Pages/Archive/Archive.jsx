import React, { useEffect } from "react";
import "./Archive.css";
import { useArchive, useSideNav } from "../../context/";
import { SideNav, NotesCard, Header } from "../../components";

const Archive = () => {
  const {
    archiveState: { archives },
  } = useArchive();

  const { setSideNavOpen } = useSideNav();

  useEffect(() => {
    setSideNavOpen(false);
  }, []);

  return (
    <>
      <main className="main-section">
        <SideNav />
        <section className="notes-content">
          <Header />
          <section className="section-title-container">
            <h2 className="section-title">Archives</h2>
          </section>
          {archives.length > 0 ? (
            <section className="cards-container">
              {archives.map((note) => (
                <NotesCard key={note._id} note={note} />
              ))}
            </section>
          ) : (
            <section className="empty-container">
              <h3 className="empty-text">Archives donot have any notes.</h3>
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export { Archive };
