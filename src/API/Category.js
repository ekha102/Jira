import fetcher from "./fetcher";


export const getCats = async () => {
  try {
    const response = await fetcher.get('/api/categories/get-cats');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}


// ask Tien how to get the resolve output wait here without call from frontend (jsx).



