"use server";

import { rateLimitByKey } from "@/lib/limiter";
//import { createGroupUseCase } from "@/use-cases/groups";
import { schema } from "./validation";
import { revalidatePath } from "next/cache";
import { authenticatedAction } from "@/lib/safe-actions";
import { createGroupUseCase } from "@/use-cases/groups";
import { env } from "@/env";

export const createGroupAction = authenticatedAction
  .createServerAction()
  .input(schema)
  .handler(async ({ input: { name, description }, ctx: { user } }) => {
    await rateLimitByKey({
      key: `${user.id}-create-group`,
    });
    await createGroupUseCase(user, {
      name,
      description,
    });
    revalidatePath("/dashboard");
  });

export const getChartDataAction = authenticatedAction
  .createServerAction()
  .handler(async () => {
    const profileResp = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=${env.FINNHUB_API_KEY}`
    );
    const financeResp = await fetch(
      `https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=${env.FINNHUB_API_KEY}`
    );
    const profileJson = await profileResp.json();
    const financeJson = await financeResp.json();
    return { profile: profileJson, finance: financeJson };
  });
