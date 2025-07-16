import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StudentsTable from "./StudentsTable";
import { Student } from "./actions";

// Mock modals and toast
jest.mock("./ViewStudentModal", () => () => (
  <div data-testid="view-student-modal" />
));
jest.mock("./EditStudentModal", () => () => (
  <div data-testid="edit-student-modal" />
));
jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const students: Student[] = [
  {
    id: "1",
    student_id: "S001",
    first_name: "Alice",
    last_name: "Smith",
    program: "CS",
    year_level: 1,
    status: "Active",
    age: 18,
    enrollment_date: "2023-01-01",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
    email: "alice@example.com",
  },
  {
    id: "2",
    student_id: "S002",
    first_name: "Bob",
    last_name: "Brown",
    program: "Math",
    year_level: 2,
    status: "Inactive",
    age: 19,
    enrollment_date: "2023-01-01",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
    email: "bob@example.com",
  },
];

describe("StudentsTable", () => {
  it("renders student rows", () => {
    render(<StudentsTable students={students} />);
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Brown")).toBeInTheDocument();
    expect(screen.getByText("S001")).toBeInTheDocument();
    expect(screen.getByText("S002")).toBeInTheDocument();
  });

  it("filters students by search", () => {
    render(<StudentsTable students={students} />);
    const input = screen.getByPlaceholderText("Search students...");
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.queryByText("Bob Brown")).not.toBeInTheDocument();
  });

  it("shows correct number of results and paginates", () => {
    render(<StudentsTable students={students} />);
    expect(screen.getByText("Showing 2 of 2 results")).toBeInTheDocument();
    // Change items per page
    fireEvent.change(screen.getByDisplayValue("10 per page"), {
      target: { value: "1" },
    });
    expect(screen.getByText("Showing 1 of 2 results")).toBeInTheDocument();
  });

  it("opens add student modal", () => {
    render(<StudentsTable students={students} />);
    fireEvent.click(screen.getByText("Add Student"));
    expect(screen.getByTestId("edit-student-modal")).toBeInTheDocument();
  });
});
