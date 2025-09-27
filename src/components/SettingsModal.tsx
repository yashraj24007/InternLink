import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  User, 
  Database, 
  Volume2, 
  Eye, 
  Moon, 
  Sun,
  Monitor,
  Settings,
  Save
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    applicationUpdates: true,
    
    // Privacy Settings
    profileVisibility: "public" as "public" | "private" | "limited",
    showEmail: false,
    showPhone: false,
    allowDataCollection: true,
    
    // Appearance Settings
    theme: "system" as "light" | "dark" | "system",
    fontSize: [14],
    compactMode: false,
    animations: true,
    
    // Language & Region
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    
    // Performance
    autoSave: true,
    dataCompression: true,
    backgroundSync: true,
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    toast.success("Settings saved successfully!");
    onClose();
  };

  const handleReset = () => {
    toast.info("Settings reset to defaults");
    // Reset logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings & Preferences
          </DialogTitle>
          <DialogDescription>
            Customize your InternLink experience
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates and activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your applications and opportunities
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get instant notifications on your device
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via text message
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, smsNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a summary of your weekly activity
                    </p>
                  </div>
                  <Switch
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, weeklyDigest: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Control your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select value={settings.profileVisibility} onValueChange={(value) => 
                    setSettings({ ...settings, profileVisibility: value as any })
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="limited">Limited - Visible to connections only</SelectItem>
                      <SelectItem value="private">Private - Visible to you only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your email on your public profile
                    </p>
                  </div>
                  <Switch
                    checked={settings.showEmail}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, showEmail: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Phone Number</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your phone number on your profile
                    </p>
                  </div>
                  <Switch
                    checked={settings.showPhone}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, showPhone: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Appearance & Display
                </CardTitle>
                <CardDescription>
                  Customize how InternLink looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex gap-2">
                    {[
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                      { value: "system", label: "System", icon: Monitor },
                    ].map((theme) => (
                      <Button
                        key={theme.value}
                        variant={settings.theme === theme.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettings({ ...settings, theme: theme.value as any })}
                        className="flex items-center gap-2"
                      >
                        <theme.icon className="w-4 h-4" />
                        {theme.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="px-3">
                    <Slider
                      value={settings.fontSize}
                      onValueChange={(value) => setSettings({ ...settings, fontSize: value })}
                      max={20}
                      min={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Small (10px)</span>
                      <span>Current: {settings.fontSize[0]}px</span>
                      <span>Large (20px)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing and padding for more content
                    </p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, compactMode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth transitions and animations
                    </p>
                  </div>
                  <Switch
                    checked={settings.animations}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, animations: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-muted-foreground">{user?.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Role</Label>
                    <Badge variant="outline" className="w-fit">
                      {user?.role?.charAt(0).toUpperCase()}{user?.role?.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Member Since</Label>
                    <p className="text-sm text-muted-foreground">January 2024</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="mr-2">
                    Change Password
                  </Button>
                  <Button variant="outline">
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>
                  Advanced preferences and data management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-save</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save your work every 30 seconds
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoSave: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Background Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Keep your data synchronized in the background
                    </p>
                  </div>
                  <Switch
                    checked={settings.backgroundSync}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, backgroundSync: checked })
                    }
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Data Management</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm">
                      Clear Cache
                    </Button>
                    <Button variant="outline" size="sm">
                      Download Backup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};