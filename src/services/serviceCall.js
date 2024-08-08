const BASE_URL = "http://localhost:4000/api";

export const getAllServices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return { success: false, message: "Error fetching services", error };
  }
};

export const createService = async (serviceData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, message: "Error creating service", error };
  }
};

export const updateServiceById = async (serviceData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/services/${serviceData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, message: "Error updating service", error };
  }
};

export const deleteServiceById = async (id, token) => {
  try {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, message: "Error deleting service", error };
  }
};