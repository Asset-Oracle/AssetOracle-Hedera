import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import { useMutation } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { register } from "../server_functions/Server_Functions";

interface DashboardProps {
  sideBarOut: boolean;
}
function RegisterAsset({ sideBarOut }: DashboardProps) {
  const activeAccount = useActiveAccount();

  const itemList = [
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
          className="lucide lucide-building2 w-8 h-8 mb-3 text-indigo-600 !text-black"
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
      name: "Real Estates",
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
          className="lucide lucide-gem w-8 h-8 mb-3 text-slate-600 !text-black"
        >
          <path d="M6 3h12l4 6-10 13L2 9Z"></path>
          <path d="M11 3 8 9l4 13 4-13-3-6"></path>
          <path d="M2 9h20"></path>
        </svg>
      ),
      name: "Precious Metals",
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
          className="lucide lucide-palette w-8 h-8 mb-3 text-slate-600 !text-black"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
      ),

      name: "Art & Collectibles",
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
          className="lucide lucide-watch w-8 h-8 mb-3 text-slate-600 !text-black"
        >
          <circle cx="12" cy="12" r="6"></circle>
          <polyline points="12 10 12 12 13 13"></polyline>
          <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"></path>
          <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"></path>
        </svg>
      ),

      name: "Luxury Assets",
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
          className="lucide lucide-wheat w-8 h-8 mb-3 text-slate-600 !text-black"
        >
          <path d="M2 22 16 8"></path>
          <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path>
          <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path>
          <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path>
          <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"></path>
          <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path>
          <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path>
          <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path>
        </svg>
      ),

      name: "Commodities",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationState, setLocationState] = useState("");
  const [valuation, setValuation] = useState("");

  const [assetImage, setAssetImage] = useState<File[] | null>(null);
  const [documentation, setDocumentation] = useState<File[] | null>(null);
  const [popup, setPopup] = useState(false);

  const page1 = () => {
    return (
      <>
        <div>
          <h2 className="text-xl font-semibold">Select Asset Category</h2>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {itemList.map((item, index) => (
            <button
              key={index}
              className={`!bg-white !text-black flex flex-col items-start !p-4 rounded-md w-full px-4 py-3 cursor-pointer flex items-center gap-5 transition ${selectedCategory === index ? "!border-[#4a40da] !border-2 !bg-[#eef2ff]" : "!border !border-[#e2e8f0]"}`}
              onClick={() => {
                setSelectedCategory(index);
                setCurrentCategory(item.name);
              }}
            >
              {item.svg}
              <h2 className="text-lg font-medium">{item.name}</h2>
            </button>
          ))}
        </div>
      </>
    );
  };

  const page2 = () => {
    return (
      <>
        <div>
          <h2 className="text-xl !text-black font-semibold">Asset Details</h2>
        </div>
        <div className="mt-5 ">
          <div className="mb-5">
            <p>Asset Name *</p>
            <input
              type="text"
              placeholder="Enter asset name"
              onChange={(e) => {
                setAssetName(e.target.value);
              }}
              value={assetName}
              className="border !border-gray-500 rounded-md w-full"
            />
          </div>
          <div className="mb-5">
            <p>Description </p>
            <textarea
              maxLength={200}
              className="border p-3 w-full rounded-md !border-gray-500"
              placeholder="Detailed description of the asset"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-5">
            <p>Location / Storage {"(Address)"}</p>
            <input
              type="text"
              placeholder="address"
              className="border !border-gray-500 rounded-md w-full"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <p>Location / Storage {"(City)"}</p>
            <input
              type="text"
              placeholder="address"
              className="border !border-gray-500 rounded-md w-full"
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <p>Location / Storage {"(State)"}</p>
            <input
              type="text"
              placeholder="address"
              className="border !border-gray-500 rounded-md w-full"
              value={locationState}
              onChange={(e) => setLocationState(e.target.value)}
            />
          </div>

          <div>
            <p>Valuation (USD) *</p>
            <input
              type="text"
              placeholder="0.00"
              className="border !border-gray-500 rounded-md w-full"
              value={valuation}
              onChange={(e) => setValuation(e.target.value)}
            />
          </div>
          <div>
            <p>Asset Image</p>
            <label className="border border-gray-500 rounded-md w-full px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
              <span className="text-gray-400">Upload Image</span>

              <span className="text-sm text-indigo-600">Browse</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setAssetImage(
                    e.target.files ? Array.from(e.target.files) : null,
                  );
                }}
              />
            </label>
          </div>
          <div className="mt-5">
            {assetImage && assetImage.length > 0 && (
              <p className="text-sm">Selected Image: {assetImage[0].name}</p>
            )}
          </div>
        </div>
      </>
    );
  };

  const page3 = () => {
    return (
      <>
        <div>
          <h2 className="text-xl !text-black font-semibold">
            Upload Documentation
          </h2>
        </div>
        <div className="mt-5 ">
          <div className="mb-5">
            <p>
              Upload ownership proof, valuation reports, certifications, and
              legal documentation
            </p>
            <div className="mt-5">
              <label className="border border-[#e2e8f0] rounded-md w-full px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition">
                <span className="text-gray-400">Upload Document</span>

                <span className="text-sm text-indigo-600">Browse</span>

                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    setDocumentation(files ? Array.from(files) : null);
                  }}
                />
              </label>
            </div>
            <div className="mt-5">
              {documentation &&
                documentation.map((file, index) => (
                  <p key={index} className="text-sm">
                    {file.name}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const page4 = () => {
    return (
      <>
        <div>
          <h2 className="text-xl !text-black font-semibold">
            Tokenization Configuration
          </h2>
        </div>
        <div className="grid grid-cols-2">
          <div className="mt-5 flex flex-col gap-5">
            <div>
              <h2 className="text-sm">Category</h2>
              <h2 className="font-bold !text-black">{currentCategory}</h2>
            </div>
            <div>
              <h2 className="text-sm">Valuation</h2>
              <h2 className="font-bold !text-black">{valuation}</h2>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <div>
              <h2 className="text-sm">Asset Name</h2>
              <h2 className="font-bold !text-black">{assetName}</h2>
            </div>
            <div>
              <h2 className="text-sm">Location</h2>
              <h2 className="font-bold !text-black">{`${locationAddress}, ${locationCity}, ${locationState}`}</h2>
            </div>
          </div>
        </div>
        <div className="p-3 bg-[#eef2ff] rounded-lg mt-5 border-[#4f46e5] border-2">
          <p className="text-sm max-w-[500px]">
            By submitting this asset, you confirm that all information provided
            is accurate and you have the legal right to tokenize this asset.
            Your asset will undergo verification before being listed on the
            marketplace.
          </p>
        </div>
      </>
    );
  };

  const transformLocation = useCallback(() => {
    return {
      address: locationAddress,
      city: locationCity,
      state: locationState,
    };
  }, [locationAddress, locationCity, locationState]);

  const { data, mutate } = useMutation({
    mutationKey: [
      "register",
      {
        assetName,
        description,
        valuation,
        ownerWallet: activeAccount?.address,
      },
    ],
    mutationFn: () =>
      register({
        name: assetName,
        description,
        estimatedValue: Number(valuation),
        ownerWallet: activeAccount?.address!,
        category: currentCategory,
        location: transformLocation(),
        images: assetImage,
      }),
  });

  const pages = useRef([page1, page2, page3, page4]);
  const [currentPage, setCurrentPage] = useState(0);
  const handleNext = () => {
    if (currentPage === 0 && selectedCategory === null) {
      alert("Please select an asset category to proceed.");
      return;
    } else if (
      (currentPage === 1 && assetName.trim() === "") ||
      (currentPage === 1 && valuation.trim() === "")
    ) {
      alert("Asset name and valuation are required to proceed.");
      return;
    } else if (currentPage === 2 && !documentation) {
      alert("Documentation is required to proceed.");
      return;
    }

    if (currentPage < pages.current.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      mutate();
      console.log("Mutating");
    }
  };
  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (assetName.length > 0) {
      console.log(assetName);
    }
  }, [assetName]);
  useEffect(() => {
    if (data) {
      alert("Asset Listed");
    }
  }, [data]);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return page1();
      case 1:
        return page2();
      case 2:
        return page3();
      case 3:
        return page4();
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex">
        <MenuBar sideBarOut={sideBarOut} />
        <div className="h-full w-[100%] lg:ml-[300px] py-10">
          <div className=" text-black pt-25 flex flex-col items-start justify-center ml-10">
            <div className="flex flex-col ">
              <h1 className="font-bold !text-4xl">Register New Asset</h1>
              <p>Follow the steps to tokenize your real-world asset</p>
            </div>
          </div>
          <div className=" text-[#495567] px-10 py-5 mt-10 mx-10 shadow-md border-[#e2e8f0] border-2 rounded-lg">
            {renderPage()}
            <div className="flex items-center justify-between mt-5">
              <button
                className="!bg-white !border-[#e2e8f0] !border-2 !text-black !font-semibold py-2 px-4 rounded-lg"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className=" !text-white !font-semibold py-2 px-4 rounded-lg"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterAsset;
