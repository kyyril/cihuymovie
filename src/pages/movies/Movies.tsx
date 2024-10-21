import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Spinner,
  Text,
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

  useEffect(() => {
    setLoading(true);
    // Fetch movies
    fetchMovies(activePage)
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
  }, [activePage]);

  const filteredData = movies?.filter((item) => item?.poster_path); // Filter hanya data yang memiliki poster_path

  return (
    <Container maxW={"container.lg"}>
      <Flex alignItems={"baseline"} gap={"4"} mt={"6"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>
      </Flex>
      <Flex gap={"4"} mb={"3"} justifyContent={"flex-end"}>
        {loading && (
          <Box display="flex" alignItems="center" ml={2}>
            <Spinner size="xs" />
          </Box>
        )}
      </Flex>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {loading ? (
          // Display skeletons while loading
          Array(10)
            .fill(null)
            .map((_, index) => <Skeleton height="300px" key={index} />)
        ) : filteredData.length > 0 ? (
          // Display cards if data is available
          filteredData.map((item) => (
            <Card key={item.id} item={item} type="movie" />
          ))
        ) : (
          // Display message when no data is available
          <Box display="flex" justifyContent="center" w="full" py={4}>
            <Text fontSize="lg" textAlign="center" color="gray.500">
              Data for the Movies not available 😴
            </Text>
          </Box>
        )}
      </Grid>

      {/* Pagination */}
      <Pagination
        activePage={activePage}
        totalPage={totalPage}
        setActivePage={setActivePage}
      />
    </Container>
  );
};

export default Movies;
