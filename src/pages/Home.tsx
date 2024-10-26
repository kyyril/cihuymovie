import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrend } from "../services/api";
import { Data } from "../types/data.interface";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState<Data[]>([]);
  const [timeWindow, setTimeWindow] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch trending movies for the day
    fetchTrend(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  console.log(data, "data");

  return (
    <Container maxW={"container.lg"}>
      <Flex alignItems={"baseline"} gap={"4"} mt={"6"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
      </Flex>
      <Flex gap={"4"} mb={"3"} justifyContent={"flex-end"}>
        {loading && (
          <Box display="flex" alignItems="center" ml={2}>
            <Spinner size="xs" />
          </Box>
        )}
        <Box
          as="button"
          color={timeWindow === "day" ? "yellow" : ""}
          textDecoration={timeWindow === "day" ? "underline" : ""}
          onClick={() => setTimeWindow("day")}
          _hover={{
            textDecoration: "underline",
          }}
        >
          Today
        </Box>

        <Box
          as="button"
          color={timeWindow === "week" ? "yellow" : ""}
          textDecoration={timeWindow === "week" ? "underline" : ""}
          onClick={() => setTimeWindow("week")}
          _hover={{
            textDecoration: "underline",
          }}
        >
          This Week
        </Box>
      </Flex>

      {data.length === 0 && !loading && (
        <Flex justifyContent={"center"} mt={"30"}>
          <Heading as="h3" fontSize="lg">
            No results found
          </Heading>
        </Flex>
      )}

      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton height={300} key={i} />
            ))
          : data?.map((item) => (
              <Card key={item?.id} item={item} type={"movie"} />
            ))}
      </Grid>

      {data?.length > 0 && !loading && <div></div>}
    </Container>
  );
};

export default Home;
