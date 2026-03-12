import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const getUser = async (address: string) => {
  const user = await axios.get(
    `${API_ENDPOINT}/api/auth/user/${address.toLowerCase()}`,
  );
  return user;
};

export const getUserDashboard = async (address: string) => {
  const userDashboard = await axios.get(
    `${API_ENDPOINT}/api/user/dashboard/${address.toLowerCase()}`,
  );
  return userDashboard;
};

export const getUserAssets = async (address: string) => {
  const userAssets = await axios.get(
    `${API_ENDPOINT}/api/user/portfolio/${address.toLowerCase()}`,
  );
  return userAssets;
};

export const createUser = async (address: string) => {
  const user = await axios.post(`${API_ENDPOINT}/api/auth/connect-wallet`, {
    walletAddress: address,
  });
  return user;
};

// Getting assets

export const getAssets = async () => {
  console.log("Getting assets");
  const assets = await axios.get(`${API_ENDPOINT}/api/assets`);
  return assets;
};

export const getAsset = async (id: string) => {
  const asset = await axios.get(`${API_ENDPOINT}/api/assets/${id}`);
  return asset;
};

export const getUnclaimedassets = async () => {
  const asset = await axios.get(`${API_ENDPOINT}/api/assets/unclaimed`);
  return asset;
};
export const getTokenizedassets = async () => {
  const asset = await axios.get(`${API_ENDPOINT}/api/assets/tokenized`);
  return asset;
};

export const claimAsset = async (data: {
  id: string;
  address: string;
  documents: File[];
}) => {
  const asset = await axios.post(
    `${API_ENDPOINT}/api/assets/${data.id}/claim`,
    {
      walletAddress: data.address,
      documents: data.documents,
    },
  );
  return asset;
};

export const tokenizeAsset = async (data: {
  id: string;
  address: string;
  tokenSupply: number;
  price_per_token: number;
}) => {
  const asset = await axios.post(
    `${API_ENDPOINT}/api/assets/${data.id}/tokenize`,
    {
      tokenSupply: data.tokenSupply,
      pricePerToken: data.price_per_token,
      walletAddress: data.address,
    },
  );
  return asset;
};

export const register = async (param: {
  name: string;
  description: string;
  estimatedValue: number;
  ownerWallet: string;
  category?: string;
  location?: {
    address: string;
    city: string;
    state: string;
  };
  propertyDetails?: string;
  images?: File[] | null;
}) => {
  const user = await axios.post(`${API_ENDPOINT}/api/assets/register`, param);
  return user;
};
