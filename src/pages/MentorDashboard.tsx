import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useSessions } from "@/contexts/SessionContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  Clock, 
  ArrowRight, 
  Star,
  TrendingUp,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function MentorDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { sessions, updateSessionStatus } = useSessions();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter sessions by mentor ID for the logged-in mentor
  const mentorId = user?.id?.toString() || '2001';
  const mentorName = user?.name || "Demo Mentor";
  
  // Get sessions where this mentor is assigned
  const mentorSessions = sessions.filter(s => s.mentorId === mentorId);
  const pendingRequests = mentorSessions.filter(s => s.status === 'pending');
  const acceptedSessions = mentorSessions.filter(s => s.status === 'accepted');
  const completedSessions = mentorSessions.filter(s => s.status === 'completed');
  const uniqueMentees = [...new Set(mentorSessions.map(s => s.menteeName))];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleAccept = (sessionId: string, menteeName: string) => {
    updateSessionStatus(sessionId, 'accepted');
    toast({
      title: "Session accepted!",
      description: `You've confirmed the session with ${menteeName}.`,
    });
  };

  const handleDecline = (sessionId: string, menteeName: string) => {
    updateSessionStatus(sessionId, 'declined');
    toast({
      title: "Session declined",
      description: `You've declined the session request from ${menteeName}.`,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display text-foreground mb-2">
                  Welcome, <span className="text-primary">{user?.name || "Mentor"}</span>
                </h1>
                <p className="text-muted-foreground">
                  Manage your mentees and track your impact
                </p>
              </div>
              <Button variant="hero" asChild>
                <Link to="/mentor/profile">
                  Edit Profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{uniqueMentees.length}</div>
                    <div className="text-sm text-muted-foreground">Mentees</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{mentorSessions.length}</div>
                    <div className="text-sm text-muted-foreground">Sessions</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{completedSessions.length}h</div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 text-accent mb-3">
                      <Star className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">4.9</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display text-foreground">Pending Requests</h2>
                    {pendingRequests.length > 0 && (
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {pendingRequests.length} new
                      </span>
                    )}
                  </div>
                  {pendingRequests.length > 0 ? (
                    <div className="space-y-4">
                      {pendingRequests.map((request) => (
                        <div key={request.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{request.menteeName}</p>
                            <p className="text-sm text-muted-foreground">{request.topic}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(request.date), 'MMM d, yyyy')} at {request.time}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDecline(request.id, request.menteeName)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                            <Button 
                              size="sm" 
                              variant="hero"
                              onClick={() => handleAccept(request.id, request.menteeName)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No pending requests</p>
                    </div>
                  )}
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display text-foreground">Upcoming Sessions</h2>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  {acceptedSessions.length > 0 ? (
                    <div className="space-y-4">
                      {acceptedSessions.map((session) => (
                        <div key={session.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{session.topic}</p>
                            <p className="text-sm text-muted-foreground">with {session.menteeName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              {format(new Date(session.date), 'MMM d, yyyy')}
                            </p>
                            <p className="text-sm text-muted-foreground">{session.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming sessions</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Impact Card */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground">Your Impact</h3>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sessions completed</span>
                      <span className="font-medium text-foreground">{completedSessions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New mentees</span>
                      <span className="font-medium text-foreground">{uniqueMentees.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hours mentored</span>
                      <span className="font-medium text-foreground">{completedSessions.length}h</span>
                    </div>
                  </div>
                </div>

                {/* Recent Mentees */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <h3 className="font-display text-lg text-foreground mb-4">Your Mentees</h3>
                  {uniqueMentees.length > 0 ? (
                    <div className="space-y-4">
                      {uniqueMentees.slice(0, 5).map((menteeName, index) => {
                        const menteeSession = sessions.find(s => s.menteeName === menteeName);
                        const menteeSessionCount = sessions.filter(s => s.menteeName === menteeName).length;
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm truncate">{menteeName}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {menteeSessionCount} session{menteeSessionCount !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No mentees yet</p>
                  )}
                </div>

                {/* Quick Links */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <h3 className="font-display text-lg text-foreground mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link to="/mentor/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Update Availability</span>
                    </Link>
                    <Link to="/guidelines" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Mentor Guidelines</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}