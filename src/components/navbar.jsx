// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  return (
    <nav style={{
      background: "#333",
      color: "#fff",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h3 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        Mi Aplicación
      </h3>
      <button onClick={onLogout} style={{
        background: "#e74c3c",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer"
      }}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;
