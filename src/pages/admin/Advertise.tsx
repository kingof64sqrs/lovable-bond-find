import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminSidebar from "@/components/AdminSidebar";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Advertise = () => {
  const { toast } = useToast();
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/admin/advertisements', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setAds(result.data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch advertisements', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const [newAd, setNewAd] = useState({
    title: "",
    url: "",
    startDate: "",
    endDate: "",
  });

  const handleAddAd = async () => {
    if (!newAd.title || !newAd.url) {
      toast({ title: 'Validation Error', description: 'Title and URL are required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/admin/advertisements', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAd)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Advertisement created successfully' });
        fetchAds();
        setNewAd({ title: "", url: "", startDate: "", endDate: "" });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create advertisement', variant: 'destructive' });
    }
  };

  const handleDeleteAd = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/admin/Advertisements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Advertisement deleted successfully' });
        fetchAds();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete advertisement', variant: 'destructive' });
    }
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
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                      </TableRow>
                    ) : ads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No advertisements found</TableCell>
                      </TableRow>
                    ) : ads.map((ad) => (
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
