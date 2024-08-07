const BASE_URL = "http://localhost:4000/api/";

export const createVeterinario = async (veterinarioData, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(veterinarioData),
  };

  try {
    const response = await fetch(`${BASE_URL}veterinarios`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const getAllVeterinarios = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}veterinarios`, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateVeterinarioById = async (data, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${BASE_URL}veterinarios/${data.id}`, options);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const deleteVeterinarioById = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}veterinarios/${id}`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};