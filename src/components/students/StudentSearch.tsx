"use client";

import React, { useState } from "react";
import { Search, X, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  isActive: boolean;
}

interface StudentSearchProps {
  isAdmin?: boolean;
  onViewStudent?: (studentId: string) => void;
  onEditStudent?: (studentId: string) => void;
}

export default function StudentSearch({
  isAdmin = false,
  onViewStudent = () => {},
  onEditStudent = () => {},
}: StudentSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "id">("name");
  const [includeInactive, setIncludeInactive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for demonstration
  const mockStudents: Student[] = [
    {
      id: "JIT-2023-0001",
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
      dateOfBirth: "2005-05-15",
      gender: "Male",
      contactNumber: "+63 912 345 6789",
      isActive: true,
    },
    {
      id: "JIT-2023-0002",
      firstName: "Jane",
      middleName: "",
      lastName: "Smith",
      dateOfBirth: "2004-08-22",
      gender: "Female",
      contactNumber: "+63 923 456 7890",
      isActive: true,
    },
    {
      id: "JIT-2023-0003",
      firstName: "Robert",
      middleName: "James",
      lastName: "Johnson",
      dateOfBirth: "2005-02-10",
      gender: "Male",
      contactNumber: "+63 934 567 8901",
      isActive: false,
    },
    {
      id: "JIT-2023-0004",
      firstName: "Maria",
      middleName: "Cruz",
      lastName: "Santos",
      dateOfBirth: "2004-11-30",
      gender: "Female",
      contactNumber: "+63 945 678 9012",
      isActive: true,
    },
    {
      id: "JIT-2023-0005",
      firstName: "Carlos",
      middleName: "Miguel",
      lastName: "Reyes",
      dateOfBirth: "2005-07-18",
      gender: "Male",
      contactNumber: "+63 956 789 0123",
      isActive: true,
    },
  ];

  // Filter students based on search query and filters
  const filteredStudents = mockStudents.filter((student) => {
    // Filter by active status if not admin or if admin but not including inactive
    if (!isAdmin && !student.isActive) return false;
    if (isAdmin && !includeInactive && !student.isActive) return false;

    // Filter by search query
    if (!searchQuery) return true;

    if (searchType === "name") {
      const fullName =
        `${student.firstName} ${student.middleName} ${student.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    } else {
      return student.id.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="w-full bg-background p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Student Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder={
                    searchType === "name"
                      ? "Search by student name..."
                      : "Search by student ID..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant={searchType === "name" ? "default" : "outline"}
                  onClick={() => setSearchType("name")}
                  className="whitespace-nowrap"
                >
                  By Name
                </Button>
                <Button
                  type="button"
                  variant={searchType === "id" ? "default" : "outline"}
                  onClick={() => setSearchType("id")}
                  className="whitespace-nowrap"
                >
                  By ID
                </Button>
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                "Searching..."
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </form>

          {isAdmin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeInactive"
                checked={includeInactive}
                onCheckedChange={(checked) =>
                  setIncludeInactive(checked as boolean)
                }
              />
              <label
                htmlFor="includeInactive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include inactive student records
              </label>
            </div>
          )}

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date of Birth
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Gender</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Contact Number
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.id}
                      </TableCell>
                      <TableCell>
                        {student.firstName}{" "}
                        {student.middleName ? `${student.middleName} ` : ""}
                        {student.lastName}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(student.dateOfBirth).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {student.gender}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {student.contactNumber}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={student.isActive ? "default" : "outline"}
                        >
                          {student.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewStudent(student.id)}
                            title="View student profile"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditStudent(student.id)}
                            title="Edit student profile"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No students found. Try adjusting your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length > 0 && (
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredStudents.length)}{" "}
                of {filteredStudents.length} students
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={currentPage === pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
