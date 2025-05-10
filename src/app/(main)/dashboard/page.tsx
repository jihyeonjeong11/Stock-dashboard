import { cn } from "@/lib/utils";
import { cardStyles, pageTitleStyles } from "@/styles/common";
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
import NewsList from "./_sections/news-list";
import { InsiderTable } from "./_sections/insider-table";

export type CompanyProfile = {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
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
  // todo: SEO
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { symbol } = await searchParams;

  const profile = getProfile(symbol);
  const financial = getFinancial(symbol);
  const news = getNews(symbol);
  const insiders = getInsiderTrade(symbol);

  if (!symbol) {
    return (
      <div
        className={cn(
          "space-y-8 container mx-auto py-24 min-h-screen max-w-2xl flex flex-col items-center"
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className={pageTitleStyles}>No Input</h1>
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
          <h2>Uh-oh, there is no company symbol to find.</h2>
        </div>
      </div>
    );
  }
  return (
    <div className=" min-h-screen">
      <div className="container flex flex-col">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile profile={profile} />
        </Suspense>
      </div>
      <section className="container mt-8">
        <div className="mt-4 grid md:grid-cols-7 gap-2 sm:grid-cols-1">
          <PriceCard symbol={symbol} key={symbol} />
        </div>
      </section>

      <section className="container mt-8 ">
        <h2 className="text-xl font-bold">Fundamentals</h2>
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <Suspense fallback={<ChartSkeleton />}>
            <ScatterChart financial={financial} title={"Previous Earning"} />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <LineChart financial={financial} title={"Financial Metrics"} />
          </Suspense>
        </div>
      </section>

      <section className="container mt-8 mb-8 md:mb-0">
        <h2 className="text-xl font-bold">News & Insider Transactions</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[400px]">
          <Suspense fallback={<ChartSkeleton />}>
            <NewsList news={news} />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <InsiderTable insiders={insiders} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
