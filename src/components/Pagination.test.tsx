import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const onPageChangeMock = vi.fn();

  test("renders pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).not.toBeDisabled();
  });

  test("calls onPageChange when clicking next button", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange when clicking previous button", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  test("disables next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  test("disables previous button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  test("renders ellipsis for large page ranges", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(screen.findAllByText("...")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
  });
});
