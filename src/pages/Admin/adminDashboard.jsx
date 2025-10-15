import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardDataThunk } from '../../redux/thunks/admin';
import StatsCard from './StatsCard';
import ChartCard from './ChartCard';
import RecentActivitiesCard from './RecentActivitiesCard';
import './adminDashboard.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.adminDashboard);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  useEffect(() => {
    dispatch(getDashboardDataThunk());
    
    // Override parent container styles for full width
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.style.alignItems = 'stretch';
      mainElement.style.justifyContent = 'stretch';
      mainElement.style.width = '100%';
    }

    // Cleanup on unmount
    return () => {
      if (mainElement) {
        mainElement.style.alignItems = 'center';
        mainElement.style.justifyContent = 'center';
        mainElement.style.width = 'auto';
      }
    };
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getDashboardDataThunk());
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu thống kê...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-error">
        <div className="error-content">
          <h3>Lỗi tải dữ liệu</h3>
          <p>{error}</p>
          <button onClick={handleRefresh} className="retry-btn">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="admin-dashboard-empty">
        <p>Không có dữ liệu để hiển thị</p>
        <button onClick={handleRefresh} className="retry-btn">
          Tải lại
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title-section">
            <div className="header-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="header-text">
              <h1>Bảng Điều Khiển Quản Trị</h1>
              <p>Tổng quan thống kê và phân tích hệ thống VUniBox</p>
              <div className="header-breadcrumb">
                <span><i className="fas fa-home"></i> Trang chủ</span>
                <span><i className="fas fa-chevron-right"></i></span>
                <span className="active">Dashboard</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <select 
            value={selectedTimeRange} 
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
            <option value="1year">1 năm qua</option>
          </select>
          <button onClick={handleRefresh} className="refresh-btn">
            <i className="fas fa-sync-alt"></i>
            Làm mới
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="overview-section">
        <div className="section-header">
          <div className="section-title">
            <h2><i className="fas fa-chart-bar"></i> Thống Kê Tổng Quan</h2>
            <p>Các chỉ số quan trọng của hệ thống trong thời gian thực</p>
          </div>
          <div className="section-actions">
            <span className="last-updated">
              <i className="fas fa-clock"></i>
              Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}
            </span>
          </div>
        </div>
        <div className="stats-grid">
          <div style={{ animationDelay: '0.1s' }}>
            <StatsCard
              title="Tổng người dùng"
              value={data.overview?.totalUsers || 0}
              icon="fas fa-user-graduate"
              color="blue"
              trend={{
                value: 0,
                isPositive: true
              }}
            />
          </div>
          <div style={{ animationDelay: '0.2s' }}>
            <StatsCard
              title="Tài liệu"
              value={data.overview?.totalDocuments || 0}
              icon="fas fa-book-open"
              color="green"
              trend={{
                value: 0,
                isPositive: true
              }}
            />
          </div>
          <div style={{ animationDelay: '0.3s' }}>
            <StatsCard
              title="Tổng doanh thu"
              value={`${(data.overview?.totalRevenue || 0).toLocaleString('vi-VN')} VND`}
              icon="fas fa-coins"
              color="orange"
              trend={{
                value: 0,
                isPositive: true
              }}
            />
          </div>
          <div style={{ animationDelay: '0.4s' }}>
            <StatsCard
              title="Subscription hoạt động"
              value={data.overview?.totalActiveSubscriptions || 0}
              icon="fas fa-gem"
              color="purple"
              trend={{
                value: 0,
                isPositive: true
              }}
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="section-header">
          <div className="section-title">
            <h2><i className="fas fa-chart-pie"></i> Biểu Đồ Thống Kê & Phân Tích</h2>
            <p>Trực quan hóa dữ liệu và xu hướng phát triển của hệ thống</p>
          </div>
          <div className="section-actions">
            <div className="chart-view-options">
              <button className="chart-view-btn active">
                <i className="fas fa-th"></i> Grid
              </button>
              <button className="chart-view-btn">
                <i className="fas fa-list"></i> List
              </button>
            </div>
          </div>
        </div>
        <div className="charts-main-grid">
          <div className="chart-large">
            <ChartCard
              title="Đăng ký người dùng"
              type="line"
              data={data.userRegistrationStats}
              color="#3b82f6"
            />
          </div>
          <div className="chart-large">
            <ChartCard
              title="Tải lên tài liệu"
              type="bar"
              data={data.documentUploadStats}
              color="#10b981"
            />
          </div>
          <div className="chart-medium">
            <ChartCard
              title="Sử dụng gói dịch vụ"
              type="doughnut"
              data={data.planUsageStats?.map(plan => ({
                planName: `${plan.planName} (${plan.planPrice.toLocaleString('vi-VN')} VND)`,
                count: plan.activeSubscriptions
              })) || []}
              color="#f59e0b"
            />
          </div>
          <div className="chart-large">
            <ChartCard
              title="Doanh thu theo tháng"
              type="line"
              data={data.revenueStats}
              color="#8b5cf6"
            />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-section" style={{ animationDelay: '0.6s' }}>
        <div className="section-header">
          <div className="section-title">
            <h2><i className="fas fa-history"></i> Hoạt Động Gần Đây</h2>
            <p>Theo dõi các hoạt động và sự kiện mới nhất trong hệ thống</p>
          </div>
          <div className="section-actions">
            <div className="activity-filters">
              <button className="filter-btn active" data-filter="all">
                <i className="fas fa-list"></i> Tất cả
              </button>
              <button className="filter-btn" data-filter="users">
                <i className="fas fa-users"></i> Người dùng
              </button>
              <button className="filter-btn" data-filter="documents">
                <i className="fas fa-file"></i> Tài liệu
              </button>
              <button className="filter-btn" data-filter="payments">
                <i className="fas fa-credit-card"></i> Thanh toán
              </button>
            </div>
            <button className="view-all-btn">
              <span>Xem tất cả</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <RecentActivitiesCard activities={data.recentActivities || []} />
      </div>
    </div>
  );
};

export default AdminDashboard;