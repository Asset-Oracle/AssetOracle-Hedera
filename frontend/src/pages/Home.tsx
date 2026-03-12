import "../App.css";

import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
  const supportedAssets = [
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
          className="lucide lucide-building2 w-7 h-7 text-white"
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
      name: "Real Estate",
      description: "Residential & commercial properties",
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
          className="lucide lucide-gem w-7 h-7 text-white"
        >
          <path d="M6 3h12l4 6-10 13L2 9Z"></path>
          <path d="M11 3 8 9l4 13 4-13-3-6"></path>
          <path d="M2 9h20"></path>
        </svg>
      ),
      name: "Precious Metals",
      description: "Gold, silver, platinum.",
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
          className="lucide lucide-palette w-7 h-7 text-white"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
      ),
      name: "Art & Collectibles",
      description: "Fine art and rare items.",
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
          className="lucide lucide-palette w-7 h-7 text-white"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
      ),
      name: "Luxury Assets",
      description: "High-value luxury goods.",
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
          className="lucide lucide-watch w-7 h-7 text-white"
        >
          <circle cx="12" cy="12" r="6"></circle>
          <polyline points="12 10 12 12 13 13"></polyline>
          <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"></path>
          <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"></path>
        </svg>
      ),
      name: "Commodities",
      description: "Physical commodities.",
    },
  ];

  const howItWorks = [
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
          className="lucide lucide-file-check w-8 h-8 text-white"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="m9 15 2 2 4-4"></path>
        </svg>
      ),
      name: "Asset Registration",
      description:
        "Submit your asset details, documentation, and tokenization preferences through our secure platform.",
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
          className="lucide lucide-shield w-8 h-8 text-white"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
      ),
      name: "Asset Verification",
      description:
        "Expert validators review and authenticate your asset using our comprehensive verification protocol.",
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
          className="lucide lucide-coins w-8 h-8 text-white"
        >
          <circle cx="8" cy="8" r="6"></circle>
          <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
          <path d="M7 6h1v4"></path>
          <path d="m16.71 13.88.7.71-2.82 2.82"></path>
        </svg>
      ),
      name: "Tokenization",
      description:
        "Your verified asset is tokenized on-chain with fractional ownership capabilities.",
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
          className="lucide lucide-activity w-8 h-8 text-white"
        >
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
        </svg>
      ),
      name: "Ownership & Monitoring",
      description:
        "Track performance, manage ownership, and engage with a global investor community.",
    },
  ];

  const conclusion = [
    {
      name: "100%",
      description: "Verified Assets",
    },
    {
      name: "24/7",
      description: "On-Chain Tracking",
    },
    {
      name: "Secure",
      description: "Smart Contract",
    },
  ];
  return (
    <>
      <div className=" flex flex-col items-center justify-center text-black text-center mt-30">
        <div className="px-4 py-2 bg-[#eef2ff] w-[80%] md:w-[50%] lg:w-[30%] border-2 border-[#eef2ff] rounded-full shadow-md">
          <p className=" !text-sm !text-[#483dd5]">
            Trusted RWA Infrastructure Layer
          </p>
        </div>
        <div>
          <h1 className="font-bold !text-4xl md:!text-5xl mt-10">
            Verify. Tokenize.
          </h1>
          <h1 className="font-bold !text-[#483dd5] !text-4xl md:!text-5xl mt-4">
            Own the Real World.
          </h1>
        </div>
        <div>
          <p className="mt-6 text-gray-600 max-w-3xl">
            The institutional-grade platform for bringing real-world assets
            on-chain. Transform physical assets into verified, tokenized
            investments with complete transparency.
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/registerasset");
            }}
            className="mt-6 px-6 py-3 bg-[#483dd5] text-white rounded-full shadow-md hover:bg-[#3a2f9c] transition-colors duration-300"
          >
            Register Asset
          </button>
          <button
            onClick={() => {
              navigate("/marketplace");
            }}
            className="mt-6 ml-4 px-6 py-3 border-2 border-[#483dd5] text-[#483dd5] rounded-full shadow-md hover:bg-[#eef2ff] transition-colors duration-300"
          >
            Explore Assets
          </button>
        </div>

        <div>
          <h1 className="font-bold !text-3xl mt-20">
            Supported Asset Categories
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Tokenize and trade a diverse range of real-world assets
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8 mx-10">
          {supportedAssets.map((asset, index) => (
            <div
              key={index}
              className="mt-8 p-4 bg-white rounded-lg shadow-md border border-gray-200 flex gap-5 items-center justify-between"
            >
              <div>
                <h2 className="font-bold text-lg text-center">{asset.name}</h2>
                <p className="text-gray-600 text-center mt-2">
                  {asset.description}
                </p>
              </div>
              <div className="p-4 bg-[#483dd5] flex items-center justify-center mb-4 rounded-lg">
                {asset.svg}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h1 className="font-bold !text-3xl mt-20">How It Works</h1>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Four simple steps to bring your assets on-chain
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mx-10">
          {howItWorks.map((asset, index) => (
            <div
              key={index}
              className="mt-8 p-4 bg-white rounded-lg shadow-md border border-gray-200 flex gap-5 items-center justify-between"
            >
              <div>
                <h2 className="font-bold text-lg text-center">{asset.name}</h2>
                <p className="text-gray-600 text-center mt-2">
                  {asset.description}
                </p>
              </div>
              <div className="p-4 bg-[#483dd5] flex items-center justify-center mb-4 rounded-lg">
                {asset.svg}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#141d30] mt-20 p-10 rounded-lg mb-10">
          <h1 className="font-bold !text-3xl mt-20 !text-white">
            Built on Trust & Security
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl !text-[#c9d3df]">
            Every asset on AssetOracle undergoes rigorous verification by
            certified validators. Our multi-layer authentication process ensures
            asset authenticity, ownership validation, and accurate
            valuation—backed by smart contracts and on-chain transparency.
          </p>

          <div className="grid md:grid-cols-3 mt-10">
            {conclusion.map((item, index) => (
              <div key={index} className="mt-6 p-4 rounded-lg ">
                <h2 className="font-bold text-lg !text-[#818cf8]">
                  {item.name}
                </h2>
                <p className="mt-2 !text-[#c9d3df]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
