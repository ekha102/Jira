import fetcher from "./fetcher";



export async function getMonths() {
  try {
    const response = await fetcher.get(`/api/create/get-months`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get the Priority from the BE data 
export async function getPriority () {
  try {
    const response = await fetcher.get(`/api/create/get-priority`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Get the status from the BE data
export async function getStatus () {
  try {
    const response = await fetcher.get(`/api/create/get-status`);
    return response.data;
  } catch (error) {
    throw error.response.data;    
  }
}


export async function getDays () {
  try {
    const response = await fetcher.get(`/api/create/get-days`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getLocations () {
  try {
    const response = await fetcher.get(`/api/create/get-locations`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getCreatedIssue = async (payload) => {
  try {
    const response = await fetcher.post(`/api/create/created-issue`, payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}