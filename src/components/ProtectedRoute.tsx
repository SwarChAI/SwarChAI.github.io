import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/services/api/authApi";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireApproval?: boolean;
  requireProfileComplete?: boolean;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles,
  requireApproval = true,
  requireProfileComplete = true 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if profile needs to be completed (social login users)
  if (requireProfileComplete && !user.profileComplete && user.provider && user.provider !== 'email') {
    return <Navigate to="/complete-profile" replace />;
  }

  // Check if user needs approval and isn't approved yet
  if (requireApproval && user.approvalStatus !== 'approved') {
    return <Navigate to="/application-status" replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.userRole)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user.userRole === 'mentor' ? '/mentor/dashboard' : 
                        user.userRole === 'admin' ? '/admin' : '/mentee/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
