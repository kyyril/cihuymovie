import { Container, Heading } from "@chakra-ui/react";

const Search = () => {
  return (
    <Container maxW={"container.lg"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Search
      </Heading>
    </Container>
  );
};

export default Search;
