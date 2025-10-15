import React from 'react';
import './RecentActivitiesCard.css';

const RecentActivitiesCard = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'User Registration': 'fas fa-user-plus',
      'Document Upload': 'fas fa-file-upload', 
      'Payment': 'fas fa-credit-card',
      'subscription': 'fas fa-crown',
      'login': 'fas fa-sign-in-alt',
      'document_view': 'fas fa-eye',
      'citation_generated': 'fas fa-quote-right',
      'plan_upgrade': 'fas fa-arrow-up',
      'plan_downgrade': 'fas fa-arrow-down',
      'default': 'fas fa-info-circle'
    };
    return iconMap[type] || iconMap['default'];
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'User Registration': 'blue',
      'Document Upload': 'green',
      'Payment': 'orange',
      'subscription': 'purple',
      'login': 'gray',
      'document_view': 'teal',
      'citation_generated': 'indigo',
      'plan_upgrade': 'emerald',
      'plan_downgrade': 'red',
      'default': 'gray'
    };
    return colorMap[type] || colorMap['default'];
  };

  const formatActivityTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const translateActivityType = (type) => {
    const translations = {
      'user_registration': 'Đăng ký tài khoản',
      'document_upload': 'Tải lên tài liệu',
      'payment': 'Thanh toán',
      'subscription': 'Đăng ký gói',
      'login': 'Đăng nhập',
      'document_view': 'Xem tài liệu',
      'citation_generated': 'Tạo trích dẫn',
      'plan_upgrade': 'Nâng cấp gói',
      'plan_downgrade': 'Hạ cấp gói'
    };
    return translations[type] || type;
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="recent-activities-card">
        <div className="activities-header">
          <h3>Hoạt động gần đây</h3>
        </div>
        <div className="activities-body">
          <div className="no-activities">
            <i className="fas fa-clock"></i>
            <p>Chưa có hoạt động nào</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-activities-card">
      <div className="activities-header">
        <h3>Hoạt động gần đây</h3>
        <button className="view-all-btn">
          Xem tất cả
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      
      <div className="activities-body">
        <div className="activities-list">
          {activities.slice(0, 10).map((activity, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-icon activity-icon-${getActivityColor(activity.activityType)}`}>
                <i className={getActivityIcon(activity.activityType)}></i>
              </div>
              
              <div className="activity-content">
                <div className="activity-main">
                  <span className="activity-user">{activity.userEmail || 'Người dùng'}</span>
                  <span className="activity-action">{activity.description}</span>
                  {activity.details && (
                    <span className="activity-details">- {activity.details}</span>
                  )}
                </div>
                <div className="activity-meta">
                  <span className="activity-time">
                    {formatActivityTime(activity.timestamp)}
                  </span>
                  <span className="activity-id">ID: {activity.userId}</span>
                </div>
              </div>
              
              <div className="activity-status">
                {activity.status && (
                  <span className={`status-badge status-${activity.status.toLowerCase()}`}>
                    {activity.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {activities.length > 10 && (
          <div className="activities-footer">
            <button className="load-more-btn">
              Tải thêm {activities.length - 10} hoạt động
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivitiesCard;