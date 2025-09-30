import axios from "../../utils/axiosCustomize";

const citationService = {
    generateCitaion: async (data) => {
    try {
      const response = await axios.post("/api/citation/generate", data);
      return response; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  regenerateCitaion: async (data) => {
    try {
      const response = await axios.post("/api/citation/regenerate", data);
      return response; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
 
  getCitationStyle: async () => {
    try {
      const response = await axios.get("/api/citation/styles");
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
};

export default citationService;