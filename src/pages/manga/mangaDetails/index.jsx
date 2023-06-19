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
        await getMangaById(id)
            .then((result) => {
                setManga(result.data)
                console.log(result.data);
            })
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
                    <img
                      src={manga.coverPath}
                      style={{ width: "100%", height: "320px", borderRadius:"30px" }}
                    />
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={9}>
              <h1 className={`text context-${theme}`}>{[manga.originalTitle]}</h1>
              <p className={`text context-${theme}`}>{manga.description}</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
};



export default MangaDetail;