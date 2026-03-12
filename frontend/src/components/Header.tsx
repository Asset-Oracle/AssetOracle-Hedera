import { useState } from "react";
import "../App.css";
import { useNavigate, useLocation } from "react-router";
import { ConnectButton, lightTheme } from "thirdweb/react";
import { Thirdweb_Client } from "../Thirdweb/thirdweb";
import { avalancheFuji } from "thirdweb/chains";
import AuthWrapper from "../pages/AuthWrapper";

interface HeaderProps {
  sideBarOut: boolean;
  setSideBarOut: (value: boolean) => void;
}

function Header({ sideBarOut, setSideBarOut }: HeaderProps) {
  const nav = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const myCustomTheme = lightTheme({
    colors: {
      // Main accent button background color (often used for button background when connected/disconnected)
      accentButtonBg: "#6366f1", // indigo-500 example – change to your brand color
      accentButtonText: "#ffffff", // text on accent button bg
      primaryButtonBg: "#4f46e5", // emerald-500 – connected button bg
      primaryButtonText: "#ffffff",
      secondaryButtonBg: "#374151", // gray-700
      secondaryButtonText: "#e5e7eb",
      modalBg: "#ffffff", // background of connect modal
      borderColor: "#4b5563",

      // ... many more options (check full list below)
    },
  });
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex items-center justify-between p-2 w-full text-black">
        <div className="flex gap-1 items-center !text-sm md:!text-2xl">
          <div
            className="block lg:hidden p-3 hover:bg-gray-200 rounded-md cursor-pointer"
            onClick={() => {
              setSideBarOut(!sideBarOut);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu w-5 h-5"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </div>
          <div className="bg-[#4f46e5] p-2 rounded-md mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shield w-6 h-6 text-white"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
          </div>

          <h2
            onClick={() => {
              nav("/");
            }}
            className="font-bold"
          >
            AssetOracle
          </h2>
        </div>

        <div className="flex gap-5">
          <ConnectButton
            client={Thirdweb_Client}
            chain={avalancheFuji}
            theme={myCustomTheme}
          />
          <>
            <AuthWrapper
              children={
                <>
                  {location.pathname === "/" ? (
                    <button
                      onClick={() => {
                        nav("/dashboard");
                      }}
                    >
                      Launch App
                    </button>
                  ) : null}
                </>
              }
            ></AuthWrapper>
            <div className="flex space-x-1 text-sm md:text-base"></div>
          </>
        </div>
      </div>
    </header>
  );
}
export default Header;
