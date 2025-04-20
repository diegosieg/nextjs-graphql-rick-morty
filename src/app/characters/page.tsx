"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Badge,
  Flex,
  Spinner,
  Center,
  useColorModeValue,
  Input,
  Select,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { GET_CHARACTERS } from "@/lib/graphql/queries";
import Pagination from "@/components/Pagination";
import { useUser } from "@/hooks/useUser";
import UserModal from "@/components/UserModal";
import { Character } from "@/models/character";

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { user, openModal } = useUser();
  const router = useRouter();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  useEffect(() => {
    if (!user.username) {
      openModal();
    }
  }, [user, openModal]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const filteredCharacters = data?.characters?.results
    ? data.characters.results.filter((character: Character) => {
        const matchesSearch = character.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter
          ? character.status.toLowerCase() === statusFilter.toLowerCase()
          : true;
        return matchesSearch && matchesStatus;
      })
    : [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "green";
      case "dead":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8} textAlign="center">
        Rick and Morty Characters
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        mb={6}
        gap={4}
        justifyContent="space-between"
      >
        <Input
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW={{ base: "100%", md: "300px" }}
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxW={{ base: "100%", md: "200px" }}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </Select>
      </Flex>

      {(() => {
        if (loading) {
          return (
            <Center py={10}>
              <Spinner
                size="xl"
                thickness="4px"
                speed="0.65s"
                color="teal.500"
              />
            </Center>
          );
        }

        if (error) {
          return (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>Failed to load characters.</AlertDescription>
            </Alert>
          );
        }

        return (
          <>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
              {filteredCharacters.map((character: Character) => (
                <Box
                  key={character.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg={cardBg}
                  borderColor={borderColor}
                  transition="transform 0.3s"
                  _hover={{ transform: "translateY(-5px)", cursor: "pointer" }}
                  onClick={() => router.push(`/characters/${character.id}`)}
                  role="group"
                  tabIndex={0}
                  aria-label={`View details for ${character.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      router.push(`/characters/${character.id}`);
                    }
                  }}
                >
                  <Image
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    width="100%"
                    height="auto"
                  />
                  <Box p={4}>
                    <Heading as="h3" size="md" mb={2} noOfLines={1}>
                      {character.name}
                    </Heading>
                    <Flex wrap="wrap" gap={2} mb={2}>
                      <Badge colorScheme={getStatusColor(character.status)}>
                        {character.status}
                      </Badge>
                      <Badge colorScheme="purple">{character.species}</Badge>
                    </Flex>
                    <Text fontSize="sm" color="gray.500">
                      <strong>Origin:</strong> {character.origin.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      <strong>Location:</strong> {character.location.name}
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>

            {filteredCharacters.length === 0 && !loading && (
              <Alert status="info" borderRadius="md" mt={4}>
                <AlertIcon />
                No characters found matching your criteria.
              </Alert>
            )}

            {data?.characters?.info &&
              searchTerm === "" &&
              statusFilter === "" && (
                <Pagination
                  currentPage={page}
                  totalPages={data.characters.info.pages}
                  onPageChange={handlePageChange}
                />
              )}
          </>
        );
      })()}

      <UserModal />
    </Container>
  );
}
