import React, { useEffect } from "react";
import AppContainer from "./Container";

import { ipcRenderer } from "electron";

const App = () => {
  useEffect(() => {
    let item = { text: "hello" };
    ipcRenderer.send("logs:add", item);
  }, []);
  return (
    <div className="app">
      <AppContainer />
    </div>
  );
};

export default App;
