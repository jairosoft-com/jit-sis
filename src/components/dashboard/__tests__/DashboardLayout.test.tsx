import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { DashboardLayout } from "../DashboardLayout";

import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => "/dashboard"),
}));

// Mock AuthContext
const mockUser = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
  role: "Administrator",
};

let mockAuthContext: {
  user: typeof mockUser | null;
  logout: jest.Mock;
  login: jest.Mock;
  loading: boolean;
};

// Mock AuthProvider
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => mockAuthContext,
}));

describe("DashboardLayout", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it("shows skeleton loaders when loading", () => {
    mockAuthContext = {
      user: null,
      loading: true,
      logout: jest.fn(),
      login: jest.fn(),
    };

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // Check that the main parts of the skeleton UI are present
    expect(screen.getByTestId("user-profile-skeleton")).toBeInTheDocument();
    expect(screen.getAllByTestId("nav-item-skeleton").length).toBeGreaterThan(
      0
    );

    // Check that user-specific data is not rendered
    expect(screen.queryByText("Test User")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("renders the full layout with user data when not loading", () => {
    mockAuthContext = {
      user: mockUser,
      loading: false,
      logout: jest.fn(),
      login: jest.fn(),
    };

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // Skeletons should not be present
    expect(
      screen.queryByTestId("user-profile-skeleton")
    ).not.toBeInTheDocument();

    // Check user profile renders correctly
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Administrator")).toBeInTheDocument();

    // Check navigation items (use getByRole for links)
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Students" })).toBeInTheDocument();

    // Check main content
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("filters navigation items based on user role", async () => {
    // Set user role to Student
    mockAuthContext = {
      user: { ...mockUser, role: "Student" },
      loading: false,
      logout: jest.fn(),
      login: jest.fn(),
    };

    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    await waitFor(() => {
      // Items that should be visible to Students
      expect(
        screen.getByRole("link", { name: "Dashboard" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Schedule" })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Grades" })).toBeInTheDocument();
      // Items that should NOT be visible to Students
      expect(
        screen.queryByRole("link", { name: "Students" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Users" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Settings" })
      ).not.toBeInTheDocument();
    });
  });
});
