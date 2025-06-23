import { useState } from "react";
import {
  Users,
  AlertTriangle,
  TrendgUp,
  Activity,
  Filter,
  Download,
  Search,
  Bell,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../utils/tools/translations";
import { clsx } from "clsx";

export function HealthAdvisorDashboard() {
  const { state } = useApp();
  const { t } = useTranslation(state.language);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30days");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for health advisor's assigned area
  const areaStats = {
    totalFamilies: 45,
    totalChildren: 89,
    atRiskChildren: 12,
    severeAlerts: 3,
    newRegistrations: 8,
    completedVisits: 23,
  };

  const growthTrendData = [
    { month: "Jan", normal: 65, moderate: 15, severe: 9 },
    { month: "Feb", normal: 68, moderate: 13, severe: 8 },
    { month: "Mar", normal: 71, moderate: 12, severe: 6 },
    { month: "Apr", normal: 74, moderate: 11, severe: 4 },
    { month: "May", normal: 76, moderate: 10, severe: 3 },
    { month: "Jun", normal: 78, moderate: 9, severe: 2 },
  ];

  const malnutritionDistribution = [
    { name: "Normal", value: 78, color: "#10B981" },
    { name: "Moderate", value: 9, color: "#F59E0B" },
    { name: "Severe", value: 2, color: "#EF4444" },
  ];

  const emergencyAlerts = [
    {
      id: "1",
      childName: "Uwimana Grace",
      parentName: "Marie Uwimana",
      village: "Rugarama",
      severity: "severe",
      condition: "Severe Wasting",
      lastMeasurement: "2024-01-15",
      status: "pending",
    },
    {
      id: "2",
      childName: "Mugabo Eric",
      parentName: "Jean Mugabo",
      village: "Kinyababa",
      severity: "moderate",
      condition: "Moderate Stunting",
      lastMeasurement: "2024-01-14",
      status: "in_progress",
    },
    {
      id: "3",
      childName: "Ishimwe Alice",
      parentName: "Rose Ishimwe",
      village: "Rugarama",
      severity: "severe",
      condition: "MUAC Critical",
      lastMeasurement: "2024-01-13",
      status: "resolved",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      action: "New family registered",
      user: "Nkurunziza Family",
      location: "Rugarama Village",
      timestamp: "2 hours ago",
      type: "registration",
    },
    {
      id: "2",
      action: "Measurement added",
      user: "Marie Uwimana",
      location: "Kinyababa Village",
      timestamp: "4 hours ago",
      type: "measurement",
    },
    {
      id: "3",
      action: "Alert resolved",
      user: "Health Advisor",
      location: "Rugarama Village",
      timestamp: "1 day ago",
      type: "alert",
    },
  ];

  const topPerformingVillages = [
    {
      name: "Rugarama",
      healthyChildren: 95,
      totalChildren: 98,
      percentage: 97,
    },
    {
      name: "Kinyababa",
      healthyChildren: 42,
      totalChildren: 45,
      percentage: 93,
    },
    {
      name: "Nyabisindu",
      healthyChildren: 38,
      totalChildren: 42,
      percentage: 90,
    },
    { name: "Gaseke", healthyChildren: 35, totalChildren: 40, percentage: 88 },
    {
      name: "Rwimbogo",
      healthyChildren: 32,
      totalChildren: 38,
      percentage: 84,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200";
      case "moderate":
        return "text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200";
      case "in_progress":
        return "text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200";
      case "resolved":
        return "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200";
      default:
        return "text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const stats = [
    {
      label: "Total Families",
      value: areaStats.totalFamilies,
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
      change: "+12%",
    },
    {
      label: "Children Monitored",
      value: areaStats.totalChildren,
      icon: <Activity className="w-6 h-6" />,
      color:
        "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300",
      change: "+8%",
    },
    {
      label: "At Risk",
      value: areaStats.atRiskChildren,
      icon: <AlertTriangle className="w-6 h-6" />,
      color:
        "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300",
      change: "-15%",
    },
    {
      label: "Severe Alerts",
      value: areaStats.severeAlerts,
      icon: <Bell className="w-6 h-6" />,
      color: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300",
      change: "-25%",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("healthAdvice")}
              </h1>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>
                  Karangazi Sector • {state.user?.assignedArea?.cell} Cell
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search families or children..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="normal">Normal</option>
                <option value="moderate">Moderate Risk</option>
                <option value="severe">Severe Risk</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 3 months</option>
                <option value="1year">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Growth Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Nutrition Status Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="normal"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="moderate"
                  stroke="#F59E0B"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="severe"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Malnutrition Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Current Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={malnutritionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {malnutritionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emergency Alerts & Village Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Emergency Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Emergency Alerts
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                {
                  emergencyAlerts.filter((alert) => alert.status === "pending")
                    .length
                }{" "}
                Pending
              </span>
            </div>
            <div className="space-y-4">
              {emergencyAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {alert.childName}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Parent: {alert.parentName} • {alert.village}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {alert.condition}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Last measured: {alert.lastMeasurement}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            alert.status
                          )}`}
                        >
                          {alert.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Villages */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Village Performance Rankings
            </h3>
            <div className="space-y-4">
              {topPerformingVillages.map((village, index) => (
                <div
                  key={village.name}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-800"
                          : index === 1
                          ? "bg-gray-100 text-gray-800"
                          : index === 2
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {village.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {village.healthyChildren}/{village.totalChildren}{" "}
                        children
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {village.percentage}%
                    </div>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${village.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "registration"
                      ? "bg-blue-100 text-blue-600"
                      : activity.type === "measurement"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {activity.type === "registration" ? (
                    <Users className="w-5 h-5" />
                  ) : activity.type === "measurement" ? (
                    <Activity className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.user} • {activity.location}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
