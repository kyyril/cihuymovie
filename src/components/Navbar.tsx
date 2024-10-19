import { Box, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box py="4" mb="2">
      <Container maxW={"container.lg"}>
        <Flex justifyContent={"space-between"}>
          <Link to={"/"}>
            <Flex>
              <Box
                fontSize={"3xl"}
                fontWeight={"extrabold"}
                color={"yellow.400"}
                letterSpacing={"widest"}
                fontFamily={"mono"}
              >
                CIHUY
              </Box>
              <Box
                fontSize={"2xl"}
                fontWeight={"bold"}
                letterSpacing={"widest"}
                fontFamily={"mono"}
              >
                MV
              </Box>
            </Flex>
          </Link>
          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">Search</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
