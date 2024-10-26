import {
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchData } from "../../services/api";
import Card from "../../components/Card";
import { Data } from "../../types/data.interface";
import Pagination from "../../components/Pagination";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [tempSearchValue, setTempSearchValue] = useState("");

  useEffect(() => {
    setLoading(true);
    SearchData(query, activePage)
      .then((res) => {
        console.log(res, "respon");
        setData(res?.results);
        setActivePage(res?.page); // Update active page
        setTotalPages(res?.total_pages); // Update total page
      })
      .catch((err) => {
        console.error(err, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, activePage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(tempSearchValue);
  };

  return (
    <Container maxW="container.lg">
      <Flex alignItems="baseline" gap="4" my="6">
        <Heading as="h2" fontSize="md" textTransform="uppercase">
          Search
        </Heading>
      </Flex>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search movie, tv show..."
          value={tempSearchValue}
          type="text"
          onChange={(e) => setTempSearchValue(e.target.value)}
        />
      </form>
      {loading && (
        <Flex justifyContent={"center"} mt={"30"}>
          <Spinner size={"xl"} color="yellow" />
        </Flex>
      )}

      {data.length === 0 && !loading && (
        <Flex justifyContent={"center"} mt={"30"}>
          <Heading as="h3" fontSize="lg">
            No results found
          </Heading>
        </Flex>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
        mt="6"
      >
        {data?.length > 0 &&
          !loading &&
          data?.map((item, i) =>
            loading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card key={item?.id} item={item} type={item?.media_type} />
            )
          )}
      </Grid>
      {data?.length > 0 && !loading && (
        <Pagination
          activePage={activePage}
          totalPage={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
