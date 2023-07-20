import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import ChapterButton from "./ChapterButton";

export default function ChapterInfo() {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavBar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setButtonStatus(false);
      } else {
        setButtonStatus("chapter-button");
      }
      setLastScrollY(window.scrollY);

      if (window.scrollY === 0) {
        setButtonStatus(false);
      }
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
      <div
        className="general-container"
        style={{
          textAlign: "center",
          width: "700px",
          height: "auto",
          margin: "0 auto",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          Sau Khi Có Được Năng Lực Bá Đạo Ở Dị Giới, Tôi Cũng Vô Đối Ở Thế Giới
          Thực: Thăng Cấp Xong Thì Cuộc Đời Cũng Thay Đổi
        </div>
        <div className="centered-element-container">
          <div className={buttonStatus}>
            <ChapterButton />
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
