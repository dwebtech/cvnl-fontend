import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              CVNL Dating
            </Link>
            
            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
              >
                Trang chủ
              </Link>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === '/login' 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-md"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">© 2024 CVNL Dating Platform. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
