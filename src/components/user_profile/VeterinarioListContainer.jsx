import React, { useState, useEffect } from "react";
import { getAllVeterinarios, createVeterinario, updateVeterinarioById, deleteVeterinarioById } from "../../services/veterinariosCall";
import VeterinarioList from "../listas/VeterinarioList";
import { useAuth } from "../../contexts/auth-context/AuthContext";

const VeterinarioListContainer = ({ isAdmin }) => {
  const { userToken } = useAuth();
  const [veterinarios, setVeterinarios] = useState([]);
  const [editingVeterinario, setEditingVeterinario] = useState(null);
  const [editVeterinarioForm, setEditVeterinarioForm] = useState({ name: "", especialidad: "" });
  const [showVeterinarioForm, setShowVeterinarioForm] = useState(false);

  useEffect(() => {
    const fetchVeterinarios = async () => {
      const response = await getAllVeterinarios(userToken.token);
      if (response.success) setVeterinarios(response.data);
      else console.error("Error al obtener veterinarios:", response.message);
    };
    fetchVeterinarios();
  }, [userToken]);

  const handleCreateVeterinario = async () => {
    const response = await createVeterinario(editVeterinarioForm, userToken.token);
    if (response.success) {
      setVeterinarios([...veterinarios, response.data]);
      setShowVeterinarioForm(false);
      setEditVeterinarioForm({ name: "", especialidad: "" });
    } else console.error("Error al crear el veterinario:", response.message);
  };

  const handleEditVeterinarioClick = (veterinario) => {
    setEditingVeterinario(editingVeterinario === veterinario.id ? null : veterinario.id);
    setEditVeterinarioForm(editingVeterinario === veterinario.id ? { name: "", especialidad: "" } : veterinario);
  };

  const handleEditVeterinarioChange = (e) => setEditVeterinarioForm({ ...editVeterinarioForm, [e.target.name]: e.target.value });

  const handleEditVeterinarioSubmit = async (e) => {
    e.preventDefault();
    const response = await updateVeterinarioById({ id: editingVeterinario, ...editVeterinarioForm }, userToken.token);
    if (response.success) {
      const updatedVeterinarios = veterinarios.map((veterinario) => (veterinario.id === editingVeterinario ? { ...veterinario, ...editVeterinarioForm } : veterinario));
      setVeterinarios(updatedVeterinarios);
      setEditingVeterinario(null);
    } else console.error("Error al actualizar el veterinario:", response.message);
  };

  const handleDeleteVeterinarioClick = async (veterinarioId) => {
    const response = await deleteVeterinarioById(veterinarioId, userToken.token);
    if (response.success) setVeterinarios(veterinarios.filter((veterinario) => veterinario.id !== veterinarioId));
    else console.error("Error al eliminar el veterinario:", response.message);
  };

  return (
    <VeterinarioList
      veterinarios={veterinarios}
      handleEditVeterinarioClick={handleEditVeterinarioClick}
      handleDeleteVeterinarioClick={handleDeleteVeterinarioClick}
      editingVeterinario={editingVeterinario}
      handleEditVeterinarioSubmit={handleEditVeterinarioSubmit}
      handleEditVeterinarioChange={handleEditVeterinarioChange}
      editVeterinarioForm={editVeterinarioForm}
      showVeterinarioForm={showVeterinarioForm}
      setShowVeterinarioForm={setShowVeterinarioForm}
      handleCreateVeterinario={handleCreateVeterinario}
    />
  );
};

export default VeterinarioListContainer;