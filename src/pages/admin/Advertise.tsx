import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminSidebar from "@/components/AdminSidebar";
import { Trash2 } from "lucide-react";

const Advertise = () => {
  const [ads, setAds] = useState([
    { id: 1, title: "Premium Membership", url: "http://example.com", startDate: "2024-01-01", endDate: "2024-02-01" },
    { id: 2, title: "Success Stories", url: "http://example.com", startDate: "2024-01-15", endDate: "2024-03-15" },
  ]);

  const [newAd, setNewAd] = useState({
    title: "",
    url: "",
    startDate: "",
    endDate: "",
  });

  const handleAddAd = () => {
    if (newAd.title && newAd.url) {
      setAds([...ads, { id: ads.length + 1, ...newAd }]);
      setNewAd({ title: "", url: "", startDate: "", endDate: "" });
    }
  };

  const handleDeleteAd = (id: number) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Advertise</h1>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Advertisement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Ad Title"
                    value={newAd.title}
                    onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                  />
                  <Input
                    placeholder="URL"
                    value={newAd.url}
                    onChange={(e) => setNewAd({ ...newAd, url: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={newAd.startDate}
                    onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
                  />
                  <Input
                    type="date"
                    value={newAd.endDate}
                    onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddAd} className="w-full">Add Advertisement</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Advertisements</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ads.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell>{ad.url}</TableCell>
                        <TableCell>{ad.startDate}</TableCell>
                        <TableCell>{ad.endDate}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteAd(ad.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Advertise;
