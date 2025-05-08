// Ripoff from card.tsx
// todo: make sure wrap all dashboard element with it

import * as React from "react";

import { cn } from "@/lib/utils";

const StockCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white text-gray-900 rounded-lg shadow-md p-4 w-full border border-gray-200 max-w-full",
      className
    )}
    {...props}
  />
));
StockCard.displayName = "StockCard";

export { StockCard };
