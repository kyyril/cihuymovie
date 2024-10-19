import { Container, Grid, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrend, imagePath } from "../services/api";
import { Data } from "../types/data.interface";

const Home = () => {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    // Fetch trending movies for the day
    fetchTrend("day")
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err, "error");
      });
  }, []);

  console.log(data, "data");

  return (
    <Container maxW={"container.lg"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Trending
      </Heading>

      <Grid templateColumns={"repeat(5, 1fr)"} gap={"4"}>
        {data &&
          data
            .filter((item) => item.poster_path) // Filter data yang memiliki poster_path
            .map((item) => (
              <Image
                key={item.id}
                src={`${imagePath}/${item.poster_path}`}
                alt={item.name}
              />
            ))}
      </Grid>
    </Container>
  );
};

export default Home;
