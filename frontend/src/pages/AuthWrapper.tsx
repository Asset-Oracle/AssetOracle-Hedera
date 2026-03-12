import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useActiveAccount,
  useConnect,
  useActiveWalletConnectionStatus,
  ConnectButton,
} from "thirdweb/react";
import { Thirdweb_Client } from "../Thirdweb/thirdweb";

interface AuthWrapperProps {
  children: React.ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps) {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const { isConnecting } = useConnect(); // true during manual connect
  const status = useActiveWalletConnectionStatus(); // "connected" | "disconnected" | "connecting"

  // ────────────────────────────────────────────────
  //  Recommended: show loading while we detect state
  // ────────────────────────────────────────────────
  if (status === "connecting" || isConnecting) {
    console.log("connecting");
  }

  // After auto-connect attempt finished:
  //   - status === "connected"  → user is signed in
  //   - status === "disconnected" → not signed in
  useEffect(() => {
    if (status === "disconnected") {
      navigate("/");
    }
  }, [status]);

  // If we reach here → status === "connected" and account should exist
  if (!account?.address) {
    console.log("no address");
  }

  return <>{children}</>;
}

export default AuthWrapper;
