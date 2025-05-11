"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-actions";
import { setSession } from "@/lib/session";
import { signInUseCase } from "@/use-cases/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
    const user = await signInUseCase(input.email, input.password);
    const { token, expiresAt } = await setSession(user.id);
    const allCookies = await cookies();
    await allCookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });
    await redirect(afterLoginUrl);
  });
