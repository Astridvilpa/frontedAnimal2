import React, { useState, useEffect } from "react";
import { getAllAppointments, getUserAppointments, createAppointment, updateAppointmentById, deleteAppointmentById } from "../../services/appointment";
import { getAllServices } from "../../services/serviceCall";
import { getAllVeterinarios } from "../../services/veterinariosCall";
import { getUserPets } from "../../services/petCall";
import AppointmentList from "../listas/AppointmentList";
import { useAuth } from "../../contexts/auth-context/AuthContext";

const AppointmentListContainer = ({ isAdmin, userId }) => {
  const { userToken } = useAuth();
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
  });
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const [appointmentsRes, servicesRes, veterinariosRes, petsRes] = await Promise.all([
        isAdmin ? getAllAppointments(userToken.token) : getUserAppointments(userId, userToken.token),
        getAllServices(userToken.token),
        getAllVeterinarios(userToken.token),
        getUserPets(userToken.token), // Llamada a la función para obtener las mascotas
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
    const response = await createAppointment(newAppointment, userToken.token);
    if (response.success) {
      setAppointments([...appointments, response.data]);
      setNewAppointment({ type: "", date: "", service_id: "", veterinario_id: "", pet_id: "" });
    } else console.error("Error al crear la cita:", response.message);
  };

  const handleEditAppointmentClick = (appointment) => {
    setEditingAppointment(appointment.id);
    setNewAppointment({
      type: appointment.type,
      date: appointment.date,
      service_id: appointment.service_id || "",
      veterinario_id: appointment.veterinario_id || "",
      pet_id: appointment.pet_id || "", // Asegurando que pet_id esté presente
    });
  };

  const handleEditAppointmentChange = (e) => setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    const response = await updateAppointmentById({ id: editingAppointment, ...newAppointment }, userToken.token);
    if (response.success) {
      setAppointments(appointments.map((appointment) => (appointment.id === editingAppointment ? { ...appointment, ...newAppointment } : appointment)));
      setEditingAppointment(null);
    } else console.error("Error al actualizar la cita:", response.message);
  };

  const handleDeleteAppointmentClick = async (appointmentId) => {
    const response = await deleteAppointmentById(appointmentId, userToken.token);
    if (response.success) setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
    else console.error("Error al eliminar la cita:", response.message);
  };

  return (
    <AppointmentList
      appointments={appointments}
      services={services}
      veterinarios={veterinarios}
      pets={pets} // Pasamos las mascotas al componente
      handleEditAppointmentClick={handleEditAppointmentClick}
      handleDeleteAppointmentClick={handleDeleteAppointmentClick}
      newAppointment={newAppointment}
      handleEditAppointmentChange={handleEditAppointmentChange}
      handleEditAppointmentSubmit={handleEditAppointmentSubmit}
      handleCreateAppointment={handleCreateAppointment}
    />
  );
};

export default AppointmentListContainer;