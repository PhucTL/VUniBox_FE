import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfileThunk, getUserStorageThunk, uploadAvatarThunk, updateProfileThunk, deleteAvatarThunk } from "../../redux/thunks/user/userThunks";
import { getUserSubscriptionThunk } from "../../redux/thunks/plan/planThunks";
import StatsCard from "../../components/StatsCard";
import { FaHdd, FaFileAlt, FaQuoteLeft, FaRobot } from "react-icons/fa";
import toast from 'react-hot-toast';

// Helper function to get avatar URL  
const getAvatarUrl = (avatarUrl) => {
  if (!avatarUrl) return "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=150&q=80";

  // Lấy domain từ biến môi trường
  const apiDomain = import.meta.env.VITE_BE_API_URL || "";
  
  // Luôn thử load avatar từ backend trước, browser sẽ tự xử lý lỗi nếu có
  return `${apiDomain}${avatarUrl}`;
};

// Avatar Image Component with smart fallback
const AvatarImage = ({ selectedFile, userProfile, className }) => {
  const [imageError, setImageError] = useState(false);
  const [showCustomAvatar, setShowCustomAvatar] = useState(false);
  
  const defaultAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&h=150&q=80";
  
  useEffect(() => {
    // Reset error state when userProfile changes
    setImageError(false);
    setShowCustomAvatar(false);
  }, [userProfile?.avatarUrl]);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const tryShowCustomAvatar = () => {
    if (!imageError && userProfile?.avatarUrl) {
      setShowCustomAvatar(true);
    }
  };
  
  // Get image source
  const getImageSrc = () => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    
    if (showCustomAvatar && userProfile?.avatarUrl && !imageError) {
      // Sử dụng biến môi trường cho tất cả môi trường
      const apiDomain = import.meta.env.VITE_BE_API_URL || "";
      return `${apiDomain}${userProfile.avatarUrl}`;
    }
    
    return defaultAvatar;
  };
  
  return (
    <div className="relative">
      <img
        src={getImageSrc()}
        alt="Profile"
        className={className}
        onError={handleImageError}
        onLoad={() => {
          if (!selectedFile && userProfile?.avatarUrl && !showCustomAvatar) {
            tryShowCustomAvatar();
          }
        }}
      />
      
    </div>
  );
};

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
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
      console.log("User profile updated:", userProfile);
      console.log("Avatar URL:", userProfile.avatarUrl);
      setEditFormData({
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
        phoneNumber: userProfile.phoneNumber || ""
      });
    }
  }, [userProfile]);

  // Handle avatar upload
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      // Show preview immediately
      setSelectedFile(file);

      try {
        console.log("Uploading avatar for userId:", userId);
        const result = await dispatch(uploadAvatarThunk(userId, file));
        console.log("Upload result:", result);
        
        if (result.success || result.payload?.success || result.type?.includes('fulfilled')) {
          // Successfully uploaded, reload profile to get new avatarUrl
          await dispatch(getUserProfileThunk(userId));
          toast.success("Thay đổi avatar thành công ");
          setTimeout(() => {
          setSelectedFile(null);
          }, 1000); // Give time for new avatar to load
        } else {
          toast.error("Thay đổi avatar thất bại. Phải dùng ảnh .jpg");
          setSelectedFile(null);
        }
      } catch (error) {
        toast.error("Thay đổi avatar thất bại. Phải dùng ảnh .jpg");
        setSelectedFile(null);
      }
    }
  };

  // Handle avatar delete
  const handleAvatarDelete = async () => {
    if (userId && userProfile?.avatarUrl) {
      const confirmed = window.confirm("Bạn có chắc muốn xóa ảnh đại diện?");
      if (confirmed) {
        try {
          const result = await dispatch(deleteAvatarThunk(userId));
          if (result.success) {
            // Successfully deleted, reload profile
            await dispatch(getUserProfileThunk(userId));
            console.log("Avatar deleted successfully");
          } else {
            console.error("Delete failed:", result.message);
            alert("Xóa ảnh thất bại. Vui lòng thử lại.");
          }
        } catch (error) {
          console.error("Delete error:", error);
          alert("Có lỗi xảy ra khi xóa ảnh");
        }
      }
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
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 mt-16 md:mt-20">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-8 md:mb-12">
        <div className="flex flex-col items-center">
          <div className="relative">
            <AvatarImage 
              selectedFile={selectedFile}
              userProfile={userProfile}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <label htmlFor="avatar-upload" className="text-blue-600 hover:underline cursor-pointer font-medium">
              {isUploadAvatarLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Đang xử lý...
                </span>
              ) : (
                "Thay đổi ảnh"
              )}
            </label>

          </div>
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
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-sm font-medium">
              {userProfile?.planName || "Free"} Plan
            </span>
            {userProfile?.accountStatus && (
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${userProfile.isVerified
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                }`}>
                {userProfile.accountStatus}
              </span>
            )}
            {userProfile?.daysUntilExpiry !== undefined && userProfile?.daysUntilExpiry <= 7 && (
              <span className="px-4 py-2 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-sm font-medium">
                {userProfile.daysUntilExpiry} ngày còn lại
              </span>
            )}
            <button
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium transition-colors"
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
              <div className="space-y-1">
                <div className="text-gray-600">
                  {userProfile?.planName || "Free"}
                </div>
                {userProfile?.planExpiryDate && (
                  <div className="text-sm">
                    <span className="text-gray-500">Hết hạn: </span>
                    <span className={`${userProfile?.isPlanExpired
                        ? 'text-red-600 font-medium'
                        : userProfile?.daysUntilExpiry <= 7
                          ? 'text-orange-600 font-medium'
                          : 'text-gray-600'
                      }`}>
                      {new Date(userProfile.planExpiryDate).toLocaleDateString('vi-VN')}
                      {userProfile?.daysUntilExpiry !== undefined && !userProfile?.isPlanExpired && (
                        <span className="ml-1">({userProfile.daysUntilExpiry} ngày còn lại)</span>
                      )}
                      {userProfile?.isPlanExpired && (
                        <span className="ml-1 text-red-600 font-medium">(Đã hết hạn)</span>
                      )}
                    </span>
                  </div>
                )}
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
              <div className="text-gray-600 flex items-center gap-2">
                {userProfile?.email || "Chưa có email"}
                {userProfile?.isVerified && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 text-green-600 border border-green-200">
                    ✓ Đã xác thực
                  </span>
                )}
              </div>
            </div>

          </div>


          {/* Phone Number */}
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <div className="font-medium">Số điện thoại</div>
              <div className="text-gray-600">
                {userProfile?.phoneNumber || "Chưa cập nhật"}
              </div>
            </div>
            <button className="text-blue-600 hover:underline" onClick={() => handleEditClick('phone')}>Change</button>
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

          {/* Activity Summary */}
          {userProfile?.activitySummary && (
            <div className="flex justify-between items-start py-4 border-b">
              <div className="flex-1">
                <div className="font-medium">Hoạt động tháng này</div>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    <span className="text-gray-500">Tài liệu: </span>
                    <span className="font-medium text-blue-600">{userProfile.activitySummary.documentsThisMonth}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Trích dẫn: </span>
                    <span className="font-medium text-green-600">{userProfile.activitySummary.citationsThisMonth}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Chat AI: </span>
                    <span className="font-medium text-purple-600">{userProfile.activitySummary.chatbotThisMonth}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Ngày hoạt động: </span>
                    <span className="font-medium text-gray-700">{userProfile.activitySummary.totalActiveDays}</span>
                  </div>
                </div>
                {userProfile.activitySummary.lastDocumentUpload && (
                  <div className="text-xs text-gray-500 mt-2">
                    Tải lên gần nhất: {new Date(userProfile.activitySummary.lastDocumentUpload).toLocaleDateString('vi-VN')}
                  </div>
                )}
              </div>
            </div>
          )}

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
          <Link to="https://docs.google.com/forms/d/e/1FAIpQLScN1zi3edgSS2rg5nSFGql-_TdCKa4dBk4jEBwPGqChCDf-7g/viewform?usp=sharing&ouid=112926310380479204670">
          Feedback
          </Link>
        </button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
          <Link to="/help">
          Help Center
          </Link>
          
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
                    readOnly
                    className="w-full px-4 py-3 border border-blue-300 rounded-xl bg-gray-100 cursor-not-allowed"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label className="block text-blue-900 font-semibold mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editFormData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Nhập số điện thoại"
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
