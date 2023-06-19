
import React, { useEffect, useState,useContext } from 'react';
import { Col, Row, Card, Container, Button, FormSelect } from 'react-bootstrap';
import { getMangas, totalItems } from '../../../service/Data.service';
import { Link, useSearchParams } from 'react-router-dom';
import "./styles.css";
import Pagination from '../../../components/pagination';
import { ThemeContext } from "../../../components/toggleTheme/themeContext";
// theme color
import "../../../../src/components/toggleTheme/themeStyle.css";



function LatestManga() {

    const { theme } = useContext(ThemeContext);
    const [mangas, setMangas] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalMangas, setTotalMangas] = useState(0);
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [sortOption, setOption] = useState(searchParams.get('sortOption'));
    const pageSize = 4;

    useEffect(() => {
        setPage(parseInt(searchParams.get('page') || 1));
        setOption(searchParams.get('sortOption'));
    }, [searchParams]);

    useEffect(() => {
        callAPI();
    }, [sortOption, page])

    const callAPI = async () => {
        let res = await getMangas(sortOption, page, pageSize)
            .then((result) => {
                setMangas(result.data)
            })

        console.log("MANGAs", res)
    }



    //Pagination
    useEffect(() => {
        totalItems().then((response) => {
            setTotalMangas(response.data);
        });
    }, [page, pageSize]);

    const totalPages = Math.ceil(totalMangas / pageSize);


    return (
        <div>
            <div style={{ paddingTop: "50px" }}>
                <Row>
                    <Col>
                        <div className={`Manga-Container-title context-${theme}`}>
                            <span>{sortOption === 'LatestManga' ? 'Latest Manga' : 'Latest Chapter'}</span>
                        </div>
                    </Col>
                    <Col>
                        <FormSelect
                            className='mb-4 w-100'
                            value={sortOption}
                            onChange={(e) => setSearchParams({ sortOption: e.target.value, page: '1' })}
                        >
                            <option value='LatestManga'>Latest Manga</option>
                            <option value='LatestChapter'>Latest Chapter</option>
                        </FormSelect>
                    </Col>
                </Row>
                {mangas ? (
                    mangas.map((manga, index) => (
                        <React.Fragment key={index}>
                            <Container>
                                <div className="wrapper">
                                    <Card className={`card-container context-${theme}`} style={{ position: "relative" }}>
                                        <Row>
                                            <Col xl={2} md={3} xs={5}>
                                                <Link to={`/Manga/${manga.id}`}>
                                                <Card.Img variant="top" src={manga.coverPath} className='coverI' />
                                                </Link>
                                            </Col>
                                            <Col xl={10} md={9} xs={7} style={{ padding: "20px" }}>
                                            <Link to={`/Manga/${manga.id}`} className={`card-link context-${theme}`}>
                                                <Card.Title><h3>{manga.originalTitle}</h3></Card.Title>
                                            </Link>
                                            <Card.Text className={`text context-${theme}`}>{manga.description}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Container>
                        </React.Fragment>
                    ))
                ) : (
                    'Loading...'
                )}
                &nbsp;
                <div className="d-flex justify-content-center">
                    <Pagination page={page} totalPages={totalPages} setSearchParams={setSearchParams} sortOption={sortOption} />
                </div>
            </div>
        </div>
    );
}

export default LatestManga;



