import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error to an analytics service or other logging mechanism
    console.error('Error caught by error boundary:', error);
    console.error('Component stack:', info.componentStack);
    // You can also send the error to a logging service like Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI when an error occurs
      return this.props.fallback || <p>Something went wrong.</p>;
    }

    // Render the children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
