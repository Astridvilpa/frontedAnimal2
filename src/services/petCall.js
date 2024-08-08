const BASE_URL = "http://localhost:4000/api";

export const createPet = async (petData, token) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petData),
    };
  
    try {
      const response = await fetch(`${BASE_URL}/pets`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating pet:", error);
      return { success: false, message: error.message };
    }
  };

  export const getAllPets = async (token) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await fetch(`${BASE_URL}/pets`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pets:", error);
      return { success: false, message: error.message };
    }
  };
  

export const getPetById = async (id, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/pets/${id}`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error getting pet:", error);
    return { success: false, message: error.message };
  }
};

export const updatePetById = async (data, token) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(`${BASE_URL}/pets/${data.id}`, options);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error updating pet:", error);
      return { success: false, message: error.message };
    }
  };

export const deletePetById = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/pets/${id}`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error deleting pet:", error);
    return { success: false, message: error.message };
  }
};

export const getPetAppointments = async (id, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/pets/${id}/appointments`, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error getting pet appointments:", error);
    return { success: false, message: error.message };
  }
};