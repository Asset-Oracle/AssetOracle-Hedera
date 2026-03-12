import { useState } from "react";
import { useNavigate } from "react-router";

interface MenuBarProps {
  sideBarOut: boolean;
}

function MenuBar({ sideBarOut }: MenuBarProps) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const menuItems = [
    { name: "Dashboard" },
    { name: "MarketPlace" },
    { name: "Register Asset" },
    { name: "Settings" },
  ];
  return (
    <>
      <div
        className={`menu-bar fixed bg-white pt-25 flex flex-col items-start justify-start shadow-md h-screen border-[#e2e8f0] border-2 w-[300px] left-[-100%] lg:left-[0%] transition-all duration-300 z-40 ${sideBarOut ? "!left-[0%]" : "left-[-100%]"}`}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`!text-black font-bold text-lg flex flex-col items-center justify-center py-3 m-3 px-10`}
            onClick={() => {
              setSelected(index);
              navigate(`/${item.name.toLowerCase().replace(" ", "")}`);
            }}
          >
            <button className="w-[180px] box-content text-left !bg-white !text-black hover:!bg-[#eef2ff] !border-0 hover:text-white rounded-md px-4 py-2  focus:!bg-[#eef2ff]">
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default MenuBar;
