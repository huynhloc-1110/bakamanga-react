import React, { useEffect, useState, useRef, useContext } from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import { getMangas } from "../../service/Data.service";
import MangasList from "../../components/mangaList";
import banner from "../../img/banner/banner.gif";
import "./styles.css";
import CarouselFade from "../../components/carousel";
import soundEffect from "../../img/sfx/sound-effect.mp3";
import { ThemeContext } from "../../components/toggleTheme/themeContext";
// theme color
import "../../../src/components/toggleTheme/themeStyle.css";

function Home() {
  const { theme } = useContext(ThemeContext);

  const audioRef = useRef(null);

  const [activeButton, setActiveButton] = useState("LatestManga");

  const handleButtonClick = (sortOption) => {
    setActiveButton(sortOption);
  };

  const handleSoundClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    callAPI(activeButton, 1, 8);
  }, [activeButton]);

  const callAPI = async (sortOption, page, pageSize) => {
    let res = await getMangas(sortOption, page, pageSize).then((result) => {
      setMangas(result.data);
    });

    console.log("MANGAs", res);
  };

  return (
    <div>
      <div className="home-header">
        <Container>
          <Row>
            <Col xs={12} md={6} xl={9}>
              <div style={{ paddingTop: "30px" }}>
                <span className={`tagline context-${theme}`}>
                  Welcome to 3kManga!
                </span>
                <p className={`tagline-p context-${theme}`}>
                  Immerse yourself in an extraordinary assortment of manga.
                  Action, adventure, fantasy, mystery, romance, and
                  more—thousands of manga volumes for every fan!!
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div>
                <Image
                  style={{ width: "60%", height: "50%" }}
                  src={banner}
                  onClick={handleSoundClick}
                />
                <audio ref={audioRef} src={soundEffect} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <CarouselFade />
      <div className={`Manga-Container context-${theme}`}>
        <div
          style={{ display: "flex", paddingLeft: "20px", paddingRight: "20px" }}
        >
          <Button
            className="mb-4 w-100"
            variant={activeButton === "LatestManga" ? "dark" : "light"}
            onClick={() => handleButtonClick("LatestManga")}
          >
            Latest Manga
          </Button>
          &nbsp;
          <Button
            className="mb-4 w-100"
            variant={activeButton === "LatestChapter" ? "dark" : "light"}
            onClick={() => handleButtonClick("LatestChapter")}
          >
            Latest Chapter
          </Button>
          &nbsp;
          <Button
            className="mb-4 w-100"
            variant={activeButton === "MostView" ? "dark" : "light"}
            onClick={() => handleButtonClick("MostView")}
          >
            Most View Manga
          </Button>
          &nbsp;
          <Button
            className="mb-4 w-100"
            variant={activeButton === "MostRate" ? "dark" : "light"}
            onClick={() => handleButtonClick("MostRate")}
          >
            Most Rate Manga
          </Button>
        </div>
        <div>
          {activeButton === "LatestManga" && (
            <MangasList
              header="Latest Updated Manga"
              link="/Manga?sortOption=LatestManga"
              data={mangas}
            />
          )}
          {activeButton === "LatestChapter" && (
            <MangasList
              header="Latest Updated Chapter"
              link="/Manga?sortOption=LatestChapter"
              data={mangas}
            />
          )}
          {/* {activeButton === 'MostView' && <MangasList header="Most View Manga" link="/Manga?sortOption=MostView" data={mangas} />}
                    {activeButton === 'MostRate' && <MangasList header="Most Rate Manga" link="/Manga?sortOption=MostRate" data={mangas} />} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
