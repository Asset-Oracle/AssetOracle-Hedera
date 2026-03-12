import { useState } from "react";
import { MarketPlacePropAsset } from "../PropsAssets/MarketPlacePropAsset";

interface SearchBarProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

function SearchBar({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}: SearchBarProps) {
  const [filter, setFilter] = useState("");
  const [filterOpened, setFilterOpened] = useState(false);

  const categoryOptions = [
    "All Assets",
    ...new Set(MarketPlacePropAsset.map((asset) => asset.category)),
  ];
  const statusOptions = [
    "All Statuses",
    ...new Set(MarketPlacePropAsset.map((asset) => asset.status)),
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-2 text-black md:flex-row ">
        <input
          type="text"
          placeholder="Search asset by name, category, or location"
          className="border border-gray-300 rounded-md px-4 py-3 w-full md:w-[90%]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          onClick={() => {
            setFilterOpened(!filterOpened);
          }}
          className="bg-[#4f46e5] text-white px-4 py-3 rounded-md ml-2 w-full md:w-auto"
        >
          Filter
        </button>
      </div>
      {filterOpened && (
        <div className="grid grid-cols-2 mt-5 gap-5 p-4 border border-gray-300 rounded-md">
          <div>
            <h2>Category</h2>
            <select
              name="category"
              id="category"
              onChange={(e) => {
                setCategoryFilter(e.target.value);
              }}
              value={categoryFilter}
              className="border border-gray-300 rounded-md px-4 py-3 w-full md:w-[90%]"
            >
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2>Status</h2>
            <select
              name="status"
              id="status"
              onChange={(e) => {
                setStatusFilter(e.target.value);
              }}
              value={statusFilter}
              className="border border-gray-300 rounded-md px-4 py-3 w-full md:w-[90%]"
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
}
export default SearchBar;
