
import fetcher from "./fetcher";


export async function getBacklog () {
  try {
    const response = await fetcher.get(`/api/backlog/get-backlog`);
    return response.data;
  } catch (error) {
    throw error.response.data;    
  }
}

