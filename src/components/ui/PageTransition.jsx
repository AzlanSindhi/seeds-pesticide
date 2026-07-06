import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

const PageTransition = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname} className="page-enter">
      <Outlet />
    </div>
  );
};

export default PageTransition;
