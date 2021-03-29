import React from "react";
import NewContainer from "./NewContainer";
import ReceiptsContainer from "./ReceiptsContainer";

const App = () => {
  return (
    <div className="app">
      {/* <NewContainer /> */}
      <ReceiptsContainer />

      {/* <Button variant="primary" onClick={() => setModal(true)}>
        Launch Modal
      </Button> */}
    </div>
  );
};

export default App;
