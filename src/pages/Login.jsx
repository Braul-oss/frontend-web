// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await api.post("/login", { email, password });
  
      if (res.data && res.data.user) {
        // Guarda los datos del usuario en localStorage (opcional)
        localStorage.setItem("user", JSON.stringify(res.data.user));
  
        // Redirecciona al dashboard
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };
  
  

  return (
    <div className="login-container" style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
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

        <button type="submit" style={{ marginTop: 15 }}>Iniciar sesión</button>
        <button
        onClick={() => navigate("/register")}
        style={{ marginTop: "20px", marginLeft: "10px" }}
      >
        Registrarse
      </button>
      </form>
    </div>
  );
}

export default Login;
