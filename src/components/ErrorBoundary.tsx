import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
            <div className="text-4xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">เกิดข้อผิดพลาดบางอย่าง</h1>
            <p className="text-slate-600 mb-6">ขออภัยครับ แอปพลิเคชันพบปัญหาบางอย่าง กรุณาลองรีเฟรชหน้าจอใหม่อีกครั้ง</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors"
            >
              รีเฟรชหน้าจอ
            </button>
            {import.meta.env.MODE !== 'production' && this.state.error && (
              <div className="mt-6 text-left p-4 bg-slate-100 rounded-lg overflow-auto max-h-40">
                <p className="text-xs font-mono text-red-600">{this.state.error.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
