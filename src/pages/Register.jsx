import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/auth.service';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Register form, 2: OTP verification
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    try {
      await authService.requestOTP(formData.email, formData.password);
      toast.success('Mã OTP đã được gửi đến email của bạn!');
      setStep(2); // Move to OTP verification step
    } catch (err) {
      const errorMessage = err.message || 'Gửi mã OTP thất bại. Vui lòng thử lại.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    if (!otpCode || otpCode.length !== 6) {
      setError('Vui lòng nhập mã OTP 6 số');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.verifyOTPAndRegister(
        formData.email,
        formData.password,
        otpCode
      );
      toast.success(result.message || 'Đăng ký thành công!');
      navigate('/');
      window.location.reload(); // Reload to update auth state
    } catch (err) {
      const errorMessage = err.message || 'Xác thực OTP thất bại. Vui lòng thử lại.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Register Form
  if (step === 1) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Tạo tài khoản
          </h2>
          <p className="text-center text-gray-600 mb-8">Bắt đầu hành trình tìm kiếm tình yêu của bạn</p>

          <form onSubmit={handleRequestOTP} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Tối thiểu 6 ký tự"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-1 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Tôi đồng ý với{' '}
                <Link to="#" className="text-pink-600 hover:text-pink-700">
                  Điều khoản dịch vụ
                </Link>{' '}
                và{' '}
                <Link to="#" className="text-pink-600 hover:text-pink-700">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Đang gửi mã OTP...' : 'Gửi mã xác thực'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-pink-600 font-semibold hover:text-pink-700">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: OTP Verification
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Xác thực OTP
        </h2>
        <p className="text-center text-gray-600 mb-2">
          Mã OTP đã được gửi đến email:
        </p>
        <p className="text-center text-pink-600 font-semibold mb-8">{formData.email}</p>

        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Mã OTP (6 số)
            </label>
            <input
              type="text"
              id="otp"
              value={otpCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtpCode(value);
                setError('');
              }}
              required
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
              placeholder="000000"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otpCode.length !== 6}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Đang xác thực...' : 'Xác thực và đăng ký'}
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={loading}
            className="w-full py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            ← Quay lại
          </button>
        </form>
      </div>
    </div>
  );
}
