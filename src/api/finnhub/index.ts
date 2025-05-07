import { env } from "@/env";
import {
  FinnhubCompanyProfile,
  FinnhubFinancialMetric,
  FinnhubInsider,
  FinnhubNews,
} from "./types";

// todo: 리스폰스타입 zod까지 하면 좋지만
// todo: 에러 핸들링

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1/";

const commonHeader: Pick<RequestInit, "cache"> = {};
export async function getProfile(
  symbol: string
): Promise<FinnhubCompanyProfile | {}> {
  if (!symbol) return {};
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const resp = await fetch(
      `${FINNHUB_BASE_URL}stock/profile2?symbol=${symbol}&token=${env.FINNHUB_API_KEY}`,
      commonHeader
    );
    return await resp.json();
  } catch (error) {
    console.error("getProfile error:", error);
    return {};
  }
}

export async function getFinancial(
  symbol: string
): Promise<FinnhubFinancialMetric | {}> {
  if (!symbol) return {};

  // todo: parameter not determined yet
  try {
    const resp = await fetch(
      `${FINNHUB_BASE_URL}stock/metric?symbol=${symbol}&token=${env.FINNHUB_API_KEY}&metric=all`,
      commonHeader
    );
    return await resp.json();
  } catch (error) {
    console.error("getFinancial error:", error);
    return {};
  }
}

export async function getNews(symbol: string): Promise<FinnhubNews | {}> {
  if (!symbol) return {};

  try {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const from = formatDate(oneWeekAgo);
    const to = formatDate(today);
    const resp = await fetch(
      `${FINNHUB_BASE_URL}company-news?symbol=${symbol}&from=${from}&to=${to}&token=${env.FINNHUB_API_KEY}`,
      { cache: "no-store" }
    );
    return await resp.json();
  } catch (error) {
    console.error("getNews error:", error);
    return {};
  }
}

export async function getInsiderTrade(
  symbol: string
): Promise<FinnhubInsider | {}> {
  if (!symbol) return {};
  // todo: limit or from&to not working...
  try {
    const resp = await fetch(
      `${FINNHUB_BASE_URL}/stock/insider-transactions?symbol=${symbol}&token=${env.FINNHUB_API_KEY}`,
      { cache: "no-store" }
    );
    return await resp.json();
  } catch (error) {
    console.error("getFinancial error:", error);
    return {};
  }
}
