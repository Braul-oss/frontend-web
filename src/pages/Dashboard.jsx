import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import Navbar from "../components/navbar";

function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getUsuarios = async () => {
    try {
      const res = await api.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  // Editar usuario
  const handleEdit = (usuario) => {
    setEditUser(usuario);
    setShowForm(true);
  };

  // Guardar cambios
  const handleUpdateUser = async (data) => {
    try {
      await api.put(`/${editUser.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditUser(null);
      setShowForm(false);
      getUsuarios();
    } catch (err) {
      console.error("Error al editar usuario", err);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmar) return;

    try {
      await api.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  // Agregar usuario
  const handleAddUser = async (data) => {
    try {
      await api.post("/", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      getUsuarios();
    } catch (err) {
      console.error("Error al crear usuario", err);
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Cerrar Sesión
      </button>

      <h3 style={{ marginTop: "20px" }}>Usuarios</h3>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar formulario" : "Agregar usuario"}
      </button>

      {showForm && (
        <UserForm
          onSubmit={editUser ? handleUpdateUser : handleAddUser}
          initialData={editUser}
          onCancel={() => {
            setShowForm(false);
            setEditUser(null);
          }}
        />
      )}

      {usuarios.length === 0 ? (
        <p>No hay usuarios.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => handleEdit(usuario)}>Editar</button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
