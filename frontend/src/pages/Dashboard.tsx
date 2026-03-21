import { useEffect, useState } from "react";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router";
import { useGetUserInfo } from "../hooks/useUserQuery";
import MarketPlaceItemContainer from "../components/marketPlaceItemContainer";

interface DashboardProps {
  sideBarOut: boolean;
}
function Dashboard({ sideBarOut }: DashboardProps) {
  const [name, setName] = useState("");
  const { dashboardInfo, allAssets } = useGetUserInfo();
  useEffect(() => {
    const handleClick = () => {
      if (sideBarOut) {
        console.log("body clicked");
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [sideBarOut]);
  const navigate = useNavigate();
  const investments = [
    {
      name: "Total Asset Value",
      value: 0,
      PL: 0,
    },
    {
      name: "Total Investments",
      value: 0,
      PL: 0,
    },
    {
      name: "Pending Verifications",
      value: 0,
      PL: 0,
    },
    {
      name: "Verified Assets",
      value: 0,
      PL: 0,
    },
  ];
  return (
    <>
      <div className="flex">
        <MenuBar sideBarOut={sideBarOut} />
        <div className="h-full w-[100%] lg:ml-[300px] py-10">
          <div className=" text-black pt-25 flex flex-col items-start justify-center ml-10">
            <div className="flex flex-col ">
              <h1 className="font-bold !text-4xl">Welcome back, {name}</h1>
              <p>Monitor your assets, investments, and verification activity</p>
            </div>
          </div>
          <div className="text-black grid lg:grid-cols-4 md:grid-cols-2 items-center justify-center pt-10 px-10 gap-5">
            {investments.map((investment, index) => (
              <div
                key={index}
                className="border border-gray-300 grid grid-cols-2 items-center justify-center rounded-lg h-[200px] shadow-md p-4 "
              >
                <div className="flex flex-col p-4 gap-4 items-start justify-center">
                  <h3 className="text-sm">{investment.name}</h3>
                  <p className="font-bold !text-2xl">
                    {dashboardInfo ? dashboardInfo[index] : 0}
                  </p>
                  <p>{investment.PL}%</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-black px-10 py-5 mt-10 mx-10 shadow-md border-[#e2e8f0] border-2 rounded-lg">
            <h1 className="font-bold !text-2xl">My Assets</h1>
            <div className="flex gap-5 justify-start items-start mt-5">
              <button
                onClick={() => navigate("/registerasset")}
                className="bg-[#4f46e5] text-white px-4 py-2 rounded-md w-[150px]"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/marketplace")}
                className="bg-[#4f46e5] text-white px-4 py-2 rounded-md w-[150px]"
              >
                Browse Assets
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allAssets?.map((asset, index) => (
                <div
                  key={asset.id}
                  className="mb-4"
                  onClick={() => {
                    navigate(`/marketplace/${asset.id}`);
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
export default Dashboard;
