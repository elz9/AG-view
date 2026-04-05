import Sidebar from "./sidebar/page";
import Header from "./header/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
