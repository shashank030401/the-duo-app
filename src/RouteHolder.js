import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import AddNewMemory from "./Pages/AddNewMemory";
import Memory from "./Pages/Memory";

function RouteHolder() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add-new-memory" element={<AddNewMemory />} />
      <Route path="/memory/:id" element={<Memory />} />
      <Route path="/memory/edit/:id" element={<AddNewMemory isEdit={true} />} />
    </Routes>
  );
}

export default RouteHolder;
