import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import PageTransition from "../../components/ui/PageTransition";

const AdminLayout = () => {
  return (
    <div className="fb-admin-shell text-white min-vh-100">
      <AdminNav />
      <main className="flex-grow-1">
        <PageTransition />
      </main>
    </div>
  );
};

export default AdminLayout;
