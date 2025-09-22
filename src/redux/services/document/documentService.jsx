import axios from "../../utils/axiosCustomize";

// Document API Service
const documentService = {
  trashDocument: async (Doc) => {
    try {
      const response = await axios.post("/document/trash",{Doc});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  restoreDocument: async (Doc) => {
    try {
      const response = await axios.post("/document/restore",{Doc});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocByUserIdAndType: async (userId, folderType) => {
    try {
      const response = await axios.get(`/document/folder/${userId}/${folderType}`);
      return response.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocByUserId: async (userId) => {
    try {
      const response = await axios.get(`/document/folders/${userId}`);
      return response.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocSavedByUserId: async (userId) => {
    try {
      const response = await axios.get(`/document/saved/${userId}`);
      return response.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocAllByUserId: async (userId) => {
    try {
      const response = await axios.get(`/document/all/${userId}`);
      return response.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocTrashByUserId: async (userId) => {
    try {
      const response = await axios.get(`/document/trash/${userId}`);
      return response.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteDocpermanent: async () => {
    try {
      const response = await axios.delete(`/document/permanent`);
      return response.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadFile: async (file) => {
    try {
      const response = await axios.post("/documentClassification/upload-file",{file});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadUrl: async (url) => {
    try {
      const response = await axios.post("/documentClassification/process-url",{url});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  cleanTemp: async (temp) => {
    try {
      const response = await axios.post("/documentClassification/cleanup-temp",{temp});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  cleanTemp: async (data) => {
    try {
      const response = await axios.post("/documentMetadata/extract-and-save",{data});
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default documentService;
