# CVNL Dating Platform - Frontend

Frontend application for CVNL Dating Platform built with React and Vite.

## Công nghệ

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Real-time**: Socket.io Client
- **PWA**: Service Worker

## Cài đặt

```bash
npm install
npm run dev
```

## Build cho Production

```bash
npm run build
```

Build output sẽ nằm trong thư mục `dist/`

## Environment Variables

Tạo file `.env` hoặc `.env.production`:

```
VITE_API_URL=https://your-backend-api.com
VITE_SOCKET_URL=https://your-backend-api.com
```

## Cấu hình API URL

Cập nhật `vite.config.js` hoặc sử dụng environment variable `VITE_API_URL` để chỉ định backend API URL.

## Deploy

### Hostinger

1. Kết nối GitHub repository
2. Chọn framework: **Vite** hoặc **React**
3. Build Command: `npm run build`
4. Start Command: `npm run preview` (hoặc serve static files)

### Vercel / Netlify

Tự động detect Vite và deploy.

## License

ISC
