import fetcher from "./fetcher";


export async function getIssues() {
  try {
    const response = await fetcher({
      url: `/api/issues/get-issues`,
      method: "GET",
    });
    return response.data;

  } catch (error) {
    throw error.response.data;
  }
}

export async function getMonths() {
  try {
    const response = await fetcher.get(`/api/create/get-months`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

