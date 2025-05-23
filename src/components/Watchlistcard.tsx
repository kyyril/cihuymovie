/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { AuthContextType } from "../context/authProvider";

const WatchlistCard = ({ type, item, setWatchlist }: any) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth() as AuthContextType;

  const handleRemoveClick = (event: any) => {
    event.preventDefault(); // Prevent the default behavior (link redirection)
    if (user) {
      removeFromWatchlist(user.uid, item.id).then(() => {
        setWatchlist((prev: any) =>
          prev.filter((el: any) => el.id !== item.id)
        );
      });
      return;
    }
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"150px"}>
          <Image
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<CheckIcon />}
              size={"sm"}
              colorScheme="green"
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            />
          </Tooltip>
        </Box>

        <Box>
          <Heading fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={"sm"} color={"green.200"} mt="2">
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4">
            <StarIcon color={"yellow"} fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{ base: "xs", md: "sm" }} noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;
