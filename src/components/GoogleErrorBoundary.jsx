import React from 'react';

class GoogleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a Google-related error
    if (error.message && error.message.includes('GSI')) {
      console.log('Google Identity Services error caught:', error);
      return { hasError: true };
    }
    return null;
  }

  componentDidCatch(error, errorInfo) {
    // Log Google errors but don't crash the app
    if (error.message && (error.message.includes('GSI') || error.message.includes('google'))) {
      console.log('Google error boundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Just render children normally, ignore Google errors
      this.setState({ hasError: false });
    }

    return this.props.children;
  }
}

export default GoogleErrorBoundary;