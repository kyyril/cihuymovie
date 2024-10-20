import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const router = useParams();
  const { id } = router;
  return <Box>{id}</Box>;
};

export default DetailsPage;
