// import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mx-auto overflow-x-auto max-w-6xl rounded-lg border-t-6 border-blue-900 p-6 mt-4 shadow-[0px_5px_7px_rgba(0,0,0,0.3)]">
      <Outlet />
    </div>
  );
}

export default App;
