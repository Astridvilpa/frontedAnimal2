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
      // Aquí obtenemos la cita recién creada
      const newAppointmentRes = await getUserAppointments(userId, userToken.token);
      
      // Actualizamos el estado para que incluya la nueva cita con todos los datos relacionados
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
      date: appointment.date,
      service_id: appointment.service_id || "",
      veterinario_id: appointment.veterinario_id || "",
      pet_id: appointment.pet_id || "",
      user_id: userId,
    });
  };

  const handleEditAppointmentChange = (e) => setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { id: editingAppointment, ...newAppointment, user_id: userId };
    const response = await updateAppointmentById(appointmentData, userToken.token);
    if (response.success) {
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
    />
  );
};

export default AppointmentListContainer;