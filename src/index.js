import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {
  AuthProvider,
  NotesProvider,
  ArchiveProvider,
  TrashProvider,
  LabelProvider,
  FilterProvider,
  SideNavProvider,
} from "./context/";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <LabelProvider>
        <NotesProvider>
          <TrashProvider>
            <ArchiveProvider>
              <FilterProvider>
                <SideNavProvider>
                  <App />
                </SideNavProvider>
              </FilterProvider>
            </ArchiveProvider>
          </TrashProvider>
        </NotesProvider>
      </LabelProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
