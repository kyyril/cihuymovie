import { Button, Flex, Text } from "@chakra-ui/react";

const Pagination = ({ activePage, totalPage, setActivePage }: any) => {
  return (
    <Flex gap={"2"} alignItems={"center"}>
      <Flex gap={"2"} maxW={"250px"} my={"10"}>
        <Button
          onClick={() => setActivePage(activePage - 1)}
          isDisabled={activePage == 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setActivePage(activePage + 1)}
          isDisabled={activePage == totalPage}
        >
          Next
        </Button>
      </Flex>
      <Flex gap={"1"}>
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text>{totalPage}</Text>
      </Flex>
    </Flex>
  );
};

export default Pagination;
