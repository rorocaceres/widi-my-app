// src/componentes/Layout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: "220px", padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
