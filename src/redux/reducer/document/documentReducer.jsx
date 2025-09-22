import { DOCUMENT_ACTION_TYPES } from "../../actions/document/documentActionTypes";

const initialState = {
  // Loading states
  isLoading: false,
  isTrashLoading: false,
  isRestoreLoading: false,
  isGetFolderTypeLoading: false,
  isGetFolderByIdLoading: false,
  isGetSavedByIdLoading: false,
  isGetAllByIdLoading: false,
  isGetTrashByIdLoading: false,
  isDeletePermanentLoading: false,
  isUploadFileLoading: false,
  isProcessUrlLoading: false,
  isCleanupTempLoading: false,
  isExtractSaveLoading: false,
  isExtractMetadataLoading: false,
  isGetMetadataByDocIdLoading: false,

  // Error states
  error: null,
  trashError: null,
  restoreError: null,
  getFolderTypeError: null,
  getFolderByIdError: null,
  getSavedByIdError: null,
  getAllByIdError: null,
  getTrashByIdError: null,
  deletePermanentError: null,
  uploadFileError: null,
  processUrlError: null,
  cleanupTempError: null,
  extractSaveError: null,
  extractMetadataError: null,
  getMetadataByDocIdError: null,

  // Success states
  trashSuccess: false,
  restoreSuccess: false,
  getFolderTypeSuccess: false,
  getFolderByIdSuccess: false,
  getSavedByIdSuccess: false,
  getAllByIdSuccess: false,
  getTrashByIdSuccess: false,
  deletePermanentSuccess: false,
  uploadFileSuccess: false,
  processUrlSuccess: false,
  cleanupTempSuccess: false,
  extractSaveSuccess: false,
  extractMetadataSuccess: false,
  getMetadataByDocIdSuccess: false,
};

const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    // TRASH Cases
    case DOCUMENT_ACTION_TYPES.TRASH_REQUEST:
      return {
        ...state,
        isTrashLoading: true,
        isLoading: true,
        trashError: null,
        trashSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.TRASH_SUCCESS:
      return {
        ...state,
        isTrashLoading: false,
        isLoading: false,
        trashError: null,
        trashSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.TRASH_FAILURE:
      return {
        ...state,
        isTrashLoading: false,
        isLoading: false,
        trashError: action.payload,
        trashSuccess: false,
        error: action.payload,
      };

    // RESTORE Cases
    case DOCUMENT_ACTION_TYPES.RESTORE_REQUEST:
      return {
        ...state,
        isRestoreLoading: true,
        isLoading: true,
        restoreError: null,
        restoreSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.RESTORE_SUCCESS:
      return {
        ...state,
        isRestoreLoading: false,
        isLoading: false,
        restoreError: null,
        restoreSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.RESTORE_FAILURE:
      return {
        ...state,
        isRestoreLoading: false,
        isLoading: false,
        restoreError: action.payload,
        restoreSuccess: false,
        error: action.payload,
      };

    // GET_FOLDER_USERID_TYPE Cases
    case DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_TYPE_REQUEST:
      return {
        ...state,
        isGetFolderTypeLoading: true,
        isLoading: true,
        getFolderTypeError: null,
        getFolderTypeSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_TYPE_SUCCESS:
      return {
        ...state,
        isGetFolderTypeLoading: false,
        isLoading: false,
        getFolderTypeError: null,
        getFolderTypeSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_TYPE_FAILURE:
      return {
        ...state,
        isGetFolderTypeLoading: false,
        isLoading: false,
        getFolderTypeError: action.payload,
        getFolderTypeSuccess: false,
        error: action.payload,
      };

    // GET_FOLDER_USERID Cases
    case DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_REQUEST:
      return {
        ...state,
        isGetFolderByIdLoading: true,
        isLoading: true,
        getFolderByIdError: null,
        getFolderByIdSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_SUCCESS:
      return {
        ...state,
        isGetFolderByIdLoading: false,
        isLoading: false,
        getFolderByIdError: null,
        getFolderByIdSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.GET_FOLDER_USERID_FAILURE:
      return {
        ...state,
        isGetFolderByIdLoading: false,
        isLoading: false,
        getFolderByIdError: action.payload,
        getFolderByIdSuccess: false,
        error: action.payload,
      };

    // GET_SAVED_USERID Cases
    case DOCUMENT_ACTION_TYPES.GET_SAVED_USERID_REQUEST:
      return {
        ...state,
        isGetSavedByIdLoading: true,
        isLoading: true,
        getSavedByIdError: null,
        getSavedByIdSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.GET_SAVED_USERID_SUCCESS:
      return {
        ...state,
        isGetSavedByIdLoading: false,
        isLoading: false,
        getSavedByIdError: null,
        getSavedByIdSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.GET_SAVED_USERID_FAILURE:
      return {
        ...state,
        isGetSavedByIdLoading: false,
        isLoading: false,
        getSavedByIdError: action.payload,
        getSavedByIdSuccess: false,
        error: action.payload,
      };

    // GET_ALL_USERID Cases
    case DOCUMENT_ACTION_TYPES.GET_ALL_USERID_REQUEST:
      return {
        ...state,
        isGetAllByIdLoading: true,
        isLoading: true,
        getAllByIdError: null,
        getAllByIdSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.GET_ALL_USERID_SUCCESS:
      return {
        ...state,
        isGetAllByIdLoading: false,
        isLoading: false,
        getAllByIdError: null,
        getAllByIdSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.GET_ALL_USERID_FAILURE:
      return {
        ...state,
        isGetAllByIdLoading: false,
        isLoading: false,
        getAllByIdError: action.payload,
        getAllByIdSuccess: false,
        error: action.payload,
      };

    // GET_TRASH_USERID Cases
    case DOCUMENT_ACTION_TYPES.GET_TRASH_USERID_REQUEST:
      return {
        ...state,
        isGetTrashByIdLoading: true,
        isLoading: true,
        getTrashByIdError: null,
        getTrashByIdSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.GET_TRASH_USERID_SUCCESS:
      return {
        ...state,
        isGetTrashByIdLoading: false,
        isLoading: false,
        getTrashByIdError: null,
        getTrashByIdSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.GET_TRASH_USERID_FAILURE:
      return {
        ...state,
        isGetTrashByIdLoading: false,
        isLoading: false,
        getTrashByIdError: action.payload,
        getTrashByIdSuccess: false,
        error: action.payload,
      };

    // DELETE_PERMANENT Cases
    case DOCUMENT_ACTION_TYPES.DELETE_PERMANENT_REQUEST:
      return {
        ...state,
        isDeletePermanentLoading: true,
        isLoading: true,
        deletePermanentError: null,
        deletePermanentSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.DELETE_PERMANENT_SUCCESS:
      return {
        ...state,
        isDeletePermanentLoading: false,
        isLoading: false,
        deletePermanentError: null,
        deletePermanentSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.DELETE_PERMANENT_FAILURE:
      return {
        ...state,
        isDeletePermanentLoading: false,
        isLoading: false,
        deletePermanentError: action.payload,
        deletePermanentSuccess: false,
        error: action.payload,
      };

    // UPLOAD_FILE Cases
    case DOCUMENT_ACTION_TYPES.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        isUploadFileLoading: true,
        isLoading: true,
        uploadFileError: null,
        uploadFileSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        isUploadFileLoading: false,
        isLoading: false,
        uploadFileError: null,
        uploadFileSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        isUploadFileLoading: false,
        isLoading: false,
        uploadFileError: action.payload,
        uploadFileSuccess: false,
        error: action.payload,
      };

    // PROCESS_URL Cases
    case DOCUMENT_ACTION_TYPES.PROCESS_URL_REQUEST:
      return {
        ...state,
        isProcessUrlLoading: true,
        isLoading: true,
        processUrlError: null,
        processUrlSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.PROCESS_URL_SUCCESS:
      return {
        ...state,
        isProcessUrlLoading: false,
        isLoading: false,
        processUrlError: null,
        processUrlSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.PROCESS_URL_FAILURE:
      return {
        ...state,
        isProcessUrlLoading: false,
        isLoading: false,
        processUrlError: action.payload,
        processUrlSuccess: false,
        error: action.payload,
      };

    // CLEANUP_TEMP Cases
    case DOCUMENT_ACTION_TYPES.CLEANUP_TEMP_REQUEST:
      return {
        ...state,
        isCleanupTempLoading: true,
        isLoading: true,
        cleanupTempError: null,
        cleanupTempSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.CLEANUP_TEMP_SUCCESS:
      return {
        ...state,
        isCleanupTempLoading: false,
        isLoading: false,
        cleanupTempError: null,
        cleanupTempSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.CLEANUP_TEMP_FAILURE:
      return {
        ...state,
        isCleanupTempLoading: false,
        isLoading: false,
        cleanupTempError: action.payload,
        cleanupTempSuccess: false,
        error: action.payload,
      };

    // EXTRACT_SAVE Cases
    case DOCUMENT_ACTION_TYPES.EXTRACT_SAVE_REQUEST:
      return {
        ...state,
        isExtractSaveLoading: true,
        isLoading: true,
        extractSaveError: null,
        extractSaveSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.EXTRACT_SAVE_SUCCESS:
      return {
        ...state,
        isExtractSaveLoading: false,
        isLoading: false,
        extractSaveError: null,
        extractSaveSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.EXTRACT_SAVE_FAILURE:
      return {
        ...state,
        isExtractSaveLoading: false,
        isLoading: false,
        extractSaveError: action.payload,
        extractSaveSuccess: false,
        error: action.payload,
      };

    // EXTRACT_METADATA Cases
    case DOCUMENT_ACTION_TYPES.EXTRACT_METADATA_REQUEST:
      return {
        ...state,
        isExtractMetadataLoading: true,
        isLoading: true,
        extractMetadataError: null,
        extractMetadataSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.EXTRACT_METADATA_SUCCESS:
      return {
        ...state,
        isExtractMetadataLoading: false,
        isLoading: false,
        extractMetadataError: null,
        extractMetadataSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.EXTRACT_METADATA_FAILURE:
      return {
        ...state,
        isExtractMetadataLoading: false,
        isLoading: false,
        extractMetadataError: action.payload,
        extractMetadataSuccess: false,
        error: action.payload,
      };

    // GET_METADATA_DOCID Cases
    case DOCUMENT_ACTION_TYPES.GET_METADATA_DOCID_REQUEST:
      return {
        ...state,
        isGetMetadataByDocIdLoading: true,
        isLoading: true,
        getMetadataByDocIdError: null,
        getMetadataByDocIdSuccess: false,
      };
    case DOCUMENT_ACTION_TYPES.GET_METADATA_DOCID_SUCCESS:
      return {
        ...state,
        isGetMetadataByDocIdLoading: false,
        isLoading: false,
        getMetadataByDocIdError: null,
        getMetadataByDocIdSuccess: true,
        error: null,
      };
    case DOCUMENT_ACTION_TYPES.GET_METADATA_DOCID_FAILURE:
      return {
        ...state,
        isGetMetadataByDocIdLoading: false,
        isLoading: false,
        getMetadataByDocIdError: action.payload,
        getMetadataByDocIdSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default documentReducer;
