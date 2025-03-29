import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GetStarted() {
  return (
    <div className="w-full flex flex-col gap-16 items-center h-[510px] justify-center">
      <div className="flex flex-col gap-4 items-center">
        <p className={cn("ty-h2 text-white-100")}>
          Candy Store NFTs are in high demand!
        </p>
        <p className={cn("ty-h2 text-white-100")}>Create yours now!</p>
      </div>

      <Button className={cn("ty-title bg-pink-50")}>Get Started Now</Button>
    </div>
  );
}
