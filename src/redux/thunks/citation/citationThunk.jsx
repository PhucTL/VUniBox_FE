import citationService from '../../services/citation/citationService';
import { toast } from 'react-toastify';
import {
  generateCitationRequest, generateCitationSuccess, generateCitationFailure,
  regenerateCitationRequest, regenerateCitationSuccess, regenerateCitationFailure,
  getCitationStyleRequest, getCitationStyleSuccess, getCitationStyleFailure
} from '../../actions/citation/citationActions';

// Tạo trích dẫn
export const generateCitationThunk = (data) => async (dispatch) => {
  try {
    dispatch(generateCitationRequest());
    const response = await citationService.generateCitaion(data);
    dispatch(generateCitationSuccess(response.data));
    toast.success('Tạo trích dẫn thành công!');
    return { success: true, data: response.data };
  } catch (error) {
    dispatch(generateCitationFailure(error));
    toast.error(error.message || 'Tạo trích dẫn thất bại!');
    return { success: false, error: error.message || 'Tạo trích dẫn thất bại!' };
  }
};

// Tái tạo trích dẫn
export const regenerateCitationThunk = (data) => async (dispatch) => {
  try {
    dispatch(regenerateCitationRequest());
    const response = await citationService.regenerateCitaion(data);
    dispatch(regenerateCitationSuccess(response.data));
    toast.success('Tái tạo trích dẫn thành công!');
    return { success: true, data: response.data };
  } catch (error) {
    dispatch(regenerateCitationFailure(error));
    toast.error(error.message || 'Tái tạo trích dẫn thất bại!');
    return { success: false, error: error.message || 'Tái tạo trích dẫn thất bại!' };
  }
};

// Lấy danh sách style trích dẫn
export const getCitationStyleThunk = () => async (dispatch) => {
  try {
    dispatch(getCitationStyleRequest());
    const result = await citationService.getCitationStyle();
    dispatch(getCitationStyleSuccess(result));
    toast.success('Lấy danh sách style trích dẫn thành công!');
    return { success: true, data: result };
  } catch (error) {
    dispatch(getCitationStyleFailure(error));
    toast.error(error.message || 'Lấy danh sách style trích dẫn thất bại!');
    return { success: false, error: error.message || 'Lấy danh sách style trích dẫn thất bại!' };
  }
};
