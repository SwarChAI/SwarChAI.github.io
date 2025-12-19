import { useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  FileText,
  ArrowRight,
  Mail
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const statusConfig = {
  pending: {
    icon: FileText,
    title: "Application Under Review",
    description: "Thank you for submitting your application! Our team is reviewing your profile.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  consultation_scheduled: {
    icon: Calendar,
    title: "Consultation Scheduled",
    description: "Your initial consultation has been scheduled. We look forward to meeting you!",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  approved: {
    icon: CheckCircle2,
    title: "Application Approved",
    description: "Congratulations! Your application has been approved.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  rejected: {
    icon: XCircle,
    title: "Application Not Approved",
    description: "Unfortunately, we weren't able to approve your application at this time.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};

export default function ApplicationStatus() {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const prevStatusRef = useRef<string | null>(null);

  // Show toast when status changes in real-time
  useEffect(() => {
    if (user && prevStatusRef.current && prevStatusRef.current !== user.approvalStatus) {
      const statusMessages: Record<string, { title: string; description: string }> = {
        consultation_scheduled: {
          title: "🎉 Consultation Scheduled!",
          description: "Your consultation has been scheduled. Check the details below.",
        },
        approved: {
          title: "🎊 You're Approved!",
          description: "Congratulations! You now have full access to the platform.",
        },
        rejected: {
          title: "Application Update",
          description: "Your application status has been updated.",
        },
        pending: {
          title: "Status Reset",
          description: "Your application is back under review.",
        },
      };
      
      const message = statusMessages[user.approvalStatus];
      if (message) {
        toast({
          title: message.title,
          description: message.description,
        });
      }
    }
    prevStatusRef.current = user?.approvalStatus || null;
  }, [user?.approvalStatus, toast]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  // If approved, redirect to appropriate dashboard
  if (user.approvalStatus === 'approved') {
    return <Navigate to={user.userRole === 'mentor' ? '/mentor/dashboard' : '/mentee/dashboard'} replace />;
  }

  const status = statusConfig[user.approvalStatus] || statusConfig.pending;
  const StatusIcon = status.icon;

  const nextSteps = user.userRole === 'mentor' ? [
    "Our team will review your application within 2-3 business days",
    "You'll receive an email to schedule a 30-minute consultation call",
    "During the call, we'll discuss your mentoring approach and goals",
    "After approval, you'll be onboarded to our mentor community",
  ] : [
    "Our team will review your application within 24-48 hours",
    "You'll receive an email to schedule your initial consultation",
    "We'll discuss your goals and match you with suitable mentors",
    "After approval, you'll have full access to our mentorship platform",
  ];

  return (
    <Layout>
      <section className="py-16 lg:py-24 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Status Card */}
            <div className="bg-card rounded-2xl p-8 shadow-card text-center mb-8 animate-fade-up">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${status.bgColor} ${status.color} mb-6`}>
                <StatusIcon className="h-10 w-10" />
              </div>
              
              <h1 className="text-3xl font-display text-foreground mb-4">
                {status.title}
              </h1>
              
              <p className="text-muted-foreground mb-6">
                {status.description}
              </p>

              {user.approvalStatus === 'consultation_scheduled' && user.consultationDate && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <Calendar className="h-5 w-5" />
                    <span>Scheduled: {new Date(user.consultationDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Applied as {user.userRole === 'mentor' ? 'Mentor' : 'Mentee'}</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-card rounded-2xl p-8 shadow-card mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-display text-foreground mb-4">Your Profile</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground font-medium">{user.email}</span>
                </div>
                {user.currentRole && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Current Role</span>
                    <span className="text-foreground font-medium">{user.currentRole}</span>
                  </div>
                )}
                {user.targetRole && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Target Role</span>
                    <span className="text-foreground font-medium">{user.targetRole}</span>
                  </div>
                )}
                {user.industry && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Industry</span>
                    <span className="text-foreground font-medium">{user.industry}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            {user.approvalStatus !== 'rejected' && (
              <div className="bg-card rounded-2xl p-8 shadow-card mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-xl font-display text-foreground mb-4">What's Next?</h2>
                <ul className="space-y-3">
                  {nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Support */}
            <div className="bg-secondary/30 rounded-xl p-6 text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Mail className="h-6 w-6 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-3">
                Have questions about your application?
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/contact">
                  Contact Support
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Sign Out */}
            <div className="text-center mt-8">
              <Button variant="ghost" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
