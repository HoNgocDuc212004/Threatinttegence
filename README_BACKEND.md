# Backend Integration

Ứng dụng đã được tích hợp với FastAPI backend.

## Chạy Backend

1. **Cài đặt dependencies:**
```bash
pip install -r requirements.txt
```

2. **Chạy backend:**
```bash
python threatfeeds_backend.py
```

Backend sẽ chạy tại: `http://localhost:8000`

## API Documentation

Sau khi chạy backend, truy cập:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Cấu hình Frontend

Frontend tự động kết nối với backend tại `http://localhost:8000`.

Để thay đổi URL backend, chỉnh sửa file `.env`:

```env
VITE_API_URL=http://your-backend-url:8000
```

## API Endpoints Chính

### Dashboard
- `GET /api/v1/dashboard` - Dữ liệu dashboard đầy đủ

### Feeds
- `GET /api/v1/feeds` - Danh sách feeds
- `POST /api/v1/feeds` - Tạo feed mới
- `PATCH /api/v1/feeds/{id}` - Cập nhật feed
- `DELETE /api/v1/feeds/{id}` - Xóa feed

### Alerts
- `GET /api/v1/alerts` - Danh sách alerts
- `POST /api/v1/alerts` - Tạo alert mới
- `PATCH /api/v1/alerts/{id}` - Cập nhật alert
- `DELETE /api/v1/alerts/{id}` - Xóa alert

### Stats
- `GET /api/v1/stats/severity` - Thống kê theo mức độ
- `GET /api/v1/stats/indicator-types` - Thống kê theo loại indicator

### Collector
- `GET /api/v1/collector/status` - Trạng thái collector
- `POST /api/v1/collector/trigger` - Trigger collector thủ công

## Fallback Mode

Nếu backend không chạy, frontend tự động fallback sang mock data để bạn vẫn xem được giao diện.

## Database

Backend sử dụng SQLite mặc định (`threatfeeds.db`).

Để dùng PostgreSQL production, set biến môi trường:
```bash
DATABASE_URL=postgresql://user:pass@localhost/dbname
```
