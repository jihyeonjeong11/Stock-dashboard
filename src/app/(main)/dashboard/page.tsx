import { cn } from "@/lib/utils";
import Image from "next/image";

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
import PriceCard from "./price-cards";

export default async function DashboardPage() {
  const user = await assertAuthenticated();
  const data = await getChartDataAction();

  const groups = await getGroupsByUserUseCase(user); // check db schema
  const hasGroups = groups.length > 0;

  //if(thereIsNoSelectedCompany)
  // return find some company stock!

  if (!hasGroups) {
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

  const ownedGroups = groups.filter((group) => group.userId === user.id);
  const memberGroups = groups.filter((group) => group.userId !== user.id);

  return (
    <section className="flex flex-col flex-1">
      <h1
        className={cn(
          pageTitleStyles,
          "flex justify-between items-center flex-wrap gap-4"
        )}
      >
        Section1: Company name , symbol, logo
      </h1>

      <div className={cn("space-y-8 container mx-auto py-12 min-h-screen")}>
        <h1>section2: websocket price</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <PriceCard />
        </div>

        <h1>section3: charts I can make with financial info</h1>
      </div>
    </section>
  );
}
