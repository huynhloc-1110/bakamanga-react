import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import MangasList from "../../components/mangaList";
import "./styles.css";
import CarouselFade from "../../components/carousel";
import { getMangas, getTrendingMangas } from "../../service/api.manga";

export default function Home() {
  const banner = process.env.PUBLIC_URL + "/img/banner/banner.png";
  const sortOptions = [
    "LatestManga",
    "LatestChapter",
    "MostViewDaily",
    "MostFollow",
    "BestRating",
    "NewToYou",
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [mangas, setMangas] = useState([]);
  const [carouselMangas, setCarouselMangas] = useState([]);

  useEffect(() => {
    document.title = "3K Manga";
    loadCarouselMangas();
  }, []);

  useEffect(() => {
    loadMangas(sortOption);
  }, [sortOption]);

  const loadMangas = async (sortOption) => {
    try {
      const result = await getMangas({ sortOption });
      setMangas(result.data.itemList);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMangas([]);
      }
    }
  };

  const loadCarouselMangas = async () => {
    try {
      const result = await getTrendingMangas();
      setCarouselMangas(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCarouselMangas([]);
      }
    }
  };

  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <>
      <div className="home-header">
        <Container fluid>
          <Row>
            <Col xs={12} md={8} xl={9} style={{ paddingTop: "30px" }}>
              <span className="tagline">
                Welcome to the captivating world of manga!
              </span>
              <p className="tagline-p ">
                Immerse yourself in an extraordinary assortment of manga.
                Action, adventure, fantasy, mystery, romance, and more—thousands
                of manga volumes for every fan!!
              </p>
            </Col>
            <Col xs={12} md={4} xl={3}>
              <div>
                <Image className="deco-image" src={banner} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <CarouselFade mangas={carouselMangas} />
      <div className="general-container">
        <div className="sort-option-container">
          {sortOptions.map((option, index) => (
            <Button
              key={index}
              variant={sortOption === option ? "dark" : "light"}
              onClick={() => setSortOption(option)}
            >
              {toLabel(option)}
            </Button>
          ))}
        </div>
        <div>
          <MangasList link={`/Manga?sortOption=${sortOption}`} data={mangas} />
        </div>
      </div>
    </>
  );
}
