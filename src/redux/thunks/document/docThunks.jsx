import documentService from '../../services/document/documentService';
import { toast } from 'react-toastify';
import {
	trashRequest, trashSuccess, trashFailure,
	restoreRequest, restoreSuccess, restoreFailure,
	getFolderUserIdTypeRequest, getFolderUserIdTypeSuccess, getFolderUserIdTypeFailure,
	getFolderUserIdRequest, getFolderUserIdSuccess, getFolderUserIdFailure,
	getSavedUserIdRequest, getSavedUserIdSuccess, getSavedUserIdFailure,
	getAllUserIdRequest, getAllUserIdSuccess, getAllUserIdFailure,
	getTrashUserIdRequest, getTrashUserIdSuccess, getTrashUserIdFailure,
	deletePermanentRequest, deletePermanentSuccess, deletePermanentFailure,
	uploadFileRequest, uploadFileSuccess, uploadFileFailure,
	processUrlRequest, processUrlSuccess, processUrlFailure,
	cleanupTempRequest, cleanupTempSuccess, cleanupTempFailure
} from '../../actions/document/documentActions';

// Chuyển tài liệu vào thùng rác
export const trashDocumentThunk = (Doc) => async (dispatch) => {
	try {
		dispatch(trashRequest());
		const result = await documentService.trashDocument(Doc);
		dispatch(trashSuccess(result));
		toast.success(result.message || 'Chuyển tài liệu vào thùng rác thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(trashFailure(error));
		toast.error(error.message || 'Chuyển tài liệu vào thùng rác thất bại!');
		return { success: false, error: error.message || 'Chuyển tài liệu vào thùng rác thất bại!' };
	}
};

// Khôi phục tài liệu
export const restoreDocumentThunk = (Doc) => async (dispatch) => {
	try {
		dispatch(restoreRequest());
		const result = await documentService.restoreDocument(Doc);
		dispatch(restoreSuccess(result));
		toast.success(result.message || 'Khôi phục tài liệu thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(restoreFailure(error));
		toast.error(error.message || 'Khôi phục tài liệu thất bại!');
		return { success: false, error: error.message || 'Khôi phục tài liệu thất bại!' };
	}
};

// Lấy folder theo userId và folderType
export const getFolderByUserIdAndTypeThunk = (userId, folderType) => async (dispatch) => {
	try {
		dispatch(getFolderUserIdTypeRequest());
		const result = await documentService.getDocByUserIdAndType(userId, folderType);
		dispatch(getFolderUserIdTypeSuccess(result));
		toast.success(result.message || 'Lấy thư mục thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(getFolderUserIdTypeFailure(error));
		toast.error(error.message || 'Lấy thư mục thất bại!');
		return { success: false, error: error.message || 'Lấy thư mục thất bại!' };
	}
};

// Lấy tất cả folder theo userId
export const getFolderByUserIdThunk = (userId) => async (dispatch) => {
	try {
		dispatch(getFolderUserIdRequest());
		const result = await documentService.getDocByUserId(userId);
		dispatch(getFolderUserIdSuccess(result));
		toast.success(result.message || 'Lấy tất cả thư mục thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(getFolderUserIdFailure(error));
		toast.error(error.message || 'Lấy tất cả thư mục thất bại!');
		return { success: false, error: error.message || 'Lấy tất cả thư mục thất bại!' };
	}
};

// Lấy tài liệu đã lưu theo userId
export const getSavedByUserIdThunk = (userId) => async (dispatch) => {
	try {
		dispatch(getSavedUserIdRequest());
		const result = await documentService.getDocSavedByUserId(userId);
		dispatch(getSavedUserIdSuccess(result));
		toast.success(result.message || 'Lấy tài liệu đã lưu thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(getSavedUserIdFailure(error));
		toast.error(error.message || 'Lấy tài liệu đã lưu thất bại!');
		return { success: false, error: error.message || 'Lấy tài liệu đã lưu thất bại!' };
	}
};

// Lấy tất cả tài liệu theo userId
export const getAllByUserIdThunk = (userId) => async (dispatch) => {
	try {
		dispatch(getAllUserIdRequest());
		const result = await documentService.getDocAllByUserId(userId);
		dispatch(getAllUserIdSuccess(result));
		toast.success(result.message || 'Lấy tất cả tài liệu thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(getAllUserIdFailure(error));
		toast.error(error.message || 'Lấy tất cả tài liệu thất bại!');
		return { success: false, error: error.message || 'Lấy tất cả tài liệu thất bại!' };
	}
};

// Lấy tài liệu trong thùng rác theo userId
export const getTrashByUserIdThunk = (userId) => async (dispatch) => {
	try {
		dispatch(getTrashUserIdRequest());
		const result = await documentService.getDocTrashByUserId(userId);
		dispatch(getTrashUserIdSuccess(result));
		toast.success(result.message || 'Lấy tài liệu thùng rác thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(getTrashUserIdFailure(error));
		toast.error(error.message || 'Lấy tài liệu thùng rác thất bại!');
		return { success: false, error: error.message || 'Lấy tài liệu thùng rác thất bại!' };
	}
};

// Xóa tài liệu vĩnh viễn
export const deletePermanentThunk = () => async (dispatch) => {
	try {
		dispatch(deletePermanentRequest());
		const result = await documentService.deleteDocpermanent();
		dispatch(deletePermanentSuccess(result));
		toast.success(result.message || 'Xóa tài liệu vĩnh viễn thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(deletePermanentFailure(error));
		toast.error(error.message || 'Xóa tài liệu vĩnh viễn thất bại!');
		return { success: false, error: error.message || 'Xóa tài liệu vĩnh viễn thất bại!' };
	}
};

// Upload file
export const uploadFileThunk = (file) => async (dispatch) => {
	try {
		dispatch(uploadFileRequest());
		const result = await documentService.uploadFile(file);
		dispatch(uploadFileSuccess(result));
		toast.success(result.message || 'Upload file thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(uploadFileFailure(error));
		toast.error(error.message || 'Upload file thất bại!');
		return { success: false, error: error.message || 'Upload file thất bại!' };
	}
};

// Upload url
export const uploadUrlThunk = (url) => async (dispatch) => {
	try {
		dispatch(processUrlRequest());
		const result = await documentService.uploadUrl(url);
		dispatch(processUrlSuccess(result));
		toast.success(result.message || 'Xử lý url thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(processUrlFailure(error));
		toast.error(error.message || 'Xử lý url thất bại!');
		return { success: false, error: error.message || 'Xử lý url thất bại!' };
	}
};

// Cleanup temp
export const cleanupTempThunk = (temp) => async (dispatch) => {
	try {
		dispatch(cleanupTempRequest());
		const result = await documentService.cleanTemp(temp);
		dispatch(cleanupTempSuccess(result));
		toast.success(result.message || 'Dọn dẹp tạm thành công!');
		return { success: true, data: result };
	} catch (error) {
		dispatch(cleanupTempFailure(error));
		toast.error(error.message || 'Dọn dẹp tạm thất bại!');
		return { success: false, error: error.message || 'Dọn dẹp tạm thất bại!' };
	}
};

