import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-y-14 w-full justify-between">
        <div>
          <Badge className="text-sm md:text-base">
            Realtime Stock Dashboard app
          </Badge>
          <h1 className="text-5xl md:text-7xl max-w-3xl mt-10 leading-[1.2] font-semibold">
            Realtime Stock Dashboard app
          </h1>
          <p className="mt-5 text-gray-500 text-lg max-w-[600px]">
            Our online dashboard delivers up-to-the-second financial data,
            charts and insider activity all in one place. Make smarter decisions
            by Analyze fundamentals with live updates in one page. Start
            investing with clarity and confidence now.
          </p>
          <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 mt-10">
            <Button asChild>
              <Link href={"/sign-in"}>Create an Account</Link>
            </Button>
          </div>
        </div>
        <Image
          className="rounded-xl w-[400px] h-[400px]"
          width="200"
          height="200"
          src="/group.jpeg"
          alt="hero image"
        />
      </div>
    </Container>
  );
}
