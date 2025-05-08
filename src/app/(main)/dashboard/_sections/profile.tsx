"use client";

import { cn } from "@/lib/utils";
import { pageTitleStyles } from "@/styles/common";
import { use } from "react";
import Image from "next/image";
import { FinnhubCompanyProfile } from "@/api/finnhub/types";

export function Profile({
  profile,
}: {
  profile: Promise<{} | FinnhubCompanyProfile>;
}) {
  const p = use(profile);

  if (!p || !("logo" in p) || !("name" in p)) return;

  return (
    <div className="flex gap-2 pt-8 items-center">
      <Image
        src={p.logo}
        width={30}
        height={20}
        className="w-auto h-full max-w-none object-cover"
        alt="company logo"
      />
      <h1
        className={cn(
          pageTitleStyles,
          "flex justify-between items-center flex-wrap gap-4"
        )}
      >
        {p.name}
      </h1>
    </div>
  );
}
