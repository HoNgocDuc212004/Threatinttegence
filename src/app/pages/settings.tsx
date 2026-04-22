import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Settings as SettingsIcon, Database, Bell, Shield, Save } from 'lucide-react';
import { api } from '../services/api';

export function SettingsPage() {
  const [apiUrl, setApiUrl] = useState('http://localhost:8000');
  const [healthStatus, setHealthStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  const [saving, setSaving] = useState(false);

  const checkHealth = async () => {
    setHealthStatus('checking');
    try {
      await api.system.health();
      setHealthStatus('healthy');
    } catch (error) {
      setHealthStatus('error');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      checkHealth();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h2>
        <p className="text-gray-600 mt-1">Cấu hình kết nối API và các thiết lập</p>
      </div>

      {/* API Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Cấu hình API Backend</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Base URL
            </label>
            <Input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://localhost:8000"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL của backend Threat Feeds API
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={checkHealth} variant="outline">
              Kiểm tra kết nối
            </Button>
            <Badge variant={
              healthStatus === 'healthy' ? 'default' :
              healthStatus === 'error' ? 'destructive' :
              'secondary'
            }>
              {healthStatus === 'healthy' ? '✓ Kết nối thành công' :
               healthStatus === 'error' ? '✗ Không thể kết nối' :
               '○ Đang kiểm tra...'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Debug Tools */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <SettingsIcon className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Công cụ Debug</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Tạo dữ liệu mẫu</p>
              <p className="text-sm text-gray-600">Nhập dữ liệu mẫu vào hệ thống</p>
            </div>
            <Button
              onClick={async () => {
                try {
                  await api.debug.ingestMock();
                  alert('Đã tạo dữ liệu mẫu thành công!');
                } catch (error) {
                  alert('Lỗi: Không thể tạo dữ liệu mẫu');
                }
              }}
              variant="outline"
            >
              Thực hiện
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
            <div>
              <p className="font-medium text-red-900">Reset Database</p>
              <p className="text-sm text-red-700">Xóa tất cả dữ liệu (không thể hoàn tác)</p>
            </div>
            <Button
              onClick={async () => {
                if (window.confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu?')) {
                  try {
                    await api.debug.resetDatabase();
                    alert('Đã reset database thành công!');
                  } catch (error) {
                    alert('Lỗi: Không thể reset database');
                  }
                }
              }}
              variant="destructive"
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold">Cài đặt thông báo</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Thông báo Critical</p>
              <p className="text-sm text-gray-600">Nhận thông báo cho mối đe dọa nghiêm trọng</p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Thông báo High</p>
              <p className="text-sm text-gray-600">Nhận thông báo cho mối đe dọa cao</p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email hàng ngày</p>
              <p className="text-sm text-gray-600">Nhận báo cáo tổng hợp hàng ngày</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Cài đặt bảo mật</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian timeout (phút)
            </label>
            <Input type="number" defaultValue="30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key (nếu cần)
            </label>
            <Input type="password" placeholder="Nhập API key..." />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>
    </div>
  );
}
