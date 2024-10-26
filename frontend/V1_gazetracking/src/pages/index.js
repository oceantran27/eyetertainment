// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper";
// import { NextSeo } from "next-seo";

// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import { useWebGazer } from "../context/webGazerContext";
// import SlideCard from "@/components/card/SlideCard";

// const TutorialOverlay = ({ onDismiss }) => {
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={onDismiss} // Dismiss on click
//     >
//       <div className="bg-white p-8 rounded shadow-lg text-center">
//         <h2 className="text-xl font-bold">Welcome to the App!</h2>
//         <p className="mt-4">
//           This is a tutorial overlay. Click anywhere or look down to dismiss it.
//         </p>
//         <button
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={onDismiss}
//         >
//           Dismiss
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function Home() {
//   const [dummyData, setDummyData] = useState([
//     {
//       id: 0,
//       title: "ABC",
//       author_name: "Author",
//       cover: 1,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
//       viewcount: 1,
//     },
//     {
//       id: 1,
//       title: "DEF",
//       author_name: "Author",
//       cover: 3,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
//       viewcount: 2,
//     },
//   ]);

//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);

//   const [isOverlayVisible, setOverlayVisible] = useState(true);
//   const [webGazer, setWebGazer] = useState(null);
//   const [isWebGazerReady, setIsWebGazerReady] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const initWebGazer = async () => {
//       if (!webGazer) {
//         const webGazerModule = await import("webGazer");
//         const instance = webGazerModule.default;

//         await instance.setRegression("ridge").begin();
//         setWebGazer(instance);
//         setIsWebGazerReady(true);
//         console.log("WebGazer has started.");
//       }
//     };

//     if (isMounted) {
//       try {
//         initWebGazer().then(() => {
//           webGazer
//             .setGazeListener(function (data, elapsedTime) {
//               if (data == null) {
//                 return;
//               }
//               var xprediction = data.x; //these x coordinates are relative to the viewport
//               var yprediction = data.y; //these y coordinates are relative to the viewport
//               console(xprediction, yprediction);
//               console.log(elapsedTime); //elapsed time is based on time since begin was called
//             })
//             .begin();
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     return () => {
//       // if (webGazer) {
//       //   webGazer.end();
//       //   console.log("WebGazer has ended.");
//       // }
//       // isMounted = false;
//     };
//   }, [webGazer]);

//   // Listener cho ánh nhìn xuống để đóng overlay
//   // useEffect(() => {
//   //   if (isWebGazerReady && webGazer && isOverlayVisible) {
//   //     const gazeListener = (data) => {
//   //       if (data) {
//   //         const { y } = data;
//   //         const screenHeight = window.innerHeight;
//   //         const threshold = screenHeight * 0.75;

//   //         if (y > threshold) {
//   //           handleDismissOverlay();
//   //         }
//   //       }
//   //     };

//   //     webGazer.setGazeListener(gazeListener).begin();

//   //     return () => {
//   //       if (webGazer) {
//   //         webGazer.removeGazeListener(gazeListener);
//   //       }
//   //     };
//   //   }
//   // }, [isWebGazerReady, webGazer, isOverlayVisible]);

//   const handleDismissOverlay = () => {
//     setOverlayVisible(false);
//   };

//   return (
//     <>
//       <NextSeo title={"Home"} />
//       <div className="flex flex-col items-center justify-center px-10 -mt-8 lg:-mt-0 mb-24">
//         <div className="w-full">
//           <div className="relative mt-12 px-6 mx-auto">
//             {isOverlayVisible && (
//               <TutorialOverlay onDismiss={handleDismissOverlay} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function SkeletonComponent() {
//   return (
//     <div>
//       <SkeletonTheme baseColor="#202020" highlightColor="#232323">
//         <div className="flex flex-col">
//           <Skeleton className="w-[300px] h-[260px]" />
//           <Skeleton className="w-[300px] h-[17px] mt-4" />
//           <Skeleton width={"120px"} className="h-[12px] mt-1" />
//         </div>
//       </SkeletonTheme>
//     </div>
//   );
// }

// pages/index.js
import { useEffect, useState } from "react";
import Popup from "../components/popup";
import dynamic from "next/dynamic";

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  useEffect(() => {
    // Khởi động WebGazer
    const startWebGazer = async () => {
      const webgazer = await import("webGazer");

      // Thiết lập mô hình hồi quy
      webgazer
        .setRegression("weightedRidge") // Hoặc 'threadedRidge' nếu bạn muốn thử nghiệm
        .begin() // Bắt đầu theo dõi
        .showVideoPreview(true) // Hiện video preview
        .showPredictionPoints(true); // Hiện điểm dự đoán

      // Thiết lập callback cho gaze data
      webgazer.setGazeListener((data, elapsedTime) => {
        if (data) {
          const event = new Event("gaze");
          event.data = data;
          window.dispatchEvent(event);
        }
      });
    };

    startWebGazer();

    return () => {
      if (window.webgazer) {
        window.webgazer.stop(); // Dừng WebGazer khi component bị unmount
      }
    };
  }, []);

  return (
    <div>
      <h1>WebGazer.js Tracking</h1>
      {isPopupVisible && <Popup onClose={() => setPopupVisible(false)} />}
      <p>Look around to see the gaze tracking in action.</p>
      <style jsx>{`
        h1 {
          text-align: center;
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
};

export default Home;
