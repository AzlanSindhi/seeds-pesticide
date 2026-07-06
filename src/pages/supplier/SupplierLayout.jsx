import { Outlet } from "react-router-dom";
import SupplierNav from "./SupplierNav";
import PageTransition from "../../components/ui/PageTransition";
import ToastHost from "../../components/ui/Toast";

const SupplierLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <SupplierNav />
      <main className="flex-grow-1 fb-supplier-shell">
        <PageTransition />
      </main>
      <ToastHost />
    </div>
  );
};

export default SupplierLayout;
