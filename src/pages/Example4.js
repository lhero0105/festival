import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './../index.css';
// css는 링크가 안떠서 작성해야합니다


function Example4() {
    const [isActive, setIsActive] = useState("close");

  return (
    <>
     <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {
        Array(50).fill().map((e,i)=>{
            return (
                <SwiperSlide key={i} >Slide {i+1}</SwiperSlide>
                // 반복문안에는 무조건 key값이 들어와야 합니다
            )
        })
      }
    </Swiper>
    <button onClick={()=>{setIsActive(isActive === "open" ? "close" : "open")}}>클릭</button>
    <span>{isActive}</span>
    {/* JSX 문법, 모든변수에는 삼항연산자를 사용할 수 있습니다
        토글형식으로 사용하려면 이 방법대로 하면 됩니다.
    */}
    {   
        isActive === "open" &&
        <p className={isActive === "open" ? "on" : ""} style={{display: isActive === "open" ? "block" : "none"}}>Lorem ipsum dolor sit amet.</p>
        // 실무에서 사용하는 코드
    }
    <p className={`text-center font-bold ${isActive === "open" ? "on" : ""}`} style={{display: isActive === "open" ? "block" : "none"}}>Lorem ipsum dolor sit amet.</p>
    {/* <p className={`text-center font-bold ${isActive === "open" ? "on" : ""}`} */}
    </>
  )
}


export default Example4