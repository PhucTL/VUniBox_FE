// Document Action Creators
import { DOCUMENT_ACTION_TYPES } from './documentActionTypes';

export const trashRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.TRASH_REQUEST,
});
export const trashSuccess = (doc) => ({
  type: DOCUMENT_ACTION_TYPES.TRASH_SUCCESS,
  payload: doc,
});
export const trashFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.TRASH_FAILURE,
  payload: error,
});

export const restoreRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.RESTORE_REQUEST,
});
export const restoreSuccess = (doc) => ({
  type: DOCUMENT_ACTION_TYPES.RESTORE_SUCCESS,
  payload: doc,
});
export const restoreFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.RESTORE_FAILURE,
  payload: error,
});

export const getFolderUserIdTypeRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_TYPE_REQUEST,
});
export const getFolderUserIdTypeSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_TYPE_SUCCESS,
  payload,
});
export const getFolderUserIdTypeFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_TYPE_FAILURE,
  payload: error,
});

export const getFolderUserIdRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_REQUEST,
});
export const getFolderUserIdSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_SUCCESS,
  payload,
});
export const getFolderUserIdFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_FAILURE,
  payload: error,
});

export const getSavedUserIdRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.GET_SAVED_USERID_REQUEST,
});
export const getSavedUserIdSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.GET_SAVED_USERID_SUCCESS,
  payload,
});
export const getSavedUserIdFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.GET_SAVED_USERID_FAILURE,
  payload: error,
});

export const getAllUserIdRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.GET_ALL_USERID_REQUEST,
});
export const getAllUserIdSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.GET_ALL_USERID_SUCCESS,
  payload,
});
export const getAllUserIdFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.GET_ALL_USERID_FAILURE,
  payload: error,
});

export const getTrashUserIdRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.GET_TRASH_USERID_REQUEST,
});
export const getTrashUserIdSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.GET_TRASH_USERID_SUCCESS,
  payload,
});
export const getTrashUserIdFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.GET_TRASH_USERID_FAILURE,
  payload: error,
});

export const deletePermanentRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.DELETE_PERMANENT_REQUEST,
});
export const deletePermanentSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.DELETE_PERMANENT_SUCCESS,
  payload,
});
export const deletePermanentFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.DELETE_PERMANENT_FAILURE,
  payload: error,
});

export const uploadFileRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.UPLOAD_FILE_REQUEST,
});
export const uploadFileSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.UPLOAD_FILE_SUCCESS,
  payload,
});
export const uploadFileFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.UPLOAD_FILE_FAILURE,
  payload: error,
});

export const processUrlRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.PROCESS_URL_REQUEST,
});
export const processUrlSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.PROCESS_URL_SUCCESS,
  payload,
});
export const processUrlFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.PROCESS_URL_FAILURE,
  payload: error,
});

export const cleanupTempRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.CLEANUP_TEMP_REQUEST,
});
export const cleanupTempSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.CLEANUP_TEMP_SUCCESS,
  payload,
});
export const cleanupTempFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.CLEANUP_TEMP_FAILURE,
  payload: error,
});

export const extractSaveRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.EXTRACT_SAVE_REQUEST,
});
export const extractSaveSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.EXTRACT_SAVE_SUCCESS,
  payload,
});
export const extractSaveFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.EXTRACT_SAVE_FAILURE,
  payload: error,
});

export const extractMetadataRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.EXTRACT_METADATA_REQUEST,
});
export const extractMetadataSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.EXTRACT_METADATA_SUCCESS,
  payload,
});
export const extractMetadataFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.EXTRACT_METADATA_FAILURE,
  payload: error,
});

export const getMetadataDocIdRequest = () => ({
  type: DOCUMENT_ACTION_TYPES.GET_METADATA_DOCID_REQUEST,
});
export const getMetadataDocIdSuccess = (payload) => ({
  type: DOCUMENT_ACTION_TYPES.GET_METADATA_DOCID_SUCCESS,
  payload,
});
export const getMetadataDocIdFailure = (error) => ({
  type: DOCUMENT_ACTION_TYPES.GET_METADATA_DOCID_FAILURE,
  payload: error,
});
