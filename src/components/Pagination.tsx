"use client";

import { Button, Flex, Text, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Readonly<PaginationProps>) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add page range
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <Flex justifyContent="center" alignItems="center" my={8} flexWrap="wrap">
      <IconButton
        aria-label="Previous page"
        icon={<ChevronLeftIcon />}
        onClick={handlePrevious}
        isDisabled={isFirstPage}
        mr={2}
      />

      {getPageNumbers().map((page) =>
        typeof page === "number" ? (
          <Button
            key={`btn-page-${page}`}
            mx={1}
            onClick={() => onPageChange(page)}
            colorScheme={currentPage === page ? "teal" : "gray"}
            variant={currentPage === page ? "solid" : "outline"}
          >
            {page}
          </Button>
        ) : (
          <Text key={`btn-page-${page}`} mx={1}>
            {page}
          </Text>
        ),
      )}

      <IconButton
        aria-label="Next page"
        icon={<ChevronRightIcon />}
        onClick={handleNext}
        isDisabled={isLastPage}
        ml={2}
      />
    </Flex>
  );
}
