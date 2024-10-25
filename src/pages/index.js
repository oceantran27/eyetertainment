'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { NextSeo } from "next-seo";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useWebGazer } from '../context/webgazerContext';

// import MiniCard from "@/components/card/Mini";
// import MangaCard from "@/components/card/NormalCard";
import SlideCard from '@/components/card/SlideCard';
// import NormalCard from "@/components/card/NormalCard";

const TutorialOverlay = ({ onDismiss }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onDismiss} // Dismiss on click
    >
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold">Welcome to the App!</h2>
        <p className="mt-4">This is a tutorial overlay. Click anywhere or look down to dismiss it.</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
};


export default function Home() {

  const [dummyData, setDummyData] = useState([
    {
      id: 0,
      title: "ABC",
      author_name: "Author",
      cover: 1,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      viewcount: 1
    }, 
    {
      id: 1,
      title: "DEF",
      author_name: "Author",
      cover: 3,
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      viewcount: 2
    }
  ])

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);


  const { webgazer, isWebgazerReady } = useWebGazer();
  const [isOverlayVisible, setOverlayVisible] = useState(true);
  const [lookingDownTimer, setLookingDownTimer] = useState(null);
  

  const handleDismissOverlay = () => {
    setOverlayVisible(false);
    if (lookingDownTimer) {
      clearTimeout(lookingDownTimer); // Clear the timer if the overlay is dismissed
    }
  };

  useEffect(() => {
    console.log("??????????j??")
    console.log(webgazer)
    console.log(isWebgazerReady)
    if (!webgazer || !isWebgazerReady) return; // Ensure webgazer is defined before setting listener
    console.log("?????AAAAAAAAAA?")

    const gazeListener = (data, elapsedTime) => {
      if (data) {
        const video = document.getElementById('webgazerVideoFeed'); // Get the video element
        if (video && video.videoWidth > 0 && video.videoHeight > 0) { // Check video dimensions
            // ... your gaze handling logic
            console.log("video is fine?")
        } else {
            console.error('Video dimensions are invalid:', video.videoWidth, video.videoHeight);
        }
        var y = data.y;
        // Check if the user's gaze is at the bottom of the screen
        const isLookingDown = y > window.innerHeight * 0.75; // Adjust threshold as needed
        console.log(y)

        if (isLookingDown) {
          if (!lookingDownTimer) {
            // Start a timer to dismiss overlay if looking down for 2 seconds
            setLookingDownTimer(setTimeout(() => {
              handleDismissOverlay();
            }, 500));
          }
        } else {
          // Clear the timer if the user looks up
          if (lookingDownTimer) {
            clearTimeout(lookingDownTimer);
            setLookingDownTimer(null);
          }
        }
      }
    };

    const startWebgazer = async () => { // Wrap in an async function
      console.log("webgazer started in index.js")
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay 500ms
      webgazer.setGazeListener(gazeListener).begin();
  };
  startWebgazer()
    // console.log("webgazer started in index.js")
    // // Set the gaze listener
    // webgazer.setGazeListener(gazeListener).begin();

    return () => {
      // Clear gaze listener on component unmount
      console.log("webgazer clear")
      webgazer.clearGazeListener();
      if (lookingDownTimer) {
        clearTimeout(lookingDownTimer);
      }
    };
  }, [webgazer, isWebgazerReady, lookingDownTimer]); // Add webgazer to the dependency array


  useEffect(() => {
    setLoading(true);
    axios.get(`/api/bookly/gethomepage/`)
      .then(res => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  

  return (
    <>
      <NextSeo title={"Home"} />
      <div className="flex flex-col items-center justify-center px-10 -mt-8 lg:-mt-0 mb-24">
        <div className="w-full">
            <div className="relative mt-12 px-6 mx-auto">
              {/* CAROUSEL */}
              
              {/* <Swiper
                //ref={swiperRef}
                slidesPerView={1}
                spaceBetween={10}
                modules={[Pagination]}
                className="latest"
                pagination={{
                  clickable: true,
                  enabled: true
                }}
              >
                {loading ? Array.from(Array(5).keys()).map((d) => (
                  <>
                    <SwiperSlide key={d}>
                      <SkeletonComponent />
                    </SwiperSlide>
                  </>
                )) : 
                //data.sportlight && data.sportlight.map(item => (
                  dummyData.map(item => (
              
                  <SwiperSlide key={item.id}>
                    <SlideCard item={item}
                      id = {item.id} 
                      title = {item.title}
                      description = {item.description}
                      cover = {`http://127.0.0.1:8000${item.cover}`}
                    />
                  </SwiperSlide>
                ))}

                </Swiper> */}


                {isOverlayVisible && <TutorialOverlay onDismiss={handleDismissOverlay} />}
    
            </div>
        </div>
      </div>
    </>
  )
}

function SkeletonComponent() {
  return (
      <div>
          <SkeletonTheme baseColor="#202020" highlightColor="#232323">
              <div className="flex flex-col">
              <Skeleton className="w-[300px] h-[260px]" />
              <Skeleton className="w-[300px] h-[17px] mt-4" />
              <Skeleton width={"120px"} className="h-[12px] mt-1" />
              </div>
          </SkeletonTheme>
      </div>
  );
}

