"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export default function UserModal() {
  const { user, setUser, isModalOpen, closeModal } = useUser();
  const [username, setUsername] = useState(user.username);
  const [jobTitle, setJobTitle] = useState(user.jobTitle);
  const [errors, setErrors] = useState({ username: "", jobTitle: "" });
  const toast = useToast();

  const validate = () => {
    const newErrors = { username: "", jobTitle: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setUser({ username, jobTitle });
      closeModal();
      toast({
        title: user.username ? "Profile updated" : "Welcome!",
        description: user.username
          ? "Your profile has been updated successfully."
          : `Nice to meet you, ${username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      closeOnOverlayClick={!!user.username}
      closeOnEsc={!!user.username}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {user.username
            ? "Edit Your Profile"
            : "Welcome to Rick and Morty Explorer"}
        </ModalHeader>
        <ModalBody pb={6}>
          <FormControl isInvalid={!!errors.username} isRequired mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.jobTitle} isRequired>
            <FormLabel>Job Title</FormLabel>
            <Input
              placeholder="Enter your job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            {user.username ? "Update" : "Save"}
          </Button>
          {user.username && (
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
