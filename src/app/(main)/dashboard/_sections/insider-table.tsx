import { FinnhubInsiderResp } from "@/api/finnhub/types";
import { StockCard } from "@/components/ui/stock-card";
import { use } from "react";

const SELL_CODES = ["S", "D", "F", "U", "C"];

export function InsiderTable({
  insiders,
}: {
  insiders: Promise<FinnhubInsiderResp | {}>;
}) {
  const i = use(insiders);

  if (!i || !("data" in i) || !i.data) return;

  // FILEDAT, TICKER, BUY/SELL, Shares, amount
  // fillingDate, symbol, transactionCode, share, share * transactionPrice

  return (
    <StockCard title="Insider Transactions">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">FileDate</th>
              <th className="px-3 py-2 border">Ticker</th>
              <th className="px-3 py-2 border">Buy/Sell</th>
              <th className="px-3 py-2 border">Price</th>
              <th className="px-3 py-2 border">Change</th>
              <th className="px-3 py-2 border">Shares</th>
            </tr>
          </thead>
          <tbody>
            {i.data.slice(0, 10).map((tx) => (
              <tr key={tx.id} className="even:bg-white odd:bg-gray-50">
                <td className="px-3 py-2 border">{tx.filingDate}</td>
                <td className="px-3 py-2 border">{tx.symbol}</td>
                <td className="px-3 py-2 border">
                  {SELL_CODES.includes(tx.transactionCode) ? "Sell" : "Buy"}
                </td>
                <td className="px-3 py-2 border">
                  ${tx.transactionPrice?.toFixed(2)}
                </td>
                <td
                  className={`px-3 py-2 border font-semibold ${
                    tx.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.change}
                </td>
                <td className="px-3 py-2 border">
                  {tx.share.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StockCard>
  );
}
