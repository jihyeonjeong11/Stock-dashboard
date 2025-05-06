"server only";
import { env } from "@/env";

// todo: 리스폰스타입 zod까지 하면 좋지만
// todo: 에러 핸들링

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1/stock/";

export async function getProfile(symbol: string) {
  if (!symbol) {
    throw new Error("No input");
  }

  const resp = await fetch(
    `${FINNHUB_BASE_URL}profile2?symbol=${symbol}&token=${env.FINNHUB_API_KEY}`
  );
  const json = await resp.json();
  return json;
}

export async function getFinancial(symbol: string) {
  //`https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=${env.FINNHUB_API_KEY}`

  if (!symbol) {
    throw new Error("No input");
  }

  // todo: parameter not determined yet
  const resp = await fetch(
    `${FINNHUB_BASE_URL}metric?symbol=${symbol}&token=${env.FINNHUB_API_KEY}&metric=all`
  );
  const json = await resp.json();

  return json;
}
