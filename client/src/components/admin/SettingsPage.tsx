import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, Shield, Palette, Globe, Camera } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Profile Information</h3>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-[var(--primary)] text-2xl">AD</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-dark)] transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h4 className="mb-1">Profile Picture</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  PNG, JPG up to 5MB
                </p>
                <Button variant="outline" size="sm">Upload New</Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" className="bg-input-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" className="bg-input-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="admin@nubank.com" className="bg-input-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" className="bg-input-background" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell us about yourself..." className="bg-input-background" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)]">
                Save Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Shield className="h-6 w-6 text-[var(--primary)]" />
              </div>
              <div>
                <h3>Security Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your password and security options</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4>Change Password</h4>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="bg-input-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="bg-input-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="bg-input-background" />
                </div>
                <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)]">
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="font-medium mb-1">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4>Active Sessions</h4>
                <div className="space-y-3">
                  {[
                    { device: "Chrome on Windows", location: "New York, US", active: true },
                    { device: "Safari on MacBook", location: "London, UK", active: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                      <div>
                        <p className="font-medium mb-1">{session.device}</p>
                        <p className="text-sm text-muted-foreground">{session.location}</p>
                      </div>
                      {session.active ? (
                        <span className="text-sm text-[var(--success)]">Active now</span>
                      ) : (
                        <Button variant="outline" size="sm">Revoke</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Bell className="h-6 w-6 text-[var(--primary)]" />
              </div>
              <div>
                <h3>Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Choose what notifications you want to receive</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "Email Notifications", description: "Receive email updates about your account" },
                { title: "Push Notifications", description: "Get push notifications on your devices" },
                { title: "Transaction Alerts", description: "Get notified of all transactions" },
                { title: "Marketing Emails", description: "Receive news and promotional content" },
                { title: "Security Alerts", description: "Important security notifications" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="font-medium mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={index !== 3} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Palette className="h-6 w-6 text-[var(--primary)]" />
              </div>
              <div>
                <h3>Appearance Settings</h3>
                <p className="text-sm text-muted-foreground">Customize the look and feel of your dashboard</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="mb-4">Theme Mode</h4>
                <div className="grid grid-cols-3 gap-4">
                  {["Light", "Dark", "System"].map((theme) => (
                    <button
                      key={theme}
                      className="p-4 border-2 border-border rounded-xl hover:border-primary transition-colors text-center"
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-4">Language</h4>
                <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <select className="flex-1 bg-transparent outline-none">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
