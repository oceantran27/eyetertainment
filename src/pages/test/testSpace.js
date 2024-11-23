import RootLayout from "@/layouts/rootLayout";
import { useRouter } from "next/router";
import { MdInfo, MdHelp } from "react-icons/md";

const TestSpace = () => {
  const router = useRouter();

  const customButtonProps = {
    top: {
      icon: <MdInfo />,
      onClick: () => console.log("About top button pressed"),
    },
    bottom: {
      icon: <MdHelp />,
      onClick: () => router.push("/"),
    },
  };

  return (
    <RootLayout buttonProps={customButtonProps}>
      <div
        className="w-full h-full bg-pink-300"
        style={{ width: "100%", height: "100%" }}
      ></div>
    </RootLayout>
  );
};

export default TestSpace;
