export interface MarketPlacePropAssetType {
  id: number;
  src: string;
  name: string;
  location: string;
  category: string;
  price: string;
  status: string;
  avalability: string;
}

export const MarketPlacePropAsset = [
  {
    id: 1,
    src: "https://base44.app/api/apps/699472eeb2ccd05e2d1201b0/files/public/699472eeb2ccd05e2d1201b0/a154952bd_photo_2026-02-09_21-04-40.jpg",
    name: "Luxury Villa in Beverly Hills",
    location: "Beverly Hills, CA",
    category: "Real Estate",
    price: "$5,000,000",
    status: "Pending",
    avalability: "Available",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    name: "Home in Califonia",
    location: "Califonia CA",
    category: "Real Estate",
    price: "$8,000,000",
    status: "Verified",
    avalability: "Available",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    name: "Luxury Manhattan Penthouse",
    location: "Manhattan, NY",
    category: "Real Estate",
    price: "$18,000,000",
    status: "Under Review",
    avalability: "Available",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200",
    name: "Gold Bullion Reserve - 100kg",
    location: "Zurich, Switzerland",
    category: "Precious Metals",
    price: "$6,000,000",
    status: "Verified",
    avalability: "Available",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
    name: "Vintage 1963 Ferrari 250 GTO",
    location: "Private Garage, Monaco",
    category: "Luxury Assets",
    price: "$45,000,000",
    status: "Pending",
    avalability: "Available",
  },
];
