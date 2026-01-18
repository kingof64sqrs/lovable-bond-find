import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  Plus,
  CheckCircle,
  Heart,
  CreditCard,
  Flag,
  Activity,
  FileText,
  Mail,
  DollarSign,
  BarChart3,
  Phone,
  Send,
  Database,
  ChevronDown,
  Image,
  Layout,
  Droplet,
  ToggleLeft,
  Menu,
  IdCard,
  Globe,
  Code,
  Lock,
  Share2,
  Smartphone
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const siteSettingsSubMenu = [
  { title: "Update Favicon & Logo", url: "/admin/settings/favicon-logo", icon: Image },
  { title: "Update Home Page Banner", url: "/admin/settings/home-banner", icon: Layout },
  { title: "Update Watermark", url: "/admin/settings/watermark", icon: Droplet },
  { title: "Enable / Disable Fields", url: "/admin/settings/fields", icon: ToggleLeft },
  { title: "Enable / Disable Menu Item", url: "/admin/settings/menu-items", icon: Menu },
  { title: "Update Profile Id", url: "/admin/settings/profile-id", icon: IdCard },
  { title: "Update Email Settings", url: "/admin/settings/email", icon: Mail },
  { title: "Update Basic Site Update", url: "/admin/settings/basic-update", icon: Globe },
  { title: "Update Basic Site Config", url: "/admin/settings/basic-config", icon: Settings },
  { title: "Update/Add Analytics Code", url: "/admin/settings/analytics", icon: Code },
  { title: "Change Password", url: "/admin/settings/password", icon: Lock },
  { title: "Update Social Media Link", url: "/admin/settings/social-media", icon: Share2 },
  { title: "Android App Banner Setting", url: "/admin/settings/app-banner", icon: Smartphone },
];

const addDetailsSubMenu = [
  { title: "Add Religion", url: "/admin/add-details/religion", icon: Plus, count: 6 },
  { title: "Add Caste", url: "/admin/add-details/caste", icon: Plus, count: 850 },
  { title: "Add Sub Caste", url: "/admin/add-details/sub-caste", icon: Plus, count: 15 },
  { title: "Add Gotra", url: "/admin/add-details/gotra", icon: Plus, count: 18 },
  { title: "Add Country", url: "/admin/add-details/country", icon: Plus, count: 230 },
  { title: "Add State", url: "/admin/add-details/state", icon: Plus, count: 1 },
  { title: "Add City", url: "/admin/add-details/city", icon: Plus, count: 35362 },
  { title: "Add Occupation", url: "/admin/add-details/occupation", icon: Plus, count: 78 },
  { title: "Add Education", url: "/admin/add-details/education", icon: Plus, count: 77 },
  { title: "Add Mother Tongue", url: "/admin/add-details/mother-tongue", icon: Plus, count: 52 },
  { title: "Add Star", url: "/admin/add-details/star", icon: Plus, count: 28 },
  { title: "Add Rasi(Moonsign)", url: "/admin/add-details/rasi", icon: Plus, count: 12 },
  { title: "Add Annual Income", url: "/admin/add-details/annual-income", icon: Plus, count: 16 },
  { title: "Add Dosh", url: "/admin/add-details/dosh", icon: Plus, count: 11 },
];

const menuItems = [
  { title: "My Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "First Form Data", url: "/admin/form-data", icon: FileText },
  { title: "Members", url: "/admin/members", icon: Users },
  { title: "Match Making", url: "/admin/match-making", icon: Heart },
  { title: "Membership Plan", url: "/admin/membership-plan", icon: CreditCard },
  { title: "Approvals", url: "/admin/approvals", icon: CheckCircle },
  { title: "Advertise", url: "/admin/advertise", icon: Flag },
  { title: "User Activity", url: "/admin/user-activity", icon: Activity },
  { title: "Content Management", url: "/admin/content", icon: FileText },
  { title: "Email Templates", url: "/admin/email-templates", icon: Mail },
  { title: "Payment Option", url: "/admin/payment-option", icon: DollarSign },
  { title: "Member Report", url: "/admin/member-report", icon: BarChart3 },
  { title: "Contact Us Data", url: "/admin/contact-data", icon: Phone },
  { title: "Send Email", url: "/admin/send-email", icon: Send },
  { title: "Database Operation", url: "/admin/database-ops", icon: Database },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [addDetailsOpen, setAddDetailsOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === "collapsed";
  const isSettingsActive = location.pathname.startsWith('/admin/settings');
  const isAddDetailsActive = location.pathname.startsWith('/admin/add-details');

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Control Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(0, 2).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Site Settings with Sub-menu */}
              <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className={isSettingsActive ? "bg-accent" : ""}>
                      <Settings className="h-4 w-4" />
                      {!isCollapsed && (
                        <>
                          <span>Site Settings</span>
                          <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${settingsOpen ? "rotate-180" : ""}`} />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {siteSettingsSubMenu.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                            <Link to={subItem.url} className="flex items-center gap-2">
                              <subItem.icon className="h-3 w-3" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Add New Details with Sub-menu */}
              <Collapsible open={addDetailsOpen} onOpenChange={setAddDetailsOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className={isAddDetailsActive ? "bg-accent" : ""}>
                      <Plus className="h-4 w-4" />
                      {!isCollapsed && (
                        <>
                          <span>Add New Details</span>
                          <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${addDetailsOpen ? "rotate-180" : ""}`} />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {addDetailsSubMenu.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                            <Link to={subItem.url} className="flex items-center gap-2">
                              <subItem.icon className="h-3 w-3" />
                              <span className="flex-1">{subItem.title}</span>
                              {subItem.count !== undefined && (
                                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                  {subItem.count}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {menuItems.slice(2).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
