// Backend API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Real API fetch with fallback to mock data
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    // Backend trả về format { success, message, data }
    if (result.success !== undefined) {
      return result.data as T;
    }

    return result as T;
  } catch (error) {
    console.warn(`Backend API failed for ${endpoint}, using mock data:`, error);
    // Fallback to mock data if backend unavailable
    await new Promise(resolve => setTimeout(resolve, 300));
    return getMockData(endpoint) as T;
  }
}

function getMockData(endpoint: string): any {
  // Dashboard data
  if (endpoint === '/api/v1/dashboard') {
    return {
      metrics: {
        total_threats: 926,
        active_incidents: 23,
        blocked_attacks: 1847,
        affected_countries: 47
      },
      severity_stats: {
        critical: 45,
        high: 128,
        medium: 342,
        low: 411
      },
      indicator_types: [
        { type: 'Malware', count: 341 },
        { type: 'Phishing', count: 253 },
        { type: 'DDoS', count: 197 },
        { type: 'Breach', count: 135 }
      ],
      recent_alerts: [
        {
          id: '1',
          title: 'CVE-2024-1234',
          description: 'Critical vulnerability detected',
          severity: 'critical',
          type: 'vulnerability',
          status: 'active',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Phishing Campaign XYZ',
          description: 'Ongoing phishing campaign targeting users',
          severity: 'high',
          type: 'phishing',
          status: 'investigating',
          created_at: new Date().toISOString()
        }
      ]
    };
  }

  // Stats endpoints
  if (endpoint === '/api/v1/stats/severity') {
    return {
      critical: 45,
      high: 128,
      medium: 342,
      low: 411
    };
  }

  if (endpoint === '/api/v1/stats/indicator-types') {
    return [
      { type: 'Malware', count: 341 },
      { type: 'Phishing', count: 253 },
      { type: 'DDoS', count: 197 },
      { type: 'Breach', count: 135 }
    ];
  }

  // Feeds list
  if (endpoint === '/api/v1/feeds') {
    return [
      {
        id: '1',
        name: 'AlienVault OTX',
        url: 'https://otx.alienvault.com',
        source: 'alienvault',
        enabled: true,
        last_updated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Abuse.ch',
        url: 'https://abuse.ch',
        source: 'abuse_ch',
        enabled: true,
        last_updated: new Date().toISOString()
      }
    ];
  }

  // Alerts list
  if (endpoint === '/api/v1/alerts') {
    return [
      {
        id: '1',
        title: 'CVE-2024-1234',
        description: 'Critical vulnerability in system',
        severity: 'critical',
        type: 'vulnerability',
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Phishing detected',
        description: 'Phishing campaign targeting users',
        severity: 'high',
        type: 'phishing',
        status: 'investigating',
        created_at: new Date().toISOString()
      }
    ];
  }

  // Health check
  if (endpoint === '/health') {
    return { status: 'ok' };
  }

  // Root
  if (endpoint === '/') {
    return { message: 'Threat Intelligence API' };
  }

  // Default response
  return { message: 'Mock data' };
}

// Types
export interface Feed {
  id: string;
  name: string;
  url: string;
  source: string;
  enabled: boolean;
  last_updated?: string;
  created_at?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  status: 'active' | 'investigating' | 'mitigated';
  source?: string;
  created_at: string;
  updated_at?: string;
}

export interface MetricsResponse {
  total_threats: number;
  active_incidents: number;
  blocked_attacks: number;
  affected_countries: number;
  daily_change?: {
    threats: number;
    incidents: number;
    blocked: number;
    countries: number;
  };
}

export interface SeverityStats {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface IndicatorType {
  type: string;
  count: number;
}

export interface DashboardData {
  metrics: MetricsResponse;
  severity_stats: SeverityStats;
  indicator_types: IndicatorType[];
  recent_alerts: Alert[];
  trend_data?: any[];
}

// System APIs
export const systemAPI = {
  health: () => fetchAPI<{ status: string }>('/health'),
  root: () => fetchAPI<{ message: string }>('/'),
};

// Dashboard API
export const dashboardAPI = {
  getDashboard: () => fetchAPI<DashboardData>('/api/v1/dashboard'),
};

// Feeds APIs
export const feedsAPI = {
  list: () => fetchAPI<Feed[]>('/api/v1/feeds'),
  get: (feedId: string) => fetchAPI<Feed>(`/api/v1/feeds/${feedId}`),
  create: (feed: Partial<Feed>) =>
    fetchAPI<Feed>('/api/v1/feeds', {
      method: 'POST',
      body: JSON.stringify(feed),
    }),
  update: (feedId: string, feed: Partial<Feed>) =>
    fetchAPI<Feed>(`/api/v1/feeds/${feedId}`, {
      method: 'PATCH',
      body: JSON.stringify(feed),
    }),
  delete: (feedId: string) =>
    fetchAPI<void>(`/api/v1/feeds/${feedId}`, {
      method: 'DELETE',
    }),
};

// Alerts APIs
export const alertsAPI = {
  list: () => fetchAPI<Alert[]>('/api/v1/alerts'),
  get: (alertId: string) => fetchAPI<Alert>(`/api/v1/alerts/${alertId}`),
  create: (alert: Partial<Alert>) =>
    fetchAPI<Alert>('/api/v1/alerts', {
      method: 'POST',
      body: JSON.stringify(alert),
    }),
  update: (alertId: string, alert: Partial<Alert>) =>
    fetchAPI<Alert>(`/api/v1/alerts/${alertId}`, {
      method: 'PATCH',
      body: JSON.stringify(alert),
    }),
  delete: (alertId: string) =>
    fetchAPI<void>(`/api/v1/alerts/${alertId}`, {
      method: 'DELETE',
    }),
};

// Stats APIs
export const statsAPI = {
  metrics: () => fetchAPI<MetricsResponse>('/api/v1/metrics'),
  severity: () => fetchAPI<SeverityStats>('/api/v1/stats/severity'),
  indicatorTypes: () => fetchAPI<IndicatorType[]>('/api/v1/stats/indicator-types'),
};

// Debug APIs
export const debugAPI = {
  ingestMock: () =>
    fetchAPI<{ message: string }>('/api/v1/ingest/mock', {
      method: 'POST',
    }),
  resetDatabase: () =>
    fetchAPI<{ message: string }>('/api/v1/reset', {
      method: 'POST',
    }),
};

// Export all APIs
export const api = {
  system: systemAPI,
  dashboard: dashboardAPI,
  feeds: feedsAPI,
  alerts: alertsAPI,
  stats: statsAPI,
  debug: debugAPI,
};
