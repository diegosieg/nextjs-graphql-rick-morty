"use client";

import { Character } from "@/models/character";
import { Episode } from "@/models/episode";
import { CharacterLocation } from "@/models/location";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";

type DetailItem = Character | CharacterLocation | Episode;

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: DetailItem | null;
  itemType: "episode" | "character" | "location";
}

export default function DetailModal({
  isOpen,
  onClose,
  item,
  itemType,
}: Readonly<DetailModalProps>) {
  if (!item) return null;

  const renderContent = () => {
    // this may be extended later to diplay other types of items like characters and locations details
    if (itemType === "episode") {
      const episode = item as Episode;
      return (
        <Stack spacing={3}>
          <Heading as="h3" size="md">
            {episode.name}
          </Heading>
          <Text>
            <strong>Episode:</strong> {episode.episode}
          </Text>
          <Text>
            <strong>Air Date:</strong> {episode.air_date}
          </Text>
        </Stack>
      );
    }

    return <Text>No details available</Text>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
