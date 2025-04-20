"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Badge,
  Flex,
  Spinner,
  Center,
  Divider,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { GET_CHARACTER } from "@/lib/graphql/queries";

import { useUser } from "@/hooks/useUser";
import UserModal from "@/components/UserModal";
import DetailModal from "@/components/DetailModal";
import { Episode } from "@/models/episode";

export default function CharacterDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user, openModal, isLoadingUserData } = useUser();
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  useEffect(() => {
    if (user.username === "" && !isLoadingUserData) {
      // If the user is not logged in, open the modal
      openModal();
    }
  }, [user, openModal, isLoadingUserData]);

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsCharacterModalOpen(true);
  };

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

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="teal.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Failed to load character details.</AlertDescription>
        </Alert>
      </Container>
    );
  }

  const character = data?.character;

  if (!character) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          <AlertTitle>Not Found!</AlertTitle>
          <AlertDescription>Character not found.</AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Card
        direction={{ base: "column", md: "row" }}
        overflow="hidden"
        variant="outline"
        mb={8}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", md: "300px" }}
          src={character.image || "/placeholder.svg"}
          alt={character.name}
        />

        <Stack>
          <CardBody>
            <Heading size="xl" mb={4}>
              {character.name}
            </Heading>

            <Flex wrap="wrap" gap={2} mb={4}>
              <Badge
                colorScheme={getStatusColor(character.status)}
                fontSize="0.9em"
                p={1}
              >
                {character.status}
              </Badge>
              <Badge colorScheme="purple" fontSize="0.9em" p={1}>
                {character.species}
              </Badge>
              {character.type && (
                <Badge colorScheme="blue" fontSize="0.9em" p={1}>
                  {character.type}
                </Badge>
              )}
              <Badge colorScheme="orange" fontSize="0.9em" p={1}>
                {character.gender}
              </Badge>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontWeight="bold">Origin:</Text>
                <Text>{character.origin.name}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Location:</Text>
                <Text>{character.location.name}</Text>
              </Box>
              {character.origin.type && (
                <Box>
                  <Text fontWeight="bold">Origin Type:</Text>
                  <Text>{character.origin.type}</Text>
                </Box>
              )}
              {character.origin.dimension && (
                <Box>
                  <Text fontWeight="bold">Origin Dimension:</Text>
                  <Text>{character.origin.dimension}</Text>
                </Box>
              )}
              {character.location.type && (
                <Box>
                  <Text fontWeight="bold">Location Type:</Text>
                  <Text>{character.location.type}</Text>
                </Box>
              )}
              {character.location.dimension && (
                <Box>
                  <Text fontWeight="bold">Location Dimension:</Text>
                  <Text>{character.location.dimension}</Text>
                </Box>
              )}
            </SimpleGrid>
          </CardBody>
        </Stack>
      </Card>

      <Divider my={8} />

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Episodes
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {character.episode.map((episode: Episode) => (
            <Box
              key={episode.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg={cardBg}
              borderColor={borderColor}
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-2px)", cursor: "pointer" }}
              onClick={() => handleEpisodeClick(episode)}
              role="button"
              tabIndex={0}
              aria-label={`View details for episode ${episode.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleEpisodeClick(episode);
                }
              }}
            >
              <Heading as="h3" size="sm" mb={2}>
                {episode.name}
              </Heading>
              <Text fontSize="sm" color="gray.500" mb={1}>
                {episode.episode}
              </Text>
              <Text fontSize="sm">{episode.air_date}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <DetailModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        item={selectedEpisode}
        itemType="episode"
      />

      <UserModal />
    </Container>
  );
}
