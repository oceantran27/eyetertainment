import { pauseWebGazer, resumeWebGazer } from "@/components/webGazerWrapper";
import Login from "@/ui/Login";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    resumeWebGazer();
    return () => pauseWebGazer();
  }, []);

  return (
    // <div className="flex items-center justify-center">
    //   <h1 className="text-center">HOMEPAGE</h1>
    // </div>
    <Login />
  );
}
