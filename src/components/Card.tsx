import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { Data } from "../types/data.interface";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";

const Card = ({ item }: { item: Data }) => {
  return (
    <Link to={"/"}>
      <Box
        pos={"relative"}
        scale={1}
        _hover={{
          transform: "scale(1.05)",
          transition: "transform 0.3s ease-in-out",
          "& .overlay": {
            opacity: 1,
            transition: "opacity 0.4s ease-in-out",
          },
        }}
      >
        <Image
          w={"full"}
          h={260}
          src={`${imagePath}/${item?.poster_path || item?.backdrop_path}`}
          alt={item?.name || item?.original_name}
        />
        <Box
          className="overlay"
          pos={"absolute"}
          p={"2"}
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"33%"}
          bg="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(3px)"
          opacity={0}
        >
          <Text
            textAlign={"center"}
            fontSize={"sm"}
            color={"white"}
            isTruncated
          >
            {item?.name || "Title N/A"}
          </Text>
          <Text textAlign={"center"} fontSize={"sm"} color={"yellow.300"}>
            {new Date(item?.first_air_date).getFullYear() || "N/A"}
          </Text>
          <Flex justify={"space-between"} mt={"3"} mb={"1"} color={"white"}>
            <Flex fontSize={"small"} gap={"1"}>
              <StarIcon color={"yellow.400"} />
              <Text>{item?.vote_average.toFixed(1) || "N/A"}</Text>
            </Flex>
            <Flex fontSize={"small"} gap={"1"}>
              <Text>{item?.popularity || "N/A"}</Text>
              <ViewIcon />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
