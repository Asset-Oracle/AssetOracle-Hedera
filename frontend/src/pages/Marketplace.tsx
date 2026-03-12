import { useEffect, useState } from "react";
import { MarketPlacePropAsset } from "../PropsAssets/MarketPlacePropAsset";
import MenuBar from "../components/MenuBar";
import SearchBar from "../components/SearchBar";
import MarketPlaceItemContainer from "../components/marketPlaceItemContainer";
import { useGetAssetInfo } from "../hooks/useAssetQuery";
import { useNavigate } from "react-router";

interface DashboardProps {
  sideBarOut: boolean;
}
function MarketPlace({ sideBarOut }: DashboardProps) {
  const nav = useNavigate();
  const { allAssets } = useGetAssetInfo();
  const [categoryFilter, setCategoryFilter] = useState("All Assets");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [name, setName] = useState("Space Panda");
  const [filteredAssets, setFilteredAssets] = useState(allAssets);

  const filterAssets = () => {
    let filtered = allAssets;

    if (!filtered) return;

    if (categoryFilter !== "All Assets") {
      filtered = filtered.filter((asset) => asset.category === categoryFilter);
    }

    if (statusFilter !== "All Statuses") {
      filtered = filtered.filter(
        (asset) => asset.verification_status === statusFilter,
      );
    }

    setFilteredAssets(filtered);
  };

  useEffect(() => {
    filterAssets();
  }, [categoryFilter, statusFilter]);

  useEffect(() => {
    if (allAssets) {
      console.log(allAssets);
    }
  }, [allAssets]);

  return (
    <>
      <div className="flex">
        <MenuBar sideBarOut={sideBarOut} />
        <div className="text-black h-full w-[100%] lg:ml-[300px] py-10">
          <div className=" text-black pt-25 flex flex-col items-start justify-center ml-10">
            <div className="flex flex-col ">
              <h1 className="font-bold !text-4xl">Asset Marketplace</h1>
              <p>Discover and invest in verified real-world assets</p>
            </div>
          </div>
          <div className="m-10">
            <div>
              <SearchBar
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
            <p className="mt-10"> {allAssets.length} assets Found</p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allAssets?.map((asset, index) => (
                <div
                  key={index}
                  className="mb-4"
                  onClick={() => {
                    nav(`/marketplace/${asset.id}`);
                  }}
                >
                  <MarketPlaceItemContainer {...asset} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MarketPlace;
