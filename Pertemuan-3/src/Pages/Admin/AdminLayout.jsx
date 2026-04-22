import Sidebar from "@/Pages/Admin/Components/Sidebar";
import Header from "@/Pages/Admin/Components/Header";
import Footer from "@/Pages/Admin/Components/Footer";

const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title="Mahasiswa" onLogout={onLogout} />
        <main className="flex-1 p-6 overflow-x-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
