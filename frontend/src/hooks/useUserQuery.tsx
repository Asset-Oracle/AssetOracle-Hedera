import axios from "axios";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { AssetInfo } from "./useAssetQuery";

import {
  getUser,
  getUserDashboard,
  createUser,
  getUserAssets,
} from "../server_functions/Server_Functions";

interface UserInfo {
  email: string;
  name: string;
}

interface DashboardInfo {
  pendingVerifications: number;
  totalAssetValue: number;
  totalAssets: number;
  totalInvestments: number;
  verifiedAssets: number;
}

export const useGetUserInfo = () => {
  const [backendUser, setBackendUser] = useState<UserInfo | null>(null);
  const [dashboardInfo, setDashBoardInfo] = useState<number[] | null>(null);
  const ActiveAccount = useActiveAccount();
  const [allAssets, setAllAssets] = useState<AssetInfo[] | null>(null);

  const { data: userInfo, error: userInfoError } = useQuery({
    queryKey: ["getUser", ActiveAccount?.address],
    queryFn: () => getUser(ActiveAccount?.address!),
    enabled: !!ActiveAccount?.address,
  });

  const { data: userDashboardInfo, error: userDashboardInfoError } = useQuery({
    queryKey: ["getUserDashboard", ActiveAccount?.address],
    queryFn: () => getUserDashboard(ActiveAccount?.address!),
    enabled: !!ActiveAccount?.address,
  });

  const { data: userAssetInfo, error: userAssetInfoError } = useQuery({
    queryKey: ["getUserAssets", ActiveAccount?.address],
    queryFn: () => getUserAssets(ActiveAccount?.address!),
    enabled: !!ActiveAccount?.address,
  });

  useEffect(() => {
    if (userInfo && userInfo.data.user) {
      console.log(userInfo);
      setBackendUser({
        email: userInfo.data.user.email,
        name: userInfo.data.user.name,
      });
    }
    if (userDashboardInfo) {
      console.log(userDashboardInfo);
      const data = userDashboardInfo.data.data.stats as DashboardInfo;
      setDashBoardInfo([
        data.totalAssetValue,
        data.totalInvestments,
        data.pendingVerifications,
        data.verifiedAssets,
      ]);
    }
    if (userAssetInfo) {
      console.log(userAssetInfo);
      setAllAssets(userAssetInfo.data.data.assets);
    }
    if (userAssetInfoError) {
      console.log(userAssetInfoError);
    }
  }, [userInfo, userDashboardInfo, userAssetInfo, userAssetInfoError]);

  return {
    backendUser,
    dashboardInfo,
    allAssets,
  };
};
