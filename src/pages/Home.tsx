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

  const filteredData = data.filter((item) => item?.poster_path); // Filter data yang memiliki poster_path

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
            <Card key={item?.id} item={item} type={item?.media_type} />
          ))
        ) : (
          // Display message when no data is available
          <Box display="flex" justifyContent="center" w="full" py={4}>
            <Text fontSize="lg" textAlign="center" color="gray.500">
              Data for day not available😴
            </Text>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
