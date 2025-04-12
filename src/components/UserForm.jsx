import { useState, useEffect } from "react";

function UserForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Si se está editando un usuario, establece los valores en el formulario
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // Si no quieres cambiar la contraseña, puedes dejarla vacía
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <button type="submit">{initialData ? "Actualizar" : "Agregar"}</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default UserForm;
