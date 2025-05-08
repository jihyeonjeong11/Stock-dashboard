export interface FinnhubCompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

export interface FinnhubFinancialMetric {
  metric: Record<string, number | string>;
  metricType: string;
  series: {
    annual: Record<string, { period: string; v: number }[]>;
    quarterly: Record<string, { period: string; v: number }[]>;
  };
  symbol: string;
}

export interface FinnhubNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export type FinnhubNewsArray = FinnhubNews[];

export interface FinnhubInsider {
  change: number;
  currency: string;
  filingDate: string;
  id: string;
  isDerivative: boolean;
  name: string;
  share: number;
  source: string;
  symbol: string;
  transactionCode: string;
  transactionDate: string;
  transactionPrice: number;
}

export type FinnhubInsiderArray = FinnhubInsider[];

export interface FinnhubInsiderResp {
  data: FinnhubInsiderArray;
  symbol: string;
}
