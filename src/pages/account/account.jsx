import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfileThunk, getUserStorageThunk, uploadAvatarThunk, updateProfileThunk } from "../../redux/thunks/user/userThunks";
import { getUserSubscriptionThunk } from "../../redux/thunks/plan/planThunks";
import StatsCard from "../../components/StatsCard";
import SubscriptionCard from "../../components/SubscriptionCard";
import { FaHdd, FaFileAlt, FaQuoteLeft, FaRobot } from "react-icons/fa";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: ""
  });
  
  // Get auth user info
  const authUser = useSelector((state) => state.auth?.user) || JSON.parse(localStorage.getItem("currentUser") || "null");
  const userId = authUser?.userId || authUser?.id || localStorage.getItem("userId");
  
  // Get user profile from Redux store
  const { 
    userProfile, 
    storageInfo, 
    isGetProfileLoading, 
    isGetStorageLoading,
    isUploadAvatarLoading,
    isUpdateProfileLoading
  } = useSelector(state => state.user);

  // Get subscription info from Redux store
  const { currentPlan: subscriptionData } = useSelector(state => state.plan);

  // Load user data when component mounts
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileThunk(userId));
      dispatch(getUserStorageThunk(userId));
      dispatch(getUserSubscriptionThunk(userId)); // Load subscription info
    }
  }, [dispatch, userId]);

  // Update form data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setEditFormData({
        fullName: userProfile.fullName || "",
        email: userProfile.email || ""
      });
    }
  }, [userProfile]);

  // Handle avatar upload
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      setSelectedFile(file);
      await dispatch(uploadAvatarThunk(userId, file));
      // Reload profile to get updated avatar
      dispatch(getUserProfileThunk(userId));
    }
  };

  // Open edit modal
  const handleEditClick = (field) => {
    setEditModalOpen(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    if (userId) {
      const result = await dispatch(updateProfileThunk(userId, editFormData));
      if (result.success) {
        setEditModalOpen(false);
        // Reload profile data
        dispatch(getUserProfileThunk(userId));
      }
    }
  };

  // Navigate to plans page
  const handleUpgradeClick = () => {
    navigate('/plans');
  };

  // Loading state
  if (isGetProfileLoading || isGetStorageLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 mt-20">
        <div className="flex items-center justify-center h-64">
          <div className="text-blue-600 text-xl">Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8 mt-20">
      {/* Profile Section */}
      <div className="flex items-start gap-8 mb-12">
        <div className="flex flex-col items-center">
          <img
            src={userProfile?.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=150&q=80"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <label htmlFor="avatar-upload" className="mt-4 text-blue-600 hover:underline cursor-pointer">
            {isUploadAvatarLoading ? "Đang tải..." : "Tải ảnh lên"}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
            disabled={isUploadAvatarLoading}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-blue-600">
                {userProfile?.fullName || "Chưa cập nhật tên"}
              </h1>
              <p className="text-gray-600 underline">
                {userProfile?.email || "Chưa có email"}
              </p>
            </div>
            <button className="px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50">
              Đổi Tài Khoản
            </button>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              Trạng thái: {userProfile?.planName || "Free"}
            </span>
            <button 
              className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleUpgradeClick}
            >
              Nâng cấp ngay
            </button>
          </div>
        </div>
      </div>

      {/* Usage Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Dung lượng lưu trữ"
          value={`${storageInfo?.usedMb || userProfile?.usageStats?.storageUsedMb || 0}MB / ${storageInfo?.limitMb || userProfile?.usageStats?.storageLimitMb || 400}MB`}
          subtitle={`${storageInfo?.remainingMb || (userProfile?.usageStats?.storageLimitMb || 400) - (userProfile?.usageStats?.storageUsedMb || 0)}MB còn lại`}
          progressValue={storageInfo?.usagePercentage || userProfile?.usageStats?.storageUsagePercentage || 0}
          progressColor="blue"
          icon={<FaHdd />}
        />
        
        <StatsCard
          title="Tài liệu đã lưu"
          value={storageInfo?.totalFiles || userProfile?.usageStats?.totalFiles || 0}
          subtitle="files"
          icon={<FaFileAlt />}
        />
        
        <StatsCard
          title="Citation đã sử dụng"
          value={`${userProfile?.usageStats?.citationUsed || 0}/${userProfile?.usageStats?.citationLimit || 9}`}
          subtitle="trích dẫn"
          progressValue={userProfile?.usageStats?.citationUsagePercentage || 0}
          progressColor="green"
          icon={<FaQuoteLeft />}
        />
        
        <StatsCard
          title="Chatbot đã sử dụng"
          value={`${userProfile?.usageStats?.chatbotUsed || 0}/${userProfile?.usageStats?.chatbotLimit || 5}`}
          subtitle="cuộc trò chuyện"
          progressValue={userProfile?.usageStats?.chatbotUsagePercentage || 0}
          progressColor="purple"
          icon={<FaRobot />}
        />
      </div>

      {/* Subscription Card */}
      {subscriptionData && (
        <div className="mb-8">
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-4 bg-gray-100 rounded-lg text-xs">
              <p><strong>Debug Subscription:</strong></p>
              <pre>{JSON.stringify(subscriptionData, null, 2)}</pre>
            </div>
          )}
          <SubscriptionCard subscriptionData={subscriptionData} />
        </div>
      )}

      {/* Account Details */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Tài Khoản</h2>
        <div className="text-gray-600 mb-4">Thông tin tài khoản</div>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Họ và tên</div>
              <div className="text-gray-600">
                {userProfile?.fullName || "Chưa cập nhật"}
              </div>
            </div>
            <button className="text-blue-600 hover:underline" onClick={() => handleEditClick('name')}>Change</button>
          </div>

          {/* Package */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Gói đang sử dụng</div>
              <div className="text-gray-600">
                {userProfile?.planName || "Free"}
              </div>
            </div>
            <button className="text-blue-600 hover:underline" onClick={handleUpgradeClick}>Upgrade</button>
          </div>

          {/* Usage Info */}
          <div className="flex justify-between items-center py-4 border-b">
            <div className="flex-1">
              <div className="font-medium">Thông tin sử dụng</div>
              <div className="text-gray-600 space-y-2">
                <div>
                  Storage capacity: {storageInfo?.formattedUsage || userProfile?.usageStats?.storageInfo || "Đang tải..."}
                  {/* Storage Progress Bar */}
                  {(storageInfo?.usagePercentage !== undefined || userProfile?.usageStats?.storageUsagePercentage !== undefined) && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: `${storageInfo?.usagePercentage || userProfile?.usageStats?.storageUsagePercentage || 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <div>Files have saved: {storageInfo?.totalFiles || userProfile?.usageStats?.totalFiles || 0}</div>
                <div>
                  Citations used: {userProfile?.usageStats?.citationUsed || 0} / {userProfile?.usageStats?.citationLimit || 0}
                  {userProfile?.usageStats?.citationUsagePercentage !== undefined && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${userProfile.usageStats.citationUsagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  Chatbot used: {userProfile?.usageStats?.chatbotUsed || 0} / {userProfile?.usageStats?.chatbotLimit || 0}
                  {userProfile?.usageStats?.chatbotUsagePercentage !== undefined && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${userProfile.usageStats.chatbotUsagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Email</div>
              <div className="text-gray-600">
                {userProfile?.email || "Chưa có email"}
              </div>
            </div>
            <button className="text-blue-600 hover:underline" onClick={() => handleEditClick('email')}>Change</button>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Mật khẩu</div>
              <div className="text-gray-600">*******</div>
            </div>
            <button className="text-blue-600 hover:underline">Change</button>
          </div>

          {/* Language */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Ngôn ngữ</div>
              <div className="text-gray-600">Tiếng Việt</div>
            </div>
            <button className="text-blue-600 hover:underline">Change</button>
          </div>

          {/* Account Created */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Ngày tạo tài khoản</div>
              <div className="text-gray-600">
                {userProfile?.createdAt 
                  ? new Date(userProfile.createdAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : "Không có thông tin"
                }
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="flex justify-between items-center py-4">
            <div>
              <div className="font-medium">Vai trò</div>
              <div className="text-gray-600">
                {userProfile?.role || "USER"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50">
          Feedback
        </button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
          Help Center
        </button>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[500px] border border-blue-100 relative">
            <button
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full border border-blue-200 flex items-center justify-center text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-colors duration-200"
              onClick={() => setEditModalOpen(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-600">Chỉnh sửa thông tin</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-900 font-semibold mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                
                <div>
                  <label className="block text-blue-900 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập email"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  className="flex-1 px-6 py-3 border-2 border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setEditModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                  onClick={handleSaveProfile}
                  disabled={isUpdateProfileLoading}
                >
                  {isUpdateProfileLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
