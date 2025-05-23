import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { HamburgerIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { AuthContextType } from "../context/authProvider";

const Navbar = () => {
  const { user, logout, signInWithGoogle } = useAuth() as AuthContextType; // Get user and auth functions from context
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control drawer visibility

  const handleGoogleLogin = async () => {
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
            <Flex justify={"start"}>
              <Box
                fontSize={"3xl"}
                fontWeight={"extrabold"}
                color={"yellow"}
                letterSpacing={"widest"}
                fontFamily={"mono"}
              >
                CIHUY
              </Box>
            </Flex>
          </Link>

          {/* Desktop */}
          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
            justifyContent={"end"}
          >
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/shows">TV Shows</Link>
            <Link to="/search">
              <Search2Icon />
            </Link>
            {user ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"yellow"}
                    color={"white"}
                    size={"sm"}
                    name={user?.email ?? undefined}
                  />
                </MenuButton>
                <MenuList>
                  <Link to={"/watchlist"}>
                    <MenuItem>Watchlist</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Avatar
                size={"sm"}
                bg={"gray"}
                as={"button"}
                onClick={handleGoogleLogin}
              />
            )}
          </Flex>

          {/* Mobile */}
          <Flex
            justify={"end"}
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            <IconButton
              icon={<HamburgerIcon />}
              onClick={onOpen} // Open the drawer on click
              aria-label="Open Menu"
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"black"}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar
                        bg="red.500"
                        size={"sm"}
                        name={user?.email ?? undefined}
                      />
                      <Box fontSize={"sm"}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={"sm"}
                      bg="gray.800"
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>

                <DrawerBody>
                  <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                    <Link to="/">Home</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/shows">TV Shows</Link>
                    {user && (
                      <>
                        <Link to="/watchlist">Watchlist</Link>
                        <Button
                          variant={"outline"}
                          colorScheme="red"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
