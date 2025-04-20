"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

type User = {
  username: string;
  jobTitle: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  isLoadingUserData: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User>({ username: "", jobTitle: "" });
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load user data from localStorage on initial render
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
      setIsLoadingUserData(false);
    }
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({
          user,
          setUser: updateUser,
          isLoadingUserData,
          isModalOpen,
          openModal,
          closeModal,
        }),
        [
          user,
          isLoadingUserData,
          isModalOpen,
          openModal,
          closeModal,
          updateUser,
        ],
      )}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
