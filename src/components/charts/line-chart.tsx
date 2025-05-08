"use client";

import { use, useEffect, useRef } from "react";
import * as echarts from "echarts";
import useMediaQuery from "@/hooks/use-media-query";
import { FinnhubFinancialMetric } from "@/api/finnhub/types";
import { StockCard } from "../ui/stock-card";

export default function LineChart({
  title,
  financial,
}: {
  title: string;
  financial: Promise<FinnhubFinancialMetric | {}>;
}) {
  const data = use(financial);
  const graphRef = useRef<HTMLDivElement>(null);
  const graphInstance = useRef<echarts.ECharts | null>(null);
  const { width } = useMediaQuery();
  // re-render when props change
  useEffect(() => {
    if (
      !data ||
      !("series" in data) ||
      !data.series?.annual?.salesPerShare?.length
    ) {
      return;
    }

    const chart = echarts.init(graphRef.current);
    let option = {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "item",
        formatter: (params: { value: number; period: string }) => {
          return `revenuePerShare: ${params.value.toFixed(2)}`;
        },
      },
      xAxis: {
        type: "category",
        data: data.series.annual.salesPerShare.map((d) => d.period),
      },
      yAxis: {
        type: "value",
        name: "EPS",
      },
      series: [
        {
          data: data.series.annual.salesPerShare.map((d) => d.v),
          type: "line",
        },
      ],
    };

    chart.setOption(option);
    graphInstance.current = chart;
  }, []);

  useEffect(() => {
    graphInstance.current?.resize();
  }, [width]);

  return (
    <StockCard>
      <div
        className="flex items-center space-x-9"
        ref={graphRef}
        id="line"
        style={{ width: "100%", height: 250, maxWidth: 650 }}
      ></div>
    </StockCard>
  );
}
