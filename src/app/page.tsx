"use client";

import { useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import UserModal from "@/components/UserModal";

export default function Home() {
  const { user, openModal, isLoadingUserData } = useUser();
  const router = useRouter();
  const cardBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    if (user.username === "" && !isLoadingUserData) {
      // If the user is not logged in, open the modal
      openModal();
    }
  }, [user, openModal, isLoadingUserData]);

  const sections = [
    {
      title: "Characters",
      description: "Explore all characters from the Rick and Morty universe",
      path: "/characters",
    },
    {
      title: "Locations",
      description: "Discover the various locations visited in the series",
    },
    {
      title: "Episodes",
      description: "Browse through all episodes of Rick and Morty",
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={100}>
        <Heading as="h1" size="2xl" mb={4}>
          Rick and Morty Explorer
        </Heading>
        <Text fontSize="xl">
          Your portal to the multiverse of Rick and Morty
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {sections.map((section) => (
          <Box
            key={section.title}
            bg={cardBgColor}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.3s"
            _hover={{ transform: "translateY(-5px)" }}
          >
            <Box p={6}>
              <Heading as="h3" size="lg" mb={2}>
                {section.title}
              </Heading>
              <Text mb={4}>{section.description}</Text>
              {section.path ? (
                <Button
                  colorScheme="teal"
                  onClick={() => router.push(section.path)}
                  width="full"
                >
                  Explore
                </Button>
              ) : (
                <Button colorScheme="gray" isDisabled width="full">
                  Coming soon
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <UserModal />
    </Container>
  );
}
