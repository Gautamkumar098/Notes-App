// import { FileText, Plus } from "lucide-react";

// const Navbar = ({ onCreateClick }) => {
//   return (
//     <nav className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <FileText size={28} className="text-blue-600" />

//           <h1 className="text-xl font-bold text-gray-800">Notes App</h1>
//         </div>

//         <button
//           onClick={onCreateClick}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           <Plus size={18} />
//           Create Note
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import { FileText, LogOut, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onCreateClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been logged out");
    } catch {
      toast.error("Unable to log out. Please try again.");
    }
  };

  return (
    <nav className="border-b border-white/10 bg-slate-950 px-4 py-4 text-white sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-cyan-400/10 p-2">
            <FileText size={22} className="text-cyan-300" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Notes App</h1>
            <p className="hidden text-xs text-slate-400 sm:block">
              Your ideas, organized.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden text-sm text-slate-300 md:block">
            Hi, {user?.name?.split(" ")[0] || "there"}
          </span>
          <button
            onClick={onCreateClick}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:px-4"
          >
            <Plus size={18} />
            <span>New note</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            title="Log out"
            aria-label="Log out"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
