import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMangaList } from '../../service/Data.service';
import "./styles.css"
import { ThemeContext } from "../../components/toggleTheme/themeContext";
// theme color
import "../../../src/components/toggleTheme/themeStyle.css";


function CarouselFade() {
    const { theme } = useContext(ThemeContext);
    const [mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(1); // Number of items to show per page

    useEffect(() => {
        getMangas();
        const intervalId = setInterval(nextPage, 15000); // Change page every 10 seconds

        return () => {
            clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
    }, []);

    const getMangas = async () => {
        // Assuming this function fetches the manga data from an API
        const result = await getMangaList();
        setMangas(result.data);
    };

    // Calculate the index range of the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMangas = mangas.slice(indexOfFirstItem, indexOfLastItem);

    // Go to next page
    const nextPage = () => {
        setCurrentPage((prevPage) => {
            const nextPage = prevPage + 1;
            if (nextPage > Math.ceil(mangas.length / itemsPerPage)) {
                return 1; // Go back to the first page if reached the last page
            }
            return nextPage;
        });
    };

    // Go to previous page
    const previousPage = () => {
        setCurrentPage((prevPage) => {
            const nextPage = prevPage - 1;
            if (nextPage < 1) {
                return Math.ceil(mangas.length / itemsPerPage); // Go to the last page if reached the first page
            }
            return nextPage;
        });
    };

    return (
        <div className={`Manga-Container context-${theme}`}>
            <div className={`Manga-Container-title context-${theme}`}>
                <h1>Most popular</h1>
            </div>
            {currentMangas.length > 0 ? (
                currentMangas.map((manga, index) => (
                    <React.Fragment key={index}>
                        <Container fluid="xs">
                            <div className="wrapper" style={{ padding: '15px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Row>
                                        <Col xl={2} md={3} xs={5}>
                                            <Link to={`/Manga/${manga.id}`}>
                                                <Card.Img variant="top" src={manga.coverPath} className="coverI" style={{ borderRadius:'30px'}} />
                                            </Link>
                                        </Col>
                                        <Col xl={10} md={9} xs={7} style={{ padding: '10px' }}>
                                            <Link to={`/Manga/${manga.id}`} className={`card-link context-${theme}`}>
                                                <Card.Title><h1>{manga.originalTitle}</h1></Card.Title>
                                            </Link>
                                            <Card.Text>{manga.description}</Card.Text>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Container>
                    </React.Fragment>
                ))
            ) : (
                'Loading...'
            )}
            {/* Pagination controls */}
            <div className="d-flex justify-content-end" style={{ paddingRight: "80px" }}>
                <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} onClick={previousPage} >
                    <i className="fa-solid fa-chevron-left"></i>
                </Button>
                &nbsp;
                <Button
                    variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
                    onClick={nextPage}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </Button>
            </div>
        </div>
    );
}

export default CarouselFade;




