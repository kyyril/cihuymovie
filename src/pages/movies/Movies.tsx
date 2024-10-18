import { Container, Heading } from "@chakra-ui/react";

const Movies = () => {
  return (
    <Container maxW={"container.lg"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Discover Movies
      </Heading>
    </Container>
  );
};

export default Movies;
