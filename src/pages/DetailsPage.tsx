import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetailsMovie,
  imagePath,
  imagePathOrigin,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { ratingToPercentage, resolveRatingColor } from "../utils/helpers";
//interface
import { MovieDetails } from "../types/dataDetails.interface";
import { CastDetails } from "../types/castDetail.interface";

const DetailsPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>(); // Destructure with type

  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastDetails[] | null>(null); // Update type to an array of CastDetails
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData]: [MovieDetails, CastDetails[]] =
          await Promise.all([
            fetchDetailsMovie({ type, id }),
            fetchCredits({ type, id }),
          ]);
        // Set details data
        setDetails(detailsData);

        // Set credits data (cast)
        setCast(creditsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);
  console.log(cast, "cast");

  if (loading) {
    return (
      <Flex justify={"center"} marginTop={"40"}>
        <Spinner color="yellow.500" size={"xl"} />
      </Flex>
    );
  }

  const title = details?.title || details?.name || details?.original_title;
  const titleOri = details?.original_title || details?.original_name;
  const releaseDate =
    type === "tv" ? details?.first_air_date : details?.release_date;
  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOrigin}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "500px" }}
        py={"2"}
        zIndex={"-1"}
        display={"flex"}
        alignItems={"center"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            alignItems={"center"}
            gap={"10"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={`${imagePath}/${details?.poster_path}`}
            />
            <Box>
              <Heading>
                {title}{" "}
                <Text as={"span"} fontSize={"xl"} opacity={"70%"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
                {titleOri === title ? null : (
                  <Text fontWeight={"bold"} fontSize={"lg"} opacity={"70%"}>
                    {titleOri}
                  </Text>
                )}
              </Heading>
              <Flex alignItems={"center"} gap={"4"} mt={"1"} mb={"5"}>
                <Flex alignItems={"center"}>
                  <CalendarIcon mr={"2"} color={"yellow"} />
                  <Text fontSize={"sm"}>
                    {new Date(releaseDate).toLocaleDateString("en-US")}(US)
                  </Text>
                </Flex>
              </Flex>
              <Flex alignItems={"center"} gap={"4"}>
                <CircularProgress
                  value={Number(ratingToPercentage(details?.vote_average)) || 0}
                  bg={"rgb(0,0,0,0.10"}
                  borderRadius={"full"}
                  p={"0.5"}
                  size={"50px"}
                  color={resolveRatingColor(details?.vote_average)}
                  thickness={"5px"}
                >
                  <CircularProgressLabel fontSize={"lg"}>
                    {ratingToPercentage(details?.vote_average)}
                    <Box as="span" fontSize={"sm"}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: "none", md: "initial" }}>
                  User Score
                </Text>
                <Button
                  leftIcon={<CheckCircleIcon />}
                  colorScheme="green"
                  variant={"outline"}
                ></Button>

                <Button
                  leftIcon={<PlusSquareIcon />}
                  variant={"outline"}
                ></Button>
              </Flex>
              <Text
                opacity={"70%"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my={"5"}
              >
                {details?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {details?.overview}
              </Text>
              <Flex>
                {details?.genres?.map((genre) => (
                  <Badge key={genre?.id}>{genre?.name}</Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default DetailsPage;
