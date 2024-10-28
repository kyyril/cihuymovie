import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Search2Icon } from "@chakra-ui/icons";

const Navbar = () => {
  const { user, logout, signInWithGoogle } = useAuth() as any;

  const hanldeGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  return (
    <Box py="4" mb="2">
      <Container maxW={"container.lg"}>
        <Flex justifyContent={"space-between"}>
          <Link to={"/"}>
            <Flex>
              <Box
                fontSize={"3xl"}
                fontWeight={"extrabold"}
                color={"yellow"}
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
            <Link to="/search">
              {" "}
              <Search2Icon />
            </Link>
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"yellow"}
                    color={"white"}
                    size={"sm"}
                    name="Code"
                  />
                </MenuButton>
                <MenuList>
                  <Link to={"/watchlist"}>
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>logout</MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray"}
                as={"button"}
                onClick={hanldeGoogleLogin}
              ></Avatar>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
