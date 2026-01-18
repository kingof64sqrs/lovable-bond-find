import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import Search from "./pages/Search";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Matches from "./pages/Matches";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminVerifications from "./pages/admin/Verifications";
import FormData from "./pages/admin/FormData";
import SiteSettings from "./pages/admin/SiteSettings";
import FaviconLogo from "./pages/admin/settings/FaviconLogo";
import HomeBanner from "./pages/admin/settings/HomeBanner";
import Watermark from "./pages/admin/settings/Watermark";
import Fields from "./pages/admin/settings/Fields";
import MenuItems from "./pages/admin/settings/MenuItems";
import ProfileId from "./pages/admin/settings/ProfileId";
import EmailSettingsPage from "./pages/admin/settings/EmailSettings";
import BasicUpdate from "./pages/admin/settings/BasicUpdate";
import BasicConfig from "./pages/admin/settings/BasicConfig";
import Analytics from "./pages/admin/settings/Analytics";
import Password from "./pages/admin/settings/Password";
import SocialMedia from "./pages/admin/settings/SocialMedia";
import AppBanner from "./pages/admin/settings/AppBanner";
import AddDetails from "./pages/admin/AddDetails";
import Members from "./pages/admin/Members";
import MatchMaking from "./pages/admin/MatchMaking";
import MembershipPlan from "./pages/admin/MembershipPlan";
import Approvals from "./pages/admin/Approvals";
import Advertise from "./pages/admin/Advertise";
import UserActivity from "./pages/admin/UserActivity";
import ContentManagement from "./pages/admin/Content";
import EmailTemplates from "./pages/admin/EmailTemplates";
import PaymentOption from "./pages/admin/PaymentOption";
import MemberReport from "./pages/admin/MemberReport";
import ContactData from "./pages/admin/ContactData";
import SendEmail from "./pages/admin/SendEmail";
import DatabaseOps from "./pages/admin/DatabaseOps";

// Reference Data Imports
import Religion from "./pages/admin/Religion";
import Caste from "./pages/admin/Caste";
import Gotra from "./pages/admin/Gotra";
import SubCaste from "./pages/admin/SubCaste";
import Country from "./pages/admin/Country";
import State from "./pages/admin/State";
import City from "./pages/admin/City";
import Occupation from "./pages/admin/Occupation";
import Education from "./pages/admin/Education";
import MotherTongue from "./pages/admin/MotherTongue";
import Star from "./pages/admin/Star";
import Rasi from "./pages/admin/Rasi";
import Dosh from "./pages/admin/Dosh";
import AnnualIncome from "./pages/admin/AnnualIncome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Register />
                  </ProtectedRoute>
                } 
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile/:id" element={<Profile />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-profile" 
                element={
                  <ProtectedRoute>
                    <CreateProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile/edit" 
                element={
                  <ProtectedRoute>
                    <ProfileEdit />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/matches" 
                element={
                  <ProtectedRoute>
                    <Matches />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes - Should also check for admin role in production */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute>
                    <AdminUsers />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/verifications" 
                element={
                  <ProtectedRoute>
                    <AdminVerifications />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/form-data" 
                element={
                  <ProtectedRoute>
                    <FormData />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedRoute>
                    <SiteSettings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/favicon-logo" 
                element={
                  <ProtectedRoute>
                    <FaviconLogo />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/home-banner" 
                element={
                  <ProtectedRoute>
                    <HomeBanner />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/watermark" 
                element={
                  <ProtectedRoute>
                    <Watermark />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/fields" 
                element={
                  <ProtectedRoute>
                    <Fields />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/menu-items" 
                element={
                  <ProtectedRoute>
                    <MenuItems />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/profile-id" 
                element={
                  <ProtectedRoute>
                    <ProfileId />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/email" 
                element={
                  <ProtectedRoute>
                    <EmailSettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/basic-update" 
                element={
                  <ProtectedRoute>
                    <BasicUpdate />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/basic-config" 
                element={
                  <ProtectedRoute>
                    <BasicConfig />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/password" 
                element={
                  <ProtectedRoute>
                    <Password />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/social-media" 
                element={
                  <ProtectedRoute>
                    <SocialMedia />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings/app-banner" 
                element={
                  <ProtectedRoute>
                    <AppBanner />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details" 
                element={
                  <ProtectedRoute>
                    <AddDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/religion" 
                element={
                  <ProtectedRoute>
                    <Religion />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/caste" 
                element={
                  <ProtectedRoute>
                    <Caste />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/sub-caste" 
                element={
                  <ProtectedRoute>
                    <SubCaste />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/gotra" 
                element={
                  <ProtectedRoute>
                    <Gotra />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/country" 
                element={
                  <ProtectedRoute>
                    <Country />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/state" 
                element={
                  <ProtectedRoute>
                    <State />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/city" 
                element={
                  <ProtectedRoute>
                    <City />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/occupation" 
                element={
                  <ProtectedRoute>
                    <Occupation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/education" 
                element={
                  <ProtectedRoute>
                    <Education />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/mother-tongue" 
                element={
                  <ProtectedRoute>
                    <MotherTongue />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/star" 
                element={
                  <ProtectedRoute>
                    <Star />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/rasi" 
                element={
                  <ProtectedRoute>
                    <Rasi />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/annual-income" 
                element={
                  <ProtectedRoute>
                    <AnnualIncome />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/add-details/dosh" 
                element={
                  <ProtectedRoute>
                    <Dosh />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/members" 
                element={
                  <ProtectedRoute>
                    <Members />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/match-making" 
                element={
                  <ProtectedRoute>
                    <MatchMaking />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/membership-plan" 
                element={
                  <ProtectedRoute>
                    <MembershipPlan />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/approvals" 
                element={
                  <ProtectedRoute>
                    <Approvals />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/advertise" 
                element={
                  <ProtectedRoute>
                    <Advertise />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/user-activity" 
                element={
                  <ProtectedRoute>
                    <UserActivity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/content" 
                element={
                  <ProtectedRoute>
                    <ContentManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/email-templates" 
                element={
                  <ProtectedRoute>
                    <EmailTemplates />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/payment-option" 
                element={
                  <ProtectedRoute>
                    <PaymentOption />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/member-report" 
                element={
                  <ProtectedRoute>
                    <MemberReport />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/contact-data" 
                element={
                  <ProtectedRoute>
                    <ContactData />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/send-email" 
                element={
                  <ProtectedRoute>
                    <SendEmail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/database-ops" 
                element={
                  <ProtectedRoute>
                    <DatabaseOps />
                  </ProtectedRoute>
                } 
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
