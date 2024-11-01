// src/App.tsx (or App.js)
import React from "react";

// Components
import Routes from "../src/routes/Routes";

// Context
import { ModalProvider } from "./context/Modal"; // Adjust the path as necessary

const App = () => {
  return (
    <ModalProvider>
      <div className="flex flex-1 flex-col h-screen">
        <Routes />
      </div>
    </ModalProvider>
  );
};

export default App;
