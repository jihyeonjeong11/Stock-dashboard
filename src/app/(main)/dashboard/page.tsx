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
import {
  getFinancial,
  getInsiderTrade,
  getNews,
  getProfile,
} from "@/api/finnhub";
import Image from "next/image";
import LineChart from "@/components/charts/line-chart";
import { Metadata } from "next";
import { Suspense } from "react";
import { Profile } from "./_sections/profile";
import PriceCard from "./price-cards";
import ScatterChart from "@/components/charts/scatter-chart";
import { ChartSkeleton, ProfileSkeleton } from "./_sections/skeletons";

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

export const metadata: Metadata = {
  title: "stock-dashboard",
  // Will fill them later or not
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { symbol } = await searchParams;
  // const [profile, news, insiderTrade, financial] = await Promise.all([
  //   //getProfile(symbol),
  //   // getNews(symbol),
  //   // getInsiderTrade(symbol),
  //   // getFinancial(symbol),
  // ]);
  const testProfile = getProfile(symbol);
  const testFinancial = getFinancial(symbol);

  //const { eps, salesPerShare } = financial.series.annual;
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
    <div className=" min-h-screen">
      <div className="container flex flex-col">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile profile={testProfile} />
        </Suspense>
      </div>
      <div className="container mt-8 grid md:grid-cols-7 gap-2 sm:grid-cols-1">
        <PriceCard symbol={symbol} key={symbol} />
      </div>

      <section className="container mt-8 flex flex-col md:flex-row gap-4">
        <Suspense fallback={<ChartSkeleton />}>
          <ScatterChart financial={testFinancial} title={"Previous Earning"} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <LineChart financial={testFinancial} title={"Financial Metrics"} />
        </Suspense>
      </section>
    </div>
  );
}

function ChartLoading() {
  return <>loaidng chart</>;
}
