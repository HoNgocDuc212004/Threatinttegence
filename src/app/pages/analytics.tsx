import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const threatTrendData = [
  { name: 'Mon', malware: 45, phishing: 32, ddos: 28, breach: 15 },
  { name: 'Tue', malware: 52, phishing: 38, ddos: 25, breach: 22 },
  { name: 'Wed', malware: 48, phishing: 42, ddos: 30, breach: 18 },
  { name: 'Thu', malware: 61, phishing: 35, ddos: 35, breach: 28 },
  { name: 'Fri', malware: 55, phishing: 48, ddos: 32, breach: 25 },
  { name: 'Sat', malware: 38, phishing: 28, ddos: 22, breach: 12 },
  { name: 'Sun', malware: 42, phishing: 30, ddos: 25, breach: 15 },
];

const hourlyActivityData = [
  { hour: '00:00', threats: 12 },
  { hour: '02:00', threats: 8 },
  { hour: '04:00', threats: 5 },
  { hour: '06:00', threats: 15 },
  { hour: '08:00', threats: 28 },
  { hour: '10:00', threats: 42 },
  { hour: '12:00', threats: 55 },
  { hour: '14:00', threats: 48 },
  { hour: '16:00', threats: 62 },
  { hour: '18:00', threats: 38 },
  { hour: '20:00', threats: 25 },
  { hour: '22:00', threats: 18 },
];

const severityData = [
  { name: 'Critical', value: 89 },
  { name: 'High', value: 156 },
  { name: 'Medium', value: 234 },
  { name: 'Low', value: 447 },
];

const attackVectorData = [
  { vector: 'Email', value: 65 },
  { vector: 'Web', value: 82 },
  { vector: 'Network', value: 73 },
  { vector: 'Endpoint', value: 58 },
  { vector: 'Cloud', value: 45 },
  { vector: 'Mobile', value: 38 },
];

const monthlyData = [
  { month: 'Jan', threats: 420, blocked: 380 },
  { month: 'Feb', threats: 485, blocked: 445 },
  { month: 'Mar', threats: 520, blocked: 495 },
  { month: 'Apr', threats: 580, blocked: 548 },
  { month: 'May', threats: 645, blocked: 612 },
  { month: 'Jun', threats: 720, blocked: 685 },
];

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308'];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Phân tích chi tiết</h2>
        <p className="text-gray-600 mt-1">Biểu đồ và thống kê nâng cao</p>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList>
          <TabsTrigger value="trends">Xu hướng</TabsTrigger>
          <TabsTrigger value="activity">Hoạt động</TabsTrigger>
          <TabsTrigger value="severity">Mức độ</TabsTrigger>
          <TabsTrigger value="vectors">Vector tấn công</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Xu hướng theo loại mối đe dọa</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={threatTrendData}>
                <defs>
                  <linearGradient id="colorMalware" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDdos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBreach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="malware" stroke="#ef4444" fillOpacity={1} fill="url(#colorMalware)" />
                <Area type="monotone" dataKey="phishing" stroke="#f97316" fillOpacity={1} fill="url(#colorPhishing)" />
                <Area type="monotone" dataKey="ddos" stroke="#f59e0b" fillOpacity={1} fill="url(#colorDdos)" />
                <Area type="monotone" dataKey="breach" stroke="#eab308" fillOpacity={1} fill="url(#colorBreach)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Mối đe dọa vs Đã chặn (6 tháng)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} name="Mối đe dọa" />
                <Line type="monotone" dataKey="blocked" stroke="#22c55e" strokeWidth={2} name="Đã chặn" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Hoạt động 24 giờ</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={hourlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="threats" stroke="#3b82f6" strokeWidth={3} name="Mối đe dọa" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="severity" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Phân tích mức độ nghiêm trọng</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={severityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6">
                  {severityData.map((entry, index) => (
                    <bar key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="vectors" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Vector tấn công</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={attackVectorData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="vector" />
                  <PolarRadiusAxis />
                  <Radar name="Tấn công" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Thống kê vector</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attackVectorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vector" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
