import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './ChartCard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartCard = ({ title, type, data, color }) => {
  const generateChartData = () => {
    if (!data || !Array.isArray(data)) {
      return null;
    }

    const colors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
      '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
    ];

    // Special colors for plan usage (FREE, BASIC, PRO)
    const planColors = [
      '#22c55e', // Green for FREE
      '#3b82f6', // Blue for BASIC  
      '#8b5cf6'  // Purple for PRO
    ];

    switch (type) {
      case 'line':
        return {
          labels: data.map(item => {
            if (item.date) return new Date(item.date).toLocaleDateString('vi-VN');
            if (item.month) return item.month;
            return item.label || 'N/A';
          }),
          datasets: [
            {
              label: title,
              data: data.map(item => item.count || item.value || item.amount || 0),
              borderColor: color,
              backgroundColor: color + '20',
              tension: 0.4,
              fill: true,
            },
          ],
        };

      case 'bar':
        return {
          labels: data.map(item => {
            if (item.date) return new Date(item.date).toLocaleDateString('vi-VN');
            if (item.month) return item.month;
            return item.label || 'N/A';
          }),
          datasets: [
            {
              label: title,
              data: data.map(item => item.count || item.value || item.amount || 0),
              backgroundColor: color + '80',
              borderColor: color,
              borderWidth: 1,
            },
          ],
        };

      case 'doughnut':
        // Use special colors for plan usage chart
        const usePlanColors = title.includes('gói dịch vụ') || title.includes('plan');
        const chartColors = usePlanColors ? planColors : colors;
        
        return {
          labels: data.map(item => item.planName || item.name || item.label || 'N/A'),
          datasets: [
            {
              data: data.map(item => item.count || item.value || 0),
              backgroundColor: chartColors.slice(0, data.length),
              borderColor: '#ffffff',
              borderWidth: 3,
              hoverBackgroundColor: chartColors.map(color => color + 'CC'),
              hoverBorderWidth: 4,
            },
          ],
        };

      default:
        return null;
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: type === 'doughnut' ? 'bottom' : 'top',
        labels: {
          padding: type === 'doughnut' ? 15 : 20,
          usePointStyle: true,
          font: {
            size: type === 'doughnut' ? 11 : 12
          }
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: color,
        borderWidth: 1,
        callbacks: type === 'doughnut' ? {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString('vi-VN')} (${percentage}%)`;
          }
        } : undefined
      },
    },
    scales: type !== 'doughnut' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
        },
      },
    } : undefined,
  };

  const chartData = generateChartData();

  const renderChart = () => {
    if (!chartData) {
      return (
        <div className="chart-no-data">
          <i className="fas fa-chart-line"></i>
          <p>Không có dữ liệu để hiển thị</p>
        </div>
      );
    }

    switch (type) {
      case 'line':
        return (
          <div className="chart-with-icon">
            <Line data={chartData} options={chartOptions} />
            <div className="chart-watermark">
              {title.includes('Đăng ký') && <i className="fas fa-user-plus"></i>}
              {title.includes('Doanh thu') && <i className="fas fa-chart-line"></i>}
            </div>
          </div>
        );
      case 'bar':
        return (
          <div className="chart-with-icon">
            <Bar data={chartData} options={chartOptions} />
            <div className="chart-watermark">
              {title.includes('Tải lên') && <i className="fas fa-cloud-upload-alt"></i>}
            </div>
          </div>
        );
      case 'doughnut':
        return (
          <div className="doughnut-chart-container">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="doughnut-center-icon">
              {title.includes('gói dịch vụ') && (
                <div className="center-icon-wrapper">
                  <i className="fas fa-crown"></i>
                  <span className="center-text">Gói dịch vụ</span>
                  <div className="center-total">
                    {chartData.datasets[0].data.reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="center-label">Tổng Users</div>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div>Loại biểu đồ không được hỗ trợ</div>;
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3>{title}</h3>
        <div className="chart-card-actions">
          <button className="chart-action-btn">
            <i className="fas fa-expand"></i>
          </button>
          <button className="chart-action-btn">
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>
      <div className="chart-card-body">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartCard;