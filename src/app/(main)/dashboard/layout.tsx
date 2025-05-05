import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="pl-[75px]">{children}</div>;
}
