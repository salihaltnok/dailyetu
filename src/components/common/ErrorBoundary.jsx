import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // Hata loglama servisi burada kullanılabilir
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Üzgünüz, bir şeyler yanlış gitti.</h1>
          <p>Bu hatayı en kısa sürede düzelteceğiz.</p>
          <button
            onClick={() => window.location.reload()}
            className="reload-button"
          >
            Sayfayı Yenile
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="error-details">
              <summary>Hata Detayları</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;