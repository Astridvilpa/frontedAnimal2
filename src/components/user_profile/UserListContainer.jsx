import React, { useState, useEffect } from "react";
import { getAllUsers, updateUserById, deleteUserById } from "../../services/userCall";
import UserList from "../listas/UserList";
import { useAuth } from "../../contexts/auth-context/AuthContext";

const UserListContainer = ({ isAdmin }) => {
  const { userToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", lastName: "", email: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers(userToken.token);
      if (response.success) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        console.error("Error al obtener usuarios:", response.message);
      }
    };
    if (isAdmin) fetchUsers();
  }, [isAdmin, userToken]);

  const handleEditUserClick = (user) => {
    setEditingUser(editingUser === user.id ? null : user.id);
    setEditForm(editingUser === user.id ? { name: "", lastName: "", email: "" } : user);
  };

  const handleEditUserChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUserById({ id: editingUser, ...editForm }, userToken.token);
    if (response.success) {
      const updatedUsers = users.map((user) => (user.id === editingUser ? { ...user, ...editForm } : user));
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setEditingUser(null);
    } else {
      console.error("Error al actualizar el usuario:", response.message);
    }
  };

  const handleDeleteUserClick = async (userId) => {
    const response = await deleteUserById(userId, userToken.token);
    if (response.success) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } else {
      console.error("Error al eliminar el usuario:", response.message);
    }
  };

  return (
    <UserList
      users={filteredUsers}
      filter={filter}
      setFilter={setFilter}
      handleEditUserClick={handleEditUserClick}
      handleDeleteUserClick={handleDeleteUserClick}
      editingUser={editingUser}
      handleEditUserSubmit={handleEditUserSubmit}
      handleEditUserChange={handleEditUserChange}
      editForm={editForm}
    />
  );
};

export default UserListContainer;