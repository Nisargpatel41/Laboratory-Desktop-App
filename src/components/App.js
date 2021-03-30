import React, { useState } from "react";
import NewContainer from "./NewContainer";
import ReceiptsContainer from "./ReceiptsContainer";
import { ipcRenderer } from "electron";

const App = () => {
  const [view, setView] = useState("new");

  ipcRenderer.on("menu", (event, message) => {
    setView(message);
  });

  return (
    <div className="app">
      {view === "new" ? <NewContainer /> : <ReceiptsContainer />}
    </div>
  );
};

export default App;
