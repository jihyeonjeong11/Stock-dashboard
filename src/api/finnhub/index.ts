import { env } from "@/env";
import {
  FinnhubCompanyProfile,
  FinnhubFinancialMetric,
  FinnhubInsiderArray,
  FinnhubNewsArray,
} from "./types";

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

export async function getNews(symbol: string): Promise<FinnhubNewsArray | []> {
  if (!symbol) return [];

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
    return [];
  }
}

export async function getInsiderTrade(
  symbol: string
): Promise<FinnhubInsiderArray | []> {
  if (!symbol) return [];

  try {
    const resp = await fetch(
      `${FINNHUB_BASE_URL}/stock/insider-transactions?symbol=${symbol}&token=${env.FINNHUB_API_KEY}`,
      { cache: "no-store" }
    );
    return await resp.json();
  } catch (error) {
    console.error("getFinancial error:", error);
    return [];
  }
}
