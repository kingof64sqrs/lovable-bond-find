import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2, RefreshCw } from "lucide-react";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const DatabaseOps = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackup = async () => {
    setIsProcessing(true);
    // Simulate backup process
    setTimeout(() => {
      alert("Database backup completed successfully!");
      setIsProcessing(false);
    }, 2000);
  };

  const handleOptimize = async () => {
    setIsProcessing(true);
    // Simulate optimization
    setTimeout(() => {
      alert("Database optimization completed!");
      setIsProcessing(false);
    }, 2000);
  };

  const handleClearCache = async () => {
    setIsProcessing(true);
    // Simulate cache clearing
    setTimeout(() => {
      alert("Cache cleared successfully!");
      setIsProcessing(false);
    }, 1000);
  };

  const handleRepair = async () => {
    if (window.confirm("Are you sure you want to repair the database? This may take a while.")) {
      setIsProcessing(true);
      // Simulate repair
      setTimeout(() => {
        alert("Database repair completed!");
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    <AdminLayout title="Database Operations">
      <div className="max-w-2xl space-y-6">
        <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Be careful with database operations. Some operations may impact system performance.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Database Maintenance</CardTitle>
                <CardDescription>Manage and maintain your database</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleBackup}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Backup Database
                </Button>

                <Button 
                  onClick={handleOptimize}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Optimize Database
                </Button>

                <Button 
                  onClick={handleClearCache}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>

                <Button 
                  onClick={handleRepair}
                  disabled={isProcessing}
                  className="w-full justify-start"
                  variant="destructive"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Repair Database
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Database Type:</span>
                  <span className="font-medium">Weaviate</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-green-600">Connected</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Total Collections:</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Backup:</span>
                  <span className="font-medium">2024-01-15 10:30 AM</span>
                </div>
              </CardContent>
            </Card>
      </div>
    </AdminLayout>
  );
};

export default DatabaseOps;
