import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useSessions } from "@/contexts/SessionContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  Calendar, 
  MessageSquare, 
  User, 
  Clock, 
  ArrowRight, 
  BookOpen,
  Target,
  Star,
  CheckCircle,
  XCircle,
  Hourglass
} from "lucide-react";

const recommendedMentors = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "VP of Marketing at HubSpot",
    specialty: "Marketing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Jessica Lee",
    role: "Data Science Manager at Netflix",
    specialty: "Data Science",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 4.7,
  },
];

export default function MenteeDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { sessions, getMenteeSessions } = useSessions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

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

  const menteeId = user?.id?.toString() || 'demo-user';
  const menteeSessions = getMenteeSessions(menteeId);
  const upcomingSessions = menteeSessions.filter(s => s.status === 'accepted');
  const pendingSessions = menteeSessions.filter(s => s.status === 'pending');
  const completedSessions = menteeSessions.filter(s => s.status === 'completed');
  const uniqueMentors = [...new Set(menteeSessions.map(s => s.mentorName))];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Hourglass className="h-4 w-4 text-yellow-500" />;
      case 'declined': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Calendar className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'declined': return 'Declined';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display text-foreground mb-2">
                  Welcome back, <span className="text-primary">{user?.name || "Mentee"}</span>
                </h1>
                <p className="text-muted-foreground">
                  Track your mentorship journey and connect with experts
                </p>
              </div>
              <Button variant="hero" asChild>
                <Link to="/mentors">
                  Find a Mentor
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
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{menteeSessions.length}</div>
                    <div className="text-sm text-muted-foreground">Sessions</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{uniqueMentors.length}</div>
                    <div className="text-sm text-muted-foreground">Mentors</div>
                  </div>
                  <div className="bg-card rounded-xl p-5 shadow-soft border border-border text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-display text-foreground">{completedSessions.length}h</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display text-foreground">Upcoming Sessions</h2>
                    {upcomingSessions.length > 0 && (
                      <span className="bg-green-500/10 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                        {upcomingSessions.length} confirmed
                      </span>
                    )}
                  </div>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                          <img 
                            src={session.mentorImage} 
                            alt={session.mentorName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{session.topic}</p>
                            <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
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
                      <p className="text-muted-foreground mb-4">No confirmed sessions yet</p>
                      <Button variant="outline" asChild>
                        <Link to="/mentors">Book a Session</Link>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Pending Requests */}
                {pendingSessions.length > 0 && (
                  <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-display text-foreground">Pending Requests</h2>
                      <span className="bg-yellow-500/10 text-yellow-600 text-xs font-medium px-2 py-1 rounded-full">
                        {pendingSessions.length} awaiting
                      </span>
                    </div>
                    <div className="space-y-4">
                      {pendingSessions.map((session) => (
                        <div key={session.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                          <img 
                            src={session.mentorImage} 
                            alt={session.mentorName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{session.topic}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.mentorName} • {format(new Date(session.date), 'MMM d')} at {session.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(session.status)}
                            <span className="text-sm text-muted-foreground">{getStatusLabel(session.status)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Sessions History */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <h2 className="text-xl font-display text-foreground mb-6">Session History</h2>
                  {menteeSessions.length > 0 ? (
                    <div className="space-y-4">
                      {menteeSessions.slice(0, 5).map((session) => (
                        <div key={session.id} className="flex items-start gap-3">
                          <div className="mt-1">{getStatusIcon(session.status)}</div>
                          <div>
                            <p className="text-foreground">
                              {session.topic} with {session.mentorName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(session.date), 'MMM d, yyyy')} • {getStatusLabel(session.status)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No session history yet</p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <h3 className="font-display text-lg text-foreground">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/mentee/profile">
                      Edit Profile
                    </Link>
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <h3 className="font-display text-lg text-foreground mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link to="/mentors" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Find Mentors</span>
                    </Link>
                    <Link to="/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Read Articles</span>
                    </Link>
                    <Link to="/success-stories" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span className="text-foreground">Success Stories</span>
                    </Link>
                  </div>
                </div>

                {/* Recommended Mentors */}
                <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                  <h3 className="font-display text-lg text-foreground mb-4">Recommended for You</h3>
                  <div className="space-y-4">
                    {recommendedMentors.map((mentor) => (
                      <div key={mentor.id} className="flex items-center gap-3">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{mentor.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{mentor.specialty}</p>
                        </div>
                        <div className="flex items-center gap-1 text-accent">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs">{mentor.rating}</span>
                        </div>
                      </div>
                    ))}
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