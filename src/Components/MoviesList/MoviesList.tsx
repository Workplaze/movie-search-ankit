import React from "react";
import "./style.css";
import { Card, Container, Row, Col } from "react-bootstrap";

type Movie = {
  Title: string;
  Poster: string;
};

type MovieListProps = {
  movies: Movie[];
};

const MoviesList: React.FC<MovieListProps> = ({ movies }) => {
  console.log(movies);
  return (
    <Container>
      <Row>
        {movies.map((movie, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <Card style={{ width: "100%", margin: 10 }}>
              <Card.Img
                variant="top"
                className="sm:w-20 sm:h-25"
                src={movie.Poster}
              />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MoviesList;
