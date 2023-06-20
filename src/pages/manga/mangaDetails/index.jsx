import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { getMangaById } from '../../../service/Data.service';
import TrackVisibility from 'react-on-screen';
import "./styles.css";

import { ThemeContext } from "../../../components/toggleTheme/themeContext";
// theme color
import "../../../../src/components/toggleTheme/themeStyle.css";


function MangaDetail() {

    const { theme } = useContext(ThemeContext);
    const [manga, setManga] = useState([]);
    const { mangaId } = useParams();
    useEffect(() => {
        getMangaDetail(mangaId)
    }, []);


    const getMangaDetail = async (id) => {
      try {
        const result = await getMangaById(id);
        setManga(result.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setManga(null);
        }
      }
    };

    return (
      <section className="banner" id="home">
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={3}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__zoomIn" : ""
                    }
                  >
                    {manga ? (
                    <img
                      src={manga.coverPath}
                      style={{ width: "100%", height: "320px", borderRadius:"30px" }}
                      alt="Manga Cover"
                    />
                  ) : (
                    <p>Cover not found.</p>
                  )}
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={9}>
              {manga ? (
                <>
                  <h1 className={`text context-${theme}`}>{[manga.originalTitle]}</h1>
                  <p className={`text context-${theme}`}>{manga.description}</p>
                </>
                ) : (
                  <p>Manga not found.</p>
                )}
            </Col>
          </Row>
        </Container>
      </section>
    );
};



export default MangaDetail;