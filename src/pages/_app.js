import "@/styles/global.css";
import Login from "@/ui/Login";
import dynamic from "next/dynamic";

// Chỉ import WebGazerWrapper trên client-side
const WebGazerWrapper = dynamic(() => import("@/components/webGazerWrapper"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    //<WebGazerWrapper>
      <Component {...pageProps} />
    //</WebGazerWrapper>

  );
}

export default MyApp;
