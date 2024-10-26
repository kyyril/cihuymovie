import {
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Data } from "../../types/data.interface";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

const Movies = () => {
  const [movies, setMovies] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setLoading(true);
    // Fetch movies
    fetchMovies(activePage, sortBy)
      .then((res) => {
        setMovies(res?.results);
        setActivePage(res?.page); // Update active page
        setTotalPage(res?.total_pages); // Update total page
        console.log(activePage, "page");
      })
      .catch((err) => {
        console.error(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activePage, sortBy]);

  return (
    <Container maxW={"container.lg"}>
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select
          w={"130px"}
          onChange={(e) => {
            setActivePage(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
          </option>
        </Select>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton height={300} key={i} />
            ))
          : movies.map((item) => (
              <Card key={item?.id} item={item} type={"movie"} />
            ))}
      </Grid>

      {movies?.length > 0 && !loading && (
        <Pagination
          activePage={activePage}
          totalPage={totalPage}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Movies;
