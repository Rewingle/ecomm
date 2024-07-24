import { Poppins } from "next/font/google";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categories } from "./types";
import { Card } from "@/components/ui/card";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div>
      <div className="bg-red-300 w-full h-32">

      </div>
      <br />
      <Card className="w-full h-12">
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex justify-between w-full px-4">
            {categories.map((category) => (
              <span>{category.name}</span>
            ))}
          </div>
        </div>
      </Card>
      <LoginButton>
        <Button>LOGIN</Button>
      </LoginButton>

    </div>
  );
}
