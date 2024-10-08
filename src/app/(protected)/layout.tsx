import { ModeSelect } from "@/components/ModeSelect";
import Navbar from "@/components/ui/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
        {children}
      </div>
    </>

  );
};

export default ProtectedLayout;
