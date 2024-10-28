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
  useToast,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetailsMovie,
  fetchVideo,
  imagePath,
  imagePathOrigin,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  PlusSquareIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "../utils/helpers";

//interface
import { MovieDetails } from "../types/dataDetails.interface";
import { CastDetails, CreditsData } from "../types/castDetail.interface";
import { VideoDetails, VideosData } from "../types/videos.interface";
import VideoComponent from "../components/VideoComponent";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
import { data } from "framer-motion/client";

const DetailsPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>(); // Ensure correct typing for params
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastDetails[]>([]); // Initialize as an empty array
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [videos, setVideos] = useState<VideoDetails[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const { user } = useAuth() as any;
  const toast = useToast();
  const { addToWatchlist, checkIfInWatchlist } = useFirestore();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData]: [
          MovieDetails,
          CreditsData,
          VideosData
        ] = await Promise.all([
          fetchDetailsMovie({ type, id }),
          fetchCredits({ type, id }),
          fetchVideo({ type, id }),
        ]);

        // Set details data
        setDetails(detailsData);

        // Set cast data
        setCast(creditsData.cast);

        // Set trailer video (assuming it's the first found trailer)
        const trailerVideo = videosData?.results?.find(
          (video) => video?.type === "Trailer"
        );
        setVideo(trailerVideo || null); // Set null if no trailer is found

        // Set other videos, excluding trailers
        const filteredVideos = videosData?.results
          ?.filter((video) => video?.type !== "Trailer")
          ?.slice(0, 10);
        setVideos(filteredVideos || []); // Set an empty array if no videos are found
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  const handleSaveWatchList = async () => {
    if (!user) {
      toast({
        title: "Please sign in to save to your watchlist",
        status: "error",
        isClosable: true,
      });
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      releaseDate: details?.release_date || details?.first_air_date,
      overview: details?.overview,
      voteAverage: details?.vote_average,
    };
    // console.log(data);
    // addDocument("watchlist", data);
    const dataId = details?.id.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const isInWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setIsInWatchlist(isInWatchlist);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }
    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist()]);

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
        <Container maxW={"container.lg"}>
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
                {type === "movie" && (
                  <>
                    <Box>*</Box>
                    <Flex alignItems={"center"}>
                      <TimeIcon />
                      <Text fontSize={"sm"}>
                        {minutesTohours(details?.runtime)}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>
              <Flex alignItems={"center"}>
                <CircularProgress
                  mr={"1"}
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
                <Text display={{ base: "none", md: "initial" }}>Score</Text>
                {isInWatchlist ? (
                  <Button
                    mx={"4"}
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="green"
                    variant={"outline"}
                  >
                    In WacthList
                  </Button>
                ) : (
                  <Button
                    leftIcon={<PlusSquareIcon />}
                    variant={"outline"}
                    onClick={handleSaveWatchList}
                  >
                    WatchList
                  </Button>
                )}
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
                  <Badge mr={"1"} p={"1"} key={genre?.id}>
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW={"container.lg"} pb={"10"}>
        <Heading
          as={"h2"}
          fontSize={"md"}
          textTransform={"uppercase"}
          mt={"10"}
        >
          Cast
        </Heading>
        <Flex gap={"4"} mt={"5"} mb={"10"} overflowX={"scroll"}>
          {cast?.length === 0 && <Text>Cast Not Found</Text>}
          {cast?.map((item) => (
            <Box key={item?.id} minW={"150px"}>
              <Image
                borderRadius={"sm"}
                w={"100%"}
                height={"225px"}
                objectFit={"cover"}
                src={`${imagePath}/${item?.profile_path}`}
                alt={item?.name}
              />
              <Text>{item?.name}</Text>
            </Box>
          ))}
        </Flex>
        <Heading
          as={"h2"}
          fontSize={"md"}
          textTransform={"uppercase"}
          mt={"10"}
          mb={"5"}
        >
          Video
        </Heading>
        <VideoComponent id={video?.key} size="500" />
        <Flex mt={5} mb={10} overflowX={"scroll"} gap={5}>
          {videos &&
            videos?.map((item) => (
              <Box key={item?.id} minW={"290px"}>
                <VideoComponent id={item?.key} size="150" />
                <Text fontWeight={"bold"} fontSize={"sm"} noOfLines={2}>
                  {item?.name}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPage;
