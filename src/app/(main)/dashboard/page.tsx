import { cn } from "@/lib/utils";

import { cardStyles, pageTitleStyles } from "@/styles/common";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { btnIconStyles, btnStyles } from "@/styles/icons";
import { Search } from "lucide-react";
import { assertAuthenticated } from "@/lib/session";
import { getGroupsByUserUseCase } from "@/use-cases/groups";
import { CreateGroupButton } from "./create-group-button";
import { GroupCard } from "./group-card";
import { PageHeader } from "@/components/page-header";
import { getChartDataAction } from "./actions";
import PriceCard from "./price-cards";
import { getFinancial, getProfile } from "@/api/finnhub";
import Image from "next/image";

const sampleProfile = {
  country: "US",
  currency: "USD",
  estimateCurrency: "USD",
  exchange: "NASDAQ NMS - GLOBAL MARKET",
  finnhubIndustry: "Technology",
  ipo: "1986-03-13",
  logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MSFT.png",
  marketCapitalization: 3241852.683535778,
  name: "Microsoft Corp",
  phone: "14258828080",
  shareOutstanding: 7433.98,
  ticker: "MSFT",
  weburl: "https://www.microsoft.com/en-in/",
};

export type CompanyProfile = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string; // ISO date string format
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const symbol = (await searchParams).symbol;

  // const [profile] = await Promise.all([
  //   getProfile(symbol),
  //   //getFinancial(symbol),
  // ]);

  //if(thereIsNoSelectedCompany)
  // return find some company stock!
  // 데모 페이지를 보여줄 수도, 그냥 입력하라고 할 수도 있음.
  if (!symbol) {
    return (
      <div
        className={cn(
          "space-y-8 container mx-auto py-24 min-h-screen max-w-2xl flex flex-col items-center"
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className={pageTitleStyles}>Your Groups</h1>
        </div>

        <div
          className={cn(
            cardStyles,
            "flex flex-col items-center gap-6 p-12 w-full"
          )}
        >
          <Image
            src="/empty-state/no-data.svg"
            width="200"
            height="200"
            alt="no image placeholder image"
          ></Image>
          <h2>Uh-oh, you don't own any groups</h2>

          <div className="flex gap-4">
            <CreateGroupButton />

            <Button asChild className={btnStyles} variant={"secondary"}>
              <Link href={`/browse`}>
                <Search className={btnIconStyles} /> Browse Groups
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 ">
      <div className="container flex gap-2 pt-8">
        <Image
          src={sampleProfile.logo}
          width={30}
          height={30}
          alt="company logo"
        />
        <h1
          className={cn(
            pageTitleStyles,
            "flex justify-between items-center flex-wrap gap-4"
          )}
        >
          {sampleProfile.name}
        </h1>
      </div>

      <div className={cn("space-y-8 container mx-auto py-12")}>
        <div className="grid md:grid-cols-7 gap-2 sm:grid-cols-1">
          <PriceCard />
        </div>

        <h1>section3: charts I can make with financial info</h1>
      </div>
    </div>
  );
}
