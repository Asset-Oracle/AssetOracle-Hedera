import type { AssetInfo } from "../hooks/useAssetQuery";

function MarketPlaceItemContainer(props: AssetInfo) {
  return (
    <>
      <div className="overflow-hidden group rounded-lg shadow-md hover:border-[#4f46e5] hover:border-1">
        <img
          src={
            props.images && props.images.length > 0
              ? props.images[0].url
              : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
          }
          alt={props?.name}
          className="w-full h-full rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="p-4 bg-white rounded-b-lg">
          <div className="flex justify-between items-start mt-4">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">{props?.category}</p>
              <h2 className="text-lg font-bold mt-2">{props?.name}</h2>
            </div>
            <p
              className={`text-sm text-gray-600 shadow-md ${props?.verification_status === "VERIFIED" ? "bg-[#d1fae5] text-[#339678] border border-[#339678] px-2 py-1 rounded-[5px]" : props?.verification_status === "PENDING" ? "bg-[#f1f5f9] text-[#788290]  border border-[#788290] px-2 py-1 rounded-[5px]" : "bg-[#fef3c7] text-[#be6923] border border-[#be6923] px-2 py-1 rounded-[5px]"}`}
            >
              {props?.verification_status}
            </p>
          </div>

          <p className="text-sm text-gray-600">{`${props?.location.address} , ${props?.location.city}, ${props?.location.state}`}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">{props?.estimated_value}</p>
            <p className="text-sm text-gray-600">{"Available"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default MarketPlaceItemContainer;
