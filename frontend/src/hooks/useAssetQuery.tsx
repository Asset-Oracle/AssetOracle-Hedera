import axios from "axios";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  getAssets,
  getTokenizedassets,
  getUnclaimedassets,
} from "../server_functions/Server_Functions";

interface UserInfo {
  email: string;
  name: string;
}

export interface AssetInfo {
  ai_analysis: {
    confidenceLevel: number;
    fraudLikelihood: string;
    investmentSummary: string;
    recommendation: string;
    riskScore: number;
    yieldPotential: 7.5;
  } | null;
  blockchain_data: {
    network: "Avalanche";
    document_hash: string;
  };
  category: string;
  created_at: string;
  description: string;
  estimated_value: number;
  id: string;
  images: { url: string }[];
  location: { city: string; state: string; address: string };
  name: string;
  owner_wallet: string;
  property_details: {};
  verification_status: string;
  source_platform?: string;
  token_contract_address?: string | null;
  token_id?: string | null;
  token_supply?: number | null;
  price_per_token: number | null;
  tokenized_at?: string | null;
  tokens_available?: boolean | null;
}

export const useGetAssetInfo = () => {
  const [allAssets, setAllAssets] = useState<AssetInfo[]>([]);
  //const [dashboardInfo, setDashBoardInfo] = useState<number[] | null>(null);

  const { data: assets, error: assetsError } = useQuery({
    queryKey: ["getAssets"],
    queryFn: () => getAssets(),
  });

  const { data: unclaimedassets, error: uncliamedassetsError } = useQuery({
    queryKey: ["getUncliamedAssets"],
    queryFn: () => getUnclaimedassets(),
  });
  const { data: tokenizedassets, error: tokenizedassetsError } = useQuery({
    queryKey: ["getTokenizedAssets"],
    queryFn: () => getTokenizedassets(),
  });

  useEffect(() => {
    setAllAssets([]);
    if (assets) {
      console.log("[Assets]", assets);
      setAllAssets((a) => [...a, ...assets.data.data]);
    }
    if (unclaimedassets) {
      console.log("[Assets]", unclaimedassets);
      setAllAssets((u) => [...u, ...unclaimedassets.data.data]);
    }

    if (tokenizedassets) {
      console.log("[Assets]", tokenizedassets);
      setAllAssets((t) => [...t, ...tokenizedassets.data.data]);
    }

    if (assetsError) {
      console.log(assetsError);
    }
  }, [assets, unclaimedassets, tokenizedassets, assetsError]);

  return {
    allAssets,
  };
};
