
const filters = [
  { label: "All Projects", value: "all" },
  { label: "Graphic Design", value: "graphic" },
  { label: "Web Development", value: "web" },
];

export default function PortfolioFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onFilterChange(filter.value)}
          className={`rounded-full border px-5 py-3 text-sm font-semibold transition duration-300 ${
            activeFilter === filter.value
              ? "border-[#7900D8] bg-[#7900D8] text-white shadow-md shadow-purple-200"
              : "border-purple-100 bg-white text-gray-600 hover:border-[#7900D8] hover:text-[#7900D8]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
