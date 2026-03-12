import { useState } from "react";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router";
import { useGetUserInfo } from "../hooks/useUserQuery";
import MarketPlaceItemContainer from "../components/marketPlaceItemContainer";

interface DashboardProps {
  sideBarOut: boolean;
}
function Dashboard({ sideBarOut }: DashboardProps) {
  const [name, setName] = useState("Space Panda");
  const { dashboardInfo, allAssets } = useGetUserInfo();
  const navigate = useNavigate();
  const investments = [
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-building2 w-6 h-6 text-white"
        >
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
          <path d="M10 6h4"></path>
          <path d="M10 10h4"></path>
          <path d="M10 14h4"></path>
          <path d="M10 18h4"></path>
        </svg>
      ),
      name: "Total Asset Value",
      value: 0,
      PL: 0,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-trending-up w-6 h-6 text-white"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      ),
      name: "Total Investments",
      value: 0,
      PL: 0,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-shield w-6 h-6 text-white"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
      ),
      name: "Pending Verifications",
      value: 0,
      PL: 0,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-coins w-6 h-6 text-white"
        >
          <circle cx="8" cy="8" r="6"></circle>
          <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
          <path d="M7 6h1v4"></path>
          <path d="m16.71 13.88.7.71-2.82 2.82"></path>
        </svg>
      ),
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
                  <p className="font-bold !text-3xl">
                    ${dashboardInfo ? dashboardInfo[index] : 0}
                  </p>
                  <p>{investment.PL}%</p>
                </div>

                <div className="text-black grid lg:grid-cols-4 md:grid-cols-2 items-center justify-center pt-10 px-10 gap-5 flex items-center justify-center">
                  {investment.svg}
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
