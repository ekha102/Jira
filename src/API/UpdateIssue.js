
import axios from "axios";
import fetcher from "./fetcher";


export const getFormIssueId = async (issueId) => {
  try {
    const response = await fetcher.get(`/api/edit/get-issueId/${issueId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data
  }
}

// Update the data into the specific id:
export const updateFormIssueById = async (issueId, payload) => {
  try {
    const response = await fetcher.put(`/api/edit/put-issueUpdate/${issueId}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}