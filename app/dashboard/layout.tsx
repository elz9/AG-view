import Sidebar from "./sidebar/page";
import Dashboard from "@/components/dashboard/Dashboard";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 ml-[220px] p-6 bg-white">
        <Dashboard />
      </main>
    </div>
  );
}
