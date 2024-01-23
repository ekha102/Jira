import axios from "axios";


// Render the Table List:
export async function getInventories(queryParams, value='') {
  try {
    const response = await axios({
      url: `https://638938d84eccb986e88e4394.mockapi.io/inventories?${queryParams}=${value}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Post the textField data into the form for API:
export const getFormData = async (payload) => {
  try {
    const response = await axios({
      url: "https://638938d84eccb986e88e4394.mockapi.io/inventories",
      method: "POST",
      data: payload,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Delete the item out of the API
export const getDeletedId = async (itemId) => {
  try {
    const response = await axios.delete(`https://638938d84eccb986e88e4394.mockapi.io/inventories/${itemId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}






// Get the latest data from API for edit 
export const getFormItemId = async (itemId) => {
  try {
    const response = await axios.get(`https://638938d84eccb986e88e4394.mockapi.io/inventories/${itemId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data
  }
}

// Put: after edit the data put into the API
export const updateFormItemById = async (itemId, payload) => {
  try {
    const response = await axios.put(`https://638938d84eccb986e88e4394.mockapi.io/inventories/${itemId}`, payload)
    return response.data
  } catch (error) {
    throw new Error(error.response.data)
  }
}



