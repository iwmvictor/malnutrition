import { useState, useEffect } from "react";
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  // Filter,
  // Download,
  // Search,
  Bell,
  MapPin,
  // Calendar,
  BarChart3,
  // PieChart as PieChartIcon,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  // PieChart,
  // Pie,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useApp } from "../context/AppContext";
import {
  useDashboardTranslation,
  // useTranslation,
} from "../utils/tools/translations";
// import { clsx } from "clsx";
import { Navbar } from "./Navbar";
import RegistrationForm from "./RegisterForm";
// import { IUser } from "../types";
import { createUser } from "../apis/users";
import toast from "react-hot-toast";

interface AdminDashboardProps {
  adminLevel: "cell" | "sector" | "district" | "province" | "ministry";
}

export function AdminDashboard({ adminLevel }: AdminDashboardProps) {
  const { state } = useApp();
  const { t } = useDashboardTranslation(state.language);
  // const [selectedFilter, setSelectedFilter] = useState("all");
  // const [dateRange, setDateRange] = useState("30days");
  // const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("overview");
  const [registerModal, setRegisterModal] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const [lowLevel, setLowLevel] = useState<string>("");

  useEffect(() => {
    switch (adminLevel.toLowerCase()) {
      case "ministry":
        setLowLevel("District");
        break;
      case "district":
        setLowLevel("Sector");
        break;
      case "sector":
        setLowLevel("Cell");
        break;
      case "cell":
        setLowLevel("Village");
        break;
      default:
        setLowLevel("");
    }
  }, [adminLevel]);

  const toggleRegModal = () => {
    setRegisterModal(!registerModal);
  };

  // Mock data based on admin level
  const getAreaStats = () => {
    const baseStats = {
      cell: { families: 45, children: 89, advisors: 2, areas: 5 },
      sector: { families: 234, children: 467, advisors: 12, areas: 8 },
      district: { families: 1456, children: 2890, advisors: 45, areas: 15 },
      province: { families: 8934, children: 17845, advisors: 234, areas: 30 },
      ministry: { families: 45678, children: 91234, advisors: 1234, areas: 5 },
    };

    const stats = baseStats[adminLevel];
    return {
      totalFamilies: stats.families,
      totalChildren: stats.children,
      atRiskChildren: Math.floor(stats.children * 0.15),
      severeAlerts: Math.floor(stats.children * 0.03),
      healthAdvisors: stats.advisors,
      subAreas: stats.areas,
    };
  };

  const areaStats = getAreaStats();

  const getAreaName = () => {
    const names = {
      village: "Kinyababa Village",
      cell: "Kinyababa Cell",
      sector: "Karangazi Sector",
      district: "Nyagatare District",
      province: "Eastern Province",
      ministry: "Ministry of Health - Rwanda",
    };
    return names[adminLevel];
  };

  const getSubAreaType = () => {
    const types = {
      cell: "Villages",
      sector: "Cells",
      district: "Sectors",
      province: "Districts",
      ministry: "Provinces",
    };
    return types[adminLevel];
  };

  const malnutritionTrendData = [
    { month: "Jan", normal: 85, moderate: 12, severe: 3 },
    { month: "Feb", normal: 87, moderate: 10, severe: 3 },
    { month: "Mar", normal: 89, moderate: 9, severe: 2 },
    { month: "Apr", normal: 91, moderate: 7, severe: 2 },
    { month: "May", normal: 92, moderate: 6, severe: 2 },
    { month: "Jun", normal: 94, moderate: 5, severe: 1 },
  ];

  const areaComparisonData = [
    { name: "Area 1", healthy: 95, moderate: 4, severe: 1 },
    { name: "Area 2", healthy: 88, moderate: 10, severe: 2 },
    { name: "Area 3", healthy: 92, moderate: 6, severe: 2 },
    { name: "Area 4", healthy: 85, moderate: 12, severe: 3 },
    { name: "Area 5", healthy: 90, moderate: 8, severe: 2 },
  ];

  const interventionImpactData = [
    { month: "Jan", interventions: 45, improved: 38 },
    { month: "Feb", interventions: 52, improved: 44 },
    { month: "Mar", interventions: 48, improved: 41 },
    { month: "Apr", interventions: 55, improved: 49 },
    { month: "May", interventions: 61, improved: 54 },
    { month: "Jun", interventions: 58, improved: 52 },
  ];

  const criticalAlerts = [
    {
      id: "1",
      area: "Rugarama Village",
      type: "Severe Malnutrition Cluster",
      affectedChildren: 8,
      severity: "critical",
      reportedBy: "Health Advisor Marie",
      timestamp: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      area: "Kinyababa Village",
      type: "Stunting Increase",
      affectedChildren: 12,
      severity: "high",
      reportedBy: "Health Advisor Jean",
      timestamp: "6 hours ago",
      status: "investigating",
    },
    {
      id: "3",
      area: "Gaseke Village",
      type: "MUAC Alert",
      affectedChildren: 5,
      severity: "medium",
      reportedBy: "Health Advisor Grace",
      timestamp: "1 day ago",
      status: "resolved",
    },
  ];

  const topPerformingAreas = [
    { name: "Rugarama", score: 97, trend: "up", children: 45 },
    { name: "Kinyababa", score: 94, trend: "up", children: 38 },
    { name: "Nyabisindu", score: 91, trend: "stable", children: 42 },
    { name: "Gaseke", score: 88, trend: "down", children: 35 },
    { name: "Rwimbogo", score: 85, trend: "up", children: 40 },
  ];

  const recentActions = [
    {
      id: "1",
      action: "New Health Advisor assigned",
      user: "District Admin",
      area: "Rugarama Village",
      timestamp: "1 hour ago",
      type: "assignment",
    },
    {
      id: "2",
      action: "Emergency intervention approved",
      user: "Sector Admin",
      area: "Kinyababa Village",
      timestamp: "3 hours ago",
      type: "intervention",
    },
    {
      id: "3",
      action: "Monthly report submitted",
      user: "Health Advisor Marie",
      area: "Gaseke Village",
      timestamp: "5 hours ago",
      type: "report",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200";
      case "high":
        return "text-orange-700 bg-orange-100 dark:bg-orange-900 dark:text-orange-200";
      case "medium":
        return "text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200";
      case "investigating":
        return "text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200";
      case "resolved":
        return "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200";
      default:
        return "text-gray-700 bg-gray-100 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const stats = [
    {
      label: `${t("totalFamilies")}`,
      value: areaStats.totalFamilies.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
      change: "+8.2%",
    },
    {
      label: `${t("childMonitored")}`,
      value: areaStats.totalChildren.toLocaleString(),
      icon: <Activity className="w-6 h-6" />,
      color:
        "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300",
      change: "+12.5%",
    },
    {
      label: `${t("atRisk")}`,
      value: areaStats.atRiskChildren.toLocaleString(),
      icon: <AlertTriangle className="w-6 h-6" />,
      color:
        "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300",
      change: "-5.3%",
    },
    {
      label: `${t("healthAdvisors")}`,
      value: areaStats.healthAdvisors.toLocaleString(),
      icon: <Bell className="w-6 h-6" />,
      color:
        "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300",
      change: "+15.8%",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {adminLevel.charAt(0).toUpperCase() + adminLevel.slice(1)}{" "}
                  Admin Dashboard
                </h1>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{getAreaName()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setSelectedView("overview")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedView === "overview"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {t("overview")}
                  </button>
                  <button
                    onClick={() => setSelectedView("analytics")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedView === "analytics"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {t("analytics")}
                  </button>
                  <button
                    onClick={() => setSelectedView("alerts")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedView === "alerts"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {t("alerts")}
                  </button>
                </div>
                <button
                  onClick={toggleRegModal}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {t("add")} {lowLevel}{" "}
                  </span>
                </button>
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
                      {stat.change} {t("fromLastMonth")}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedView === "overview" && (
            <>
              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Malnutrition Trends */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Malnutrition Trends Over Time
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={malnutritionTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="normal"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="moderate"
                        stackId="1"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="severe"
                        stackId="1"
                        stroke="#EF4444"
                        fill="#EF4444"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Area Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    {getSubAreaType()} Performance Comparison
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={areaComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="healthy" stackId="a" fill="#10B981" />
                      <Bar dataKey="moderate" stackId="a" fill="#F59E0B" />
                      <Bar dataKey="severe" stackId="a" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Performance Rankings and Critical Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Top Performing Areas */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Top Performing {getSubAreaType()}
                  </h3>
                  <div className="space-y-4">
                    {topPerformingAreas.map((area, index) => (
                      <div
                        key={area.name}
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
                              {area.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {area.children} children monitored
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {area.score}%
                            </span>
                            <TrendingUp
                              className={`w-4 h-4 ${
                                area.trend === "up"
                                  ? "text-green-500"
                                  : area.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Critical Alerts */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Critical Alerts
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      {
                        criticalAlerts.filter(
                          (alert) => alert.status === "pending"
                        ).length
                      }{" "}
                      Pending
                    </span>
                  </div>
                  <div className="space-y-4">
                    {criticalAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {alert.type}
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
                              {alert.area} • {alert.affectedChildren} children
                              affected
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Reported by {alert.reportedBy} • {alert.timestamp}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              alert.status
                            )}`}
                          >
                            {alert.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedView === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Intervention Impact */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Intervention Impact Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={interventionImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="interventions"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Interventions"
                    />
                    <Line
                      type="monotone"
                      dataKey="improved"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Improved Cases"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Additional Analytics Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Resource Allocation Efficiency
                </h3>
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                    <p>Advanced analytics coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Recent Administrative Actions
            </h3>
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      action.type === "assignment"
                        ? "bg-blue-100 text-blue-600"
                        : action.type === "intervention"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {action.type === "assignment" ? (
                      <Users className="w-5 h-5" />
                    ) : action.type === "intervention" ? (
                      <Activity className="w-5 h-5" />
                    ) : (
                      <Bell className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {action.action}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.user} • {action.area}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {action.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {registerModal && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto transition-transform duration-300 rounded-lg">
            <button
              onClick={toggleRegModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <RegistrationForm
              currentUserRole={adminLevel.toUpperCase()}
              isSubmitting={isCreatingUser}
              onSuccess={() => {
                setRegisterModal(false);
                toast.success("User created successfully");
              }}
              onSubmit={async (data) => {
                try {
                  setIsCreatingUser(true);

                  const formData = new FormData();

                  for (const key in data) {
                    if (data[key]) {
                      formData.append(key, data[key]);
                    }
                  }

                  const user = await createUser(formData);
                  return true;
                } catch (error) {
                  toast.error("Failed to create user.");
                  console.error("Create user error:", error);
                } finally {
                  setIsCreatingUser(false);
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
