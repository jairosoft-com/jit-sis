import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UsersPage from "./page";
import { User } from "./actions";

// Mock modals and toast used inside UsersTable
jest.mock("./ViewUserModal", () => () => <div data-testid="view-user-modal" />);
jest.mock("./EditUserModal", () => () => <div data-testid="edit-user-modal" />);
jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

// Sample user data
const users: User[] = [
  {
    id: 1,
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice@example.com",
    username: "alice",
    role: "Administrator",
    status: "active",
    last_login: "2025-01-01T00:00:00Z",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: 2,
    first_name: "Bob",
    last_name: "Smith",
    email: "bob@example.com",
    username: "bob",
    role: "Data Entry Clerk",
    status: "inactive",
    last_login: "2025-01-02T00:00:00Z",
    created_at: "2025-01-02T00:00:00Z",
    updated_at: "2025-01-02T00:00:00Z",
  },
];

// Mock data-fetching actions
jest.mock("./actions", () => ({
  __esModule: true,
  // Preserve the original types but override getUsers
  getUsers: jest.fn(async () => users),
}));

describe("UsersPage", () => {
  it("renders Users page heading and user rows", async () => {
    // UsersPage is an async component (server component in Next.js)
    const PageComponent = await UsersPage();

    render(PageComponent);

    // Heading
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Manage system users and permissions")).toBeInTheDocument();

    // User rows rendered by UsersTable component
    expect(await screen.findByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("filters users by search input", async () => {
    const PageComponent = await UsersPage();
    render(PageComponent);

    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "Alice" } });

    expect(await screen.findByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
  });

  it("opens add user modal", async () => {
    const PageComponent = await UsersPage();
    render(PageComponent);

    fireEvent.click(screen.getByText("Add User"));
    expect(screen.getByTestId("edit-user-modal")).toBeInTheDocument();
  });
});
