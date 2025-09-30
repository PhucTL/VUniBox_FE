import planService from '../../services/plan/planService';
import { toast } from 'react-toastify';
import {
  getAllPlansRequest, getAllPlansSuccess, getAllPlansFailure,
  subscribePlanRequest, subscribePlanSuccess, subscribePlanFailure,
  cancelSubscriptionRequest, cancelSubscriptionSuccess, cancelSubscriptionFailure,
  getCurrentPlanRequest, getCurrentPlanSuccess, getCurrentPlanFailure
} from '../../actions/plan/planActions';

// Lấy tất cả các gói dịch vụ
export const getAllPlansThunk = () => async (dispatch) => {
  try {
    dispatch(getAllPlansRequest());
    const result = await planService.getAllPlans();
    dispatch(getAllPlansSuccess(result.plans));
    return { success: true, data: result.plans };
  } catch (error) {
    dispatch(getAllPlansFailure(error));
    toast.error(error.message || 'Lấy danh sách gói dịch vụ thất bại!');
    return { success: false, error: error.message || 'Lấy danh sách gói dịch vụ thất bại!' };
  }
};

// Đăng ký gói dịch vụ với PayOS - Redirect thay vì modal
export const subscribePlanThunk = (planId, userId, promoCode = null) => async (dispatch) => {
  try {
    dispatch(subscribePlanRequest());
    const result = await planService.subscribePlan(planId, userId, promoCode);
    dispatch(subscribePlanSuccess(result));
    
    console.log('Subscribe result:', result); // Debug log
    
    // Nếu có paymentUrl thì redirect đến PayOS
    if (result.paymentUrl && result.amount > 0) {
      toast.info('Đang chuyển hướng đến trang thanh toán...');
      // Store orderCode for later verification
      localStorage.setItem('pendingOrderCode', result.orderCode || result.payOsTransactionId);
      localStorage.setItem('pendingPlanId', planId);
      localStorage.setItem('pendingUserId', userId);
      
      // Redirect to PayOS payment page
      window.location.href = result.paymentUrl;
      
      return { 
        success: true, 
        requirePayment: true, 
        paymentUrl: result.paymentUrl,
        orderCode: result.orderCode || result.payOsTransactionId
      };
    } else {
      // Gói free hoặc đã thanh toán
      toast.success('Đăng ký gói dịch vụ thành công!');
      return { success: true, requirePayment: false, data: result };
    }
  } catch (error) {
    dispatch(subscribePlanFailure(error));
    toast.error(error.message || 'Đăng ký gói dịch vụ thất bại!');
    return { success: false, error: error.message || 'Đăng ký gói dịch vụ thất bại!' };
  }
};

// Kiểm tra trạng thái thanh toán PayOS
export const checkPaymentStatusThunk = (orderCode) => async (dispatch) => {
  try {
    const result = await planService.checkPaymentStatus(orderCode);
    
    console.log('Payment status result:', result); // Debug log
    
    if (result.success) {
      toast.success('Thanh toán thành công! Gói dịch vụ đã được kích hoạt.');
      return { success: true, isPaid: true, data: result };
    } else {
      return { success: false, isPaid: false, message: result.message };
    }
  } catch (error) {
    toast.error('Không thể kiểm tra trạng thái thanh toán');
    return { success: false, error: error.message };
  }
};

// Hủy đăng ký gói dịch vụ
export const cancelSubscriptionThunk = (userId) => async (dispatch) => {
  try {
    dispatch(cancelSubscriptionRequest());
    const result = await planService.cancelSubscription(userId);
    dispatch(cancelSubscriptionSuccess(result));
    toast.success('Hủy đăng ký thành công!');
    return { success: true, data: result };
  } catch (error) {
    dispatch(cancelSubscriptionFailure(error));
    toast.error(error.message || 'Hủy đăng ký thất bại!');
    return { success: false, error: error.message || 'Hủy đăng ký thất bại!' };
  }
};

// Lấy thông tin gói hiện tại
export const getCurrentPlanThunk = (userId) => async (dispatch) => {
  try {
    dispatch(getCurrentPlanRequest());
    const result = await planService.getCurrentPlan(userId);
    dispatch(getCurrentPlanSuccess(result));
    return { success: true, data: result };
  } catch (error) {
    dispatch(getCurrentPlanFailure(error));
    return { success: false, error: error.message || 'Lấy thông tin gói hiện tại thất bại!' };
  }
};