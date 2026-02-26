"use client";

import { BasicUser } from "app-types/user";
import { useEffect, useMemo } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

export function SWRConfigProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: BasicUser;
}) {
  const config = useMemo<SWRConfiguration>(() => {
    return {
      focusThrottleInterval: 30000,
      dedupingInterval: 2000,
      errorRetryCount: 1,
      fallback: {
        "/api/user/details": user,
      },
    };
  }, [user]);

  useEffect(() => {
    console.log(
      "%c███████╗ █████╗ ██╗     ██╗  ██╗   ██╗\n██╔════╝██╔══██╗██║     ██║  ╚██╗ ██╔╝\n███████╗███████║██║     ██║   ╚████╔╝ \n╚════██║██╔══██║██║     ██║    ╚██╔╝  \n███████║██║  ██║███████╗███████╗██║   \n╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝   \n\n%c🎓 Sally Academy - AI-Powered Research Platform\nhttps://github.com/Osama-Qonaibe/sally-academy",
      "color: #6366f1; font-weight: bold; font-family: monospace; font-size: 14px; text-shadow: 0 0 10px #6366f1;",
      "color: #888; font-size: 12px;",
    );
  }, []);
  return <SWRConfig value={config}>{children}</SWRConfig>;
}
