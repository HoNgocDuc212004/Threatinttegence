import { Card } from '../components/ui/card';
import { ThreatMap, ThreatLocation } from '../components/threat-map';
import { Badge } from '../components/ui/badge';

const threatLocations: ThreatLocation[] = [
  { id: '1', lat: 37.7749, lng: -122.4194, severity: 'critical', type: 'DDoS Attack', description: 'Large-scale DDoS targeting infrastructure', count: 45 },
  { id: '2', lat: 51.5074, lng: -0.1278, severity: 'high', type: 'Phishing Campaign', description: 'Coordinated phishing attacks detected', count: 32 },
  { id: '3', lat: 35.6762, lng: 139.6503, severity: 'medium', type: 'Malware Detection', description: 'New malware variant identified', count: 28 },
  { id: '4', lat: 40.7128, lng: -74.0060, severity: 'critical', type: 'Data Breach', description: 'Unauthorized access attempts', count: 51 },
  { id: '5', lat: -33.8688, lng: 151.2093, severity: 'high', type: 'Ransomware', description: 'Ransomware activity detected', count: 38 },
  { id: '6', lat: 1.3521, lng: 103.8198, severity: 'medium', type: 'Botnet Activity', description: 'Suspicious botnet communications', count: 25 },
  { id: '7', lat: 55.7558, lng: 37.6173, severity: 'low', type: 'Port Scanning', description: 'Automated port scanning detected', count: 15 },
  { id: '8', lat: 52.5200, lng: 13.4050, severity: 'high', type: 'SQL Injection', description: 'Multiple SQL injection attempts', count: 42 },
  { id: '9', lat: -23.5505, lng: -46.6333, severity: 'medium', type: 'Crypto Mining', description: 'Unauthorized crypto mining detected', count: 22 },
  { id: '10', lat: 19.4326, lng: -99.1332, severity: 'high', type: 'Zero-Day Exploit', description: 'Potential zero-day vulnerability', count: 35 },
];

const locationStats = [
  { region: 'Bắc Mỹ', threats: 148, critical: 28, high: 45, medium: 52, low: 23 },
  { region: 'Châu Âu', threats: 132, critical: 22, high: 38, medium: 48, low: 24 },
  { region: 'Châu Á', threats: 195, critical: 35, high: 52, medium: 68, low: 40 },
  { region: 'Nam Mỹ', threats: 87, critical: 15, high: 25, medium: 32, low: 15 },
  { region: 'Châu Phi', threats: 45, critical: 8, high: 12, medium: 18, low: 7 },
  { region: 'Châu Đại Dương', threats: 68, critical: 12, high: 20, medium: 25, low: 11 },
];

export function ThreatMapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bản đồ mối đe dọa toàn cầu</h2>
        <p className="text-gray-600 mt-1">Giám sát mối đe dọa theo vị trí địa lý</p>
      </div>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-700">Mức độ nghiêm trọng:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span className="text-sm">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
            <span className="text-sm">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            <span className="text-sm">Low</span>
          </div>
        </div>
      </Card>

      {/* Map */}
      <Card className="p-6">
        <div className="h-[600px]">
          <ThreatMap threats={threatLocations} />
        </div>
      </Card>

      {/* Regional Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Thống kê theo khu vực</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Khu vực</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Tổng</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Critical</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">High</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Medium</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Low</th>
              </tr>
            </thead>
            <tbody>
              {locationStats.map((stat, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{stat.region}</td>
                  <td className="py-3 px-4">{stat.threats}</td>
                  <td className="py-3 px-4">
                    <Badge variant="destructive">{stat.critical}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">{stat.high}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">{stat.medium}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">{stat.low}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
