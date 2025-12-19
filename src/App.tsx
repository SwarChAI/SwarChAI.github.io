import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionProvider } from "./contexts/SessionContext";
import { UsersProvider } from "./contexts/UsersContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import HowItWorks from "./pages/HowItWorks";
import Guidelines from "./pages/Guidelines";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SuccessStories from "./pages/SuccessStories";
import BecomeMentor from "./pages/BecomeMentor";
import ShareStory from "./pages/ShareStory";
import Auth from "./pages/Auth";
import MenteeDashboard from "./pages/MenteeDashboard";
import MenteeProfile from "./pages/MenteeProfile";
import MentorDashboard from "./pages/MentorDashboard";
import MentorProfileEdit from "./pages/MentorProfileEdit";
import ApplicationStatus from "./pages/ApplicationStatus";
import AdminDashboard from "./pages/AdminDashboard";
import CompleteProfile from "./pages/CompleteProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UsersProvider>
        <SessionProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/mentors/:slug" element={<MentorProfile />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/become-mentor" element={<BecomeMentor />} />
              <Route path="/share-story" element={<ShareStory />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route path="/application-status" element={<ApplicationStatus />} />
              <Route path="/mentee/dashboard" element={
                <ProtectedRoute allowedRoles={['mentee']}>
                  <MenteeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/mentee/profile" element={
                <ProtectedRoute allowedRoles={['mentee']}>
                  <MenteeProfile />
                </ProtectedRoute>
              } />
              <Route path="/mentor/dashboard" element={
                <ProtectedRoute allowedRoles={['mentor']}>
                  <MentorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/mentor/profile" element={
                <ProtectedRoute allowedRoles={['mentor']}>
                  <MentorProfileEdit />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']} requireApproval={false}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SessionProvider>
    </UsersProvider>
  </AuthProvider>
</QueryClientProvider>
);

export default App;
