import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
    // Clear potentially corrupted auth data that causes repeated crashes
    try {
      localStorage.removeItem('sb-hlwdnwssvctffotklqjl-auth-token');
    } catch (e) { /* ignore */ }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  handleClearStorage = () => {
    try {
      localStorage.clear();
    } catch (e) { /* ignore */ }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', padding: '2rem', fontFamily: 'Vazirmatn, system-ui, sans-serif',
          background: '#0f0f1a', color: '#e0e0e0', direction: 'rtl', textAlign: 'center',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
            خطا در بارگذاری صفحه
          </h1>
          <p style={{ color: '#999', marginBottom: '2rem', maxWidth: '400px' }}>
            مشکلی پیش آمده. لطفاً یکی از دکمه‌های زیر را امتحان کنید.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '0.75rem 2rem', borderRadius: '0.75rem', border: 'none',
                background: '#2563eb', color: 'white', cursor: 'pointer',
                fontSize: '1rem', fontWeight: 600,
              }}
            >
              بازگشت به خانه
            </button>
            <button
              onClick={this.handleClearStorage}
              style={{
                padding: '0.75rem 2rem', borderRadius: '0.75rem',
                border: '1px solid #444', background: 'transparent',
                color: '#ccc', cursor: 'pointer', fontSize: '1rem',
              }}
            >
              پاکسازی حافظه و بازگشت
            </button>
          </div>
          {this.state.error && (
            <details style={{ marginTop: '2rem', color: '#666', fontSize: '0.8rem', maxWidth: '500px' }}>
              <summary style={{ cursor: 'pointer' }}>جزئیات فنی</summary>
              <pre style={{ textAlign: 'left', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}