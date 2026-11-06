// import { Search, X } from "lucide-react";

// const SearchBar = ({ search, setSearch }) => {
//   return (
//     <div className="relative w-full max-w-xl">
//       {/* Search Icon */}
//       <Search
//         size={20}
//         className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//       />

//       {/* Input */}
//       <input
//         type="text"
//         placeholder="Search notes by title or content..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       {/* Clear Search */}
//       {search && (
//         <button
//           onClick={() => setSearch("")}
//           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
//           aria-label="Clear search"
//         >
//           <X size={18} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default SearchBar;




import { Search, X } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full max-w-xl">
      {/* Search Icon */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl bg-white text-sm sm:text-base outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      {/* Clear Search */}
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
          aria-label="Clear search"
          title="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
