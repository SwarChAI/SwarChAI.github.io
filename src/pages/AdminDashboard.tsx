import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useUsers } from "@/contexts/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ApprovalStatus, User } from "@/services/api/authApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  GraduationCap, 
  Shield,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Search,
  UserCheck,
  UserX,
  CalendarPlus,
  TrendingUp,
  BarChart3,
  Globe,
  Eye,
  MousePointer,
  Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";

// Mock data for analytics
const userGrowthData = [
  { month: "Jan", mentors: 4, mentees: 12 },
  { month: "Feb", mentors: 6, mentees: 18 },
  { month: "Mar", mentors: 8, mentees: 25 },
  { month: "Apr", mentors: 12, mentees: 35 },
  { month: "May", mentors: 15, mentees: 42 },
  { month: "Jun", mentors: 18, mentees: 55 },
];

const industryData = [
  { name: "Technology", value: 35, fill: "hsl(var(--primary))" },
  { name: "Finance", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "Healthcare", value: 20, fill: "hsl(var(--chart-3))" },
  { name: "Education", value: 12, fill: "hsl(var(--chart-4))" },
  { name: "Other", value: 8, fill: "hsl(var(--chart-5))" },
];

const pageViewsData = [
  { day: "Mon", views: 1200, visitors: 450 },
  { day: "Tue", views: 1450, visitors: 520 },
  { day: "Wed", views: 1680, visitors: 610 },
  { day: "Thu", views: 1520, visitors: 580 },
  { day: "Fri", views: 1890, visitors: 720 },
  { day: "Sat", views: 980, visitors: 380 },
  { day: "Sun", views: 850, visitors: 320 },
];

const trafficSourceData = [
  { source: "Direct", visits: 4500 },
  { source: "Organic", visits: 3200 },
  { source: "Social", visits: 2100 },
  { source: "Referral", visits: 1800 },
  { source: "Email", visits: 900 },
];

const chartConfig = {
  mentors: {
    label: "Mentors",
    color: "hsl(var(--primary))",
  },
  mentees: {
    label: "Mentees",
    color: "hsl(var(--chart-2))",
  },
  views: {
    label: "Page Views",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
  visits: {
    label: "Visits",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function AdminDashboard() {
  const { user } = useAuth();
  const { users, updateUserStatus, getMentees, getMentors, getPendingUsers } = useUsers();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "mentee" | "mentor">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | ApprovalStatus>("all");
  const [scheduleModal, setScheduleModal] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });
  const [consultationDate, setConsultationDate] = useState("");

  const mentees = getMentees();
  const mentors = getMentors();
  const pendingUsers = getPendingUsers();

  // Filter users (exclude admin from the list)
  const filteredUsers = users
    .filter(u => u.userRole !== 'admin')
    .filter(u => {
      if (filterRole !== "all" && u.userRole !== filterRole) return false;
      if (filterStatus !== "all" && u.approvalStatus !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.currentRole?.toLowerCase().includes(query) ?? false)
        );
      }
      return true;
    });

  const getStatusConfig = (status: ApprovalStatus) => {
    switch (status) {
      case 'approved':
        return { icon: CheckCircle2, label: 'Approved', color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'consultation_scheduled':
        return { icon: Calendar, label: 'Scheduled', color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'rejected':
        return { icon: XCircle, label: 'Rejected', color: 'text-destructive', bg: 'bg-destructive/10' };
      default:
        return { icon: Clock, label: 'Pending', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    }
  };

  const handleStatusChange = (targetUser: User, newStatus: ApprovalStatus) => {
    if (newStatus === 'consultation_scheduled') {
      setScheduleModal({ open: true, user: targetUser });
    } else {
      updateUserStatus(targetUser.id, newStatus);
      toast({
        title: "Status Updated",
        description: `${targetUser.name}'s status changed to ${newStatus.replace('_', ' ')}.`,
      });
    }
  };

  const handleScheduleSubmit = () => {
    if (scheduleModal.user && consultationDate) {
      updateUserStatus(scheduleModal.user.id, 'consultation_scheduled', consultationDate);
      toast({
        title: "Consultation Scheduled",
        description: `Consultation scheduled for ${scheduleModal.user.name}.`,
      });
      setScheduleModal({ open: false, user: null });
      setConsultationDate("");
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">Manage users, view analytics, and monitor platform activity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs for different sections */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="users" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                <TabsTrigger value="users" className="gap-2">
                  <Users className="h-4 w-4" />
                  User Management
                </TabsTrigger>
                <TabsTrigger value="user-analytics" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  User Analytics
                </TabsTrigger>
                <TabsTrigger value="website-analytics" className="gap-2">
                  <Globe className="h-4 w-4" />
                  Website Analytics
                </TabsTrigger>
              </TabsList>

              {/* User Management Tab */}
              <TabsContent value="users" className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{pendingUsers.length}</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{mentees.length}</div>
                    <div className="text-sm text-muted-foreground">Total Mentees</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{mentors.length}</div>
                    <div className="text-sm text-muted-foreground">Total Mentors</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 text-green-500 mb-3">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">
                      {users.filter(u => u.approvalStatus === 'approved' && u.userRole !== 'admin').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Approved</div>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="min-w-[120px]">
                          {filterRole === "all" ? "All Roles" : filterRole === "mentee" ? "Mentees" : "Mentors"}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFilterRole("all")}>All Roles</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterRole("mentee")}>Mentees</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterRole("mentor")}>Mentors</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="min-w-[140px]">
                          {filterStatus === "all" ? "All Status" : getStatusConfig(filterStatus).label}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("consultation_scheduled")}>Scheduled</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("approved")}>Approved</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>Rejected</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* User List */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">User</th>
                          <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Role</th>
                          <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Industry</th>
                          <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Status</th>
                          <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredUsers.map((u) => {
                          const status = getStatusConfig(u.approvalStatus);
                          const StatusIcon = status.icon;
                          return (
                            <tr key={u.id} className="hover:bg-secondary/30 transition-colors">
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                    {u.avatar ? (
                                      <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-sm font-medium text-muted-foreground">
                                        {u.name.charAt(0)}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-foreground">{u.name}</div>
                                    <div className="text-sm text-muted-foreground">{u.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                  u.userRole === 'mentor' 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-secondary text-secondary-foreground'
                                }`}>
                                  {u.userRole === 'mentor' ? <Users className="h-3 w-3" /> : <GraduationCap className="h-3 w-3" />}
                                  {u.userRole === 'mentor' ? 'Mentor' : 'Mentee'}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="text-sm text-foreground">{u.industry || '-'}</div>
                                <div className="text-xs text-muted-foreground">{u.currentRole || ''}</div>
                              </td>
                              <td className="px-4 py-4">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {status.label}
                                </div>
                                {u.consultationDate && u.approvalStatus === 'consultation_scheduled' && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(u.consultationDate).toLocaleDateString()}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      Update Status
                                      <ChevronDown className="h-4 w-4 ml-1" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                      onClick={() => handleStatusChange(u, 'consultation_scheduled')}
                                      className="text-blue-600"
                                    >
                                      <CalendarPlus className="h-4 w-4 mr-2" />
                                      Schedule Consultation
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handleStatusChange(u, 'approved')}
                                      className="text-green-600"
                                    >
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleStatusChange(u, 'rejected')}
                                      className="text-destructive"
                                    >
                                      <UserX className="h-4 w-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handleStatusChange(u, 'pending')}
                                    >
                                      <Clock className="h-4 w-4 mr-2" />
                                      Reset to Pending
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          );
                        })}
                        {filteredUsers.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                              No users found matching your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* User Analytics Tab */}
              <TabsContent value="user-analytics" className="space-y-6">
                {/* User Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-2xl font-display text-foreground">{mentors.length + mentees.length}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +12% this month
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-2xl font-display text-foreground">
                        {users.filter(u => u.approvalStatus === 'approved').length}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +8% this month
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-chart-2" />
                      </div>
                      <div className="text-2xl font-display text-foreground">{mentees.length}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Mentees</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +15% this month
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-chart-3" />
                      </div>
                      <div className="text-2xl font-display text-foreground">{mentors.length}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Mentors</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +5% this month
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* User Growth Chart */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-display text-foreground mb-4">User Growth</h3>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={userGrowthData}>
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="mentors" fill="var(--color-mentors)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="mentees" fill="var(--color-mentees)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>

                  {/* Industry Distribution */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-display text-foreground mb-4">Industry Distribution</h3>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={industryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {industryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* User Status Breakdown */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-display text-foreground mb-4">User Status Breakdown</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { status: 'pending', label: 'Pending', color: 'bg-amber-500' },
                      { status: 'consultation_scheduled', label: 'Scheduled', color: 'bg-blue-500' },
                      { status: 'approved', label: 'Approved', color: 'bg-green-500' },
                      { status: 'rejected', label: 'Rejected', color: 'bg-destructive' },
                    ].map((item) => {
                      const count = users.filter(u => u.approvalStatus === item.status && u.userRole !== 'admin').length;
                      const total = users.filter(u => u.userRole !== 'admin').length;
                      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                      return (
                        <div key={item.status} className="text-center">
                          <div className="text-2xl font-display text-foreground">{count}</div>
                          <div className="text-sm text-muted-foreground mb-2">{item.label}</div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${percentage}%` }} />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{percentage}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Website Analytics Tab */}
              <TabsContent value="website-analytics" className="space-y-6">
                {/* Website Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-2xl font-display text-foreground">24.5K</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Page Views</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +18% this week
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-chart-2" />
                      </div>
                      <div className="text-2xl font-display text-foreground">8.2K</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Unique Visitors</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +12% this week
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                        <MousePointer className="h-5 w-5 text-chart-3" />
                      </div>
                      <div className="text-2xl font-display text-foreground">3.2%</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +0.5% this week
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-chart-4" />
                      </div>
                      <div className="text-2xl font-display text-foreground">4:32</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Session</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      +8% this week
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Page Views Chart */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-display text-foreground mb-4">Weekly Traffic</h3>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <AreaChart data={pageViewsData}>
                        <XAxis dataKey="day" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          fill="hsl(var(--primary) / 0.2)" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="visitors" 
                          fill="hsl(var(--chart-3) / 0.2)" 
                          stroke="hsl(var(--chart-3))" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>

                  {/* Traffic Sources Chart */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-display text-foreground mb-4">Traffic Sources</h3>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <BarChart data={trafficSourceData} layout="vertical">
                        <XAxis type="number" tickLine={false} axisLine={false} />
                        <YAxis dataKey="source" type="category" tickLine={false} axisLine={false} width={80} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="visits" fill="var(--color-visits)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* Top Pages */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-display text-foreground mb-4">Top Pages</h3>
                  <div className="space-y-4">
                    {[
                      { page: "/", name: "Homepage", views: 8420, change: "+15%" },
                      { page: "/mentors", name: "Find Mentors", views: 4280, change: "+22%" },
                      { page: "/how-it-works", name: "How It Works", views: 3150, change: "+8%" },
                      { page: "/success-stories", name: "Success Stories", views: 2840, change: "+12%" },
                      { page: "/blog", name: "Blog", views: 2120, change: "+5%" },
                    ].map((item, index) => (
                      <div key={item.page} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-medium text-muted-foreground">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.page}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">{item.views.toLocaleString()}</div>
                          <div className="text-xs text-green-500">{item.change}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Schedule Consultation Modal */}
      <Dialog open={scheduleModal.open} onOpenChange={(open) => setScheduleModal({ open, user: open ? scheduleModal.user : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Consultation</DialogTitle>
            <DialogDescription>
              Set a consultation date for {scheduleModal.user?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Consultation Date & Time
            </label>
            <Input
              type="datetime-local"
              value={consultationDate}
              onChange={(e) => setConsultationDate(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleModal({ open: false, user: null })}>
              Cancel
            </Button>
            <Button onClick={handleScheduleSubmit} disabled={!consultationDate}>
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
