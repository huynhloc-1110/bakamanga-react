import React, { useState, useEffect, useRef } from "react";
import ChapterButton from "./ChapterButton";

export default function ChapterInfo() {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const myScrollRef = useRef(null);
  const controlNavBar = () => {
    const scroll = myScrollRef.current;
    const rect = scroll.getBoundingClientRect();
    if (typeof window !== "undefined") {
      if (rect.y < 40) {
        setButtonStatus("chapter-button");
      } else {
        setButtonStatus(false);
      }
      if (window.scrollY > lastScrollY) {
        setButtonStatus(false);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavBar);
      return () => window.removeEventListener("scroll", controlNavBar);
    }
  }, [lastScrollY]);
  return (
    <>
      <div className="general-container info-box">
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          Sau Khi Có Được Năng Lực Bá Đạo Ở Dị Giới, Tôi Cũng Vô Đối Ở Thế Giới
          Thực: Thăng Cấp Xong Thì Cuộc Đời Cũng Thay Đổi
        </div>
        <div className="centered-element-container" ref={myScrollRef}>
          <div className={buttonStatus}>
            <ChapterButton />
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
