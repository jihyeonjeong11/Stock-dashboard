import { MenuIcon } from "lucide-react";

export const DashboardSidebar = () => {
  return (
    <div>
      <div>
        <MenuIcon />
      </div>
      <aside className=" fixed left-0 top-0 w-[50px] h-screen bg-slate-600">
        navbar
      </aside>
    </div>
  );
};
