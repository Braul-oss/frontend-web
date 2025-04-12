// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState(""); // si tu API pide nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/", {
        name,
        email,
        password,
      });

      // Redireccionar al login al registrarse
      navigate("/login");
    } catch (err) {
      setError("Error al registrar. Verifica los datos.");
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Registro</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: 15 }}>Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
