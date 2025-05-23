import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/Watchlistcard";
import { AuthContextType } from "../context/authProvider";
import { WatchlistItem } from "../types/watchlist";

const WatchList = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth() as AuthContextType;

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data as WatchlistItem[]);
          console.log(data, "dataa");
        })
        .catch((err) => {
          console.error(err, "error getting watchlist");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user.uid]);

  return (
    <Container maxW="container.lg">
      <Flex alignItems="baseline" gap={4} mt={6}>
        <Heading as="h2" fontSize="md" textTransform="uppercase">
          Watchlist
        </Heading>
      </Flex>
      {isLoading && (
        <Flex justify={"center"} marginTop={"40"}>
          <Spinner color="yellow" size={"xl"} />
        </Flex>
      )}
      {!isLoading && watchlist?.length === 0 && (
        <Flex justify={"center"}>
          <Heading as="h3" fontSize="lg" mb={4}>
            Your watchlist is empty. Add some movies to start watching them.
          </Heading>
        </Flex>
      )}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={4}
          mt={6}
        >
          {watchlist.map((item: WatchlistItem) => (
            <WatchlistCard
              key={item.id}
              type={item.type}
              item={item}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchList;
