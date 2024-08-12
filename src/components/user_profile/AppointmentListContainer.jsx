import React, { useState, useEffect } from "react";
import { getAllAppointments, getUserAppointments, createAppointment, updateAppointmentById, deleteAppointmentById } from "../../services/appointment";
import { getAllServices } from "../../services/serviceCall";
import { getAllVeterinarios } from "../../services/veterinariosCall";
import { getUserPets } from "../../services/petCall";
import AppointmentList from "../listas/AppointmentList";
import { useAuth } from "../../contexts/auth-context/AuthContext";

const AppointmentListContainer = ({ isAdmin }) => {
  const { userToken } = useAuth();
  const userId = userToken?.decoded?.userId;

  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [pets, setPets] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    type: "",
    date: "",
    service_id: "",
    veterinario_id: "",
    pet_id: "",
    user_id: userId,
  });
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const [appointmentsRes, servicesRes, veterinariosRes, petsRes] = await Promise.all([
        isAdmin ? getAllAppointments(userToken.token) : getUserAppointments(userId, userToken.token),
        getAllServices(userToken.token),
        getAllVeterinarios(userToken.token),
        getUserPets(userToken.token),
      ]);

      if (appointmentsRes.success) setAppointments(appointmentsRes.data);
      else console.error("Error al obtener citas:", appointmentsRes.message);

      if (servicesRes.success) setServices(servicesRes.data);
      else console.error("Error al obtener servicios:", servicesRes.message);

      if (veterinariosRes.success) setVeterinarios(veterinariosRes.data);
      else console.error("Error al obtener veterinarios:", veterinariosRes.message);

      if (petsRes.success) setPets(petsRes.data);
      else console.error("Error al obtener mascotas:", petsRes.message);
    };
    fetchAppointments();
  }, [isAdmin, userId, userToken]);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    const appointmentData = { ...newAppointment, user_id: userId };

    const requiredFields = ['type', 'date', 'service_id', 'veterinario_id', 'pet_id', 'user_id'];
    const missingFields = requiredFields.filter(field => !appointmentData[field]);
    if (missingFields.length > 0) {
      console.error(`Faltan campos requeridos: ${missingFields.join(', ')}`);
      return;
    }

    console.log("Creating appointment with data:", appointmentData);

    const response = await createAppointment(appointmentData, userToken.token);
    if (response.success) {
      const newAppointmentRes = await getUserAppointments(userId, userToken.token);
      setAppointments(newAppointmentRes.data);

      setNewAppointment({
        type: "",
        date: "",
        service_id: "",
        veterinario_id: "",
        pet_id: "",
        user_id: userId,
      });
    } else {
      console.error("Error al crear la cita:", response.message);
      console.error("Detalles del error:", response.error);
    }
  };

  const handleEditAppointmentClick = (appointment) => {
    setEditingAppointment(appointment.id);
    setNewAppointment({
      type: appointment.type,
      date: new Date(appointment.date).toISOString().slice(0, 16), // Formato compatible para el input de tipo datetime-local
      service_id: appointment.Service_id || appointment.service_id || "",
      veterinario_id: appointment.Veterinario_id || appointment.veterinario_id || "",
      pet_id: appointment.Pet_id || appointment.pet_id || "",
      user_id: userId,
    });
  };

  const handleEditAppointmentChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { id: editingAppointment, ...newAppointment, user_id: userId };

    console.log("Datos enviados para la actualización:", appointmentData);

    const response = await updateAppointmentById(appointmentData, userToken.token);
    console.log("Respuesta de la actualización de la cita:", response);

    if (response.success) {
      // Recargar la lista de citas para reflejar los cambios
      const updatedAppointments = await getUserAppointments(userId, userToken.token);
      setAppointments(updatedAppointments.data);
      setEditingAppointment(null);
    } else {
      console.error("Error al actualizar la cita:", response.message);
    }
  };

  const handleDeleteAppointmentClick = async (appointmentId) => {
    const response = await deleteAppointmentById(appointmentId, userToken.token);
    if (response.success) {
      setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
    } else {
      console.error("Error al eliminar la cita:", response.message);
    }
  };

  return (
    <AppointmentList
      appointments={appointments}
      services={services}
      veterinarios={veterinarios}
      pets={pets}
      handleEditAppointmentClick={handleEditAppointmentClick}
      handleDeleteAppointmentClick={handleDeleteAppointmentClick}
      newAppointment={newAppointment}
      handleEditAppointmentChange={handleEditAppointmentChange}
      handleEditAppointmentSubmit={handleEditAppointmentSubmit}
      handleCreateAppointment={handleCreateAppointment}
      editingAppointment={editingAppointment}  // Pasamos el estado de edición al componente hijo
    />
  );
};

export default AppointmentListContainer;