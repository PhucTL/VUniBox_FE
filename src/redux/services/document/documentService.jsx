import axios from "../../utils/axiosCustomize";

// Document API Service
const documentService = {
  trashDocument: async (Doc) => {
    try {
      const response = await axios.post("/api/document/trash", Doc);
      return response; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  restoreDocument: async (Doc) => {
    try {
      const response = await axios.post("/api/document/restore", Doc);
      return response; 
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


    getDocByUserIdAndType: async (userId, folderType, page = 1, pageSize = 6) => {
      try {
        const response = await axios.get(`/api/document/folder/${userId}/${folderType}?page=${page}&pageSize=${pageSize}`);
        return response?.result;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },

   getDocByUserId: async (userId) => {
    try {
      const response = await axios.get(`/api/document/folders/${userId}`);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocSavedByUserId: async (userId) => {
    try {
      const response = await axios.get(`/api/document/saved/${userId}`);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocAllByUserId: async (userId, status = "", type = "") => {
    try {
      const query = [];
      if (status) query.push(`status=${encodeURIComponent(status)}`);
      if (type) query.push(`type=${encodeURIComponent(type)}`);
      const queryString = query.length ? `?${query.join("&")}` : "";
      const response = await axios.get(`/api/document/all/${userId}${queryString}`);
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getDocTrashByUserId: async (userId) => {
    try {
      const response = await axios.get(`/api/document/trash/${userId}`);
      return response?.result ;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteDocPermanent: async (documentId, userId) => {
    try {
      const response = await axios.delete(`/api/document/permanent`, {
        data: { documentId, userId }
      });
      return response?.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "/api/documentClassification/upload-file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadUrl: async (url) => {
    try {
      const response = await axios.post(
        "/api/documentClassification/process-url",
        { url }
      );
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  cleanTemp: async (temp) => {
    try {
      const response = await axios.post("/api/documentClassification/cleanup-temp",temp);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  extractAndSave: async (data) => {
    try {
      const response = await axios.post("/api/documentMetadata/extract-and-save",data);
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default documentService;
