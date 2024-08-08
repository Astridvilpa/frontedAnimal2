const BASE_URL = "http://localhost:4000/api";

export const getProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/users/profile`, options);
    if (!response.ok) {
      throw new Error('Error al recuperar el perfil');
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const getAllUsers = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/users`, options);
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const updateProfile = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${BASE_URL}/users/profile`, options);
    if (!response.ok) {
      throw new Error('Error al actualizar el perfil');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const updateUserById = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${BASE_URL}/users/${data.id}`, options);
    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const deleteUserById = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, options);
    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};