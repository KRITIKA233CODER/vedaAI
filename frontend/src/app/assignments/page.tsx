//import Sidebar from "@/components/layout/Sidebar";
"use client";

import { useEffect, useState } from "react";
import { getAssignments } from "@/services/assignment.service";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import { Search } from "lucide-react";

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAssignments, setFilteredAssignments] = useState<any[]>([]);

  const fetchAssignments = async () => {
    try {
      const response = await getAssignments();
      setAssignments(response.assignments);
      setFilteredAssignments(response.assignments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Filter assignments based on search query
  useEffect(() => {
    const filtered = assignments.filter((assignment) => {
      const searchTerm = searchQuery.toLowerCase();
      const instructions = assignment.instructions.toLowerCase();
      const title = assignment.instructions
        ?.split(" ")
        .slice(0, 4)
        .join(" ")
        .toLowerCase() || "";

      return (
        instructions.includes(searchTerm) || title.includes(searchTerm)
      );
    });

    setFilteredAssignments(filtered);
  }, [searchQuery, assignments]);

  const handleDelete = () => {
    // Refresh the list after deletion
    fetchAssignments();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        <div className="mt-8">
          <h1 className="text-5xl font-bold tracking-tight mb-2">
            Assignments
          </h1>
          <p className="text-gray-600 text-base mb-6">
            Manage and create assignments for your classes
          </p>
          
          {/* Search Bar */}
          <div className="flex items-center gap-4 mt-6 mb-8">
            <button
              className="
              bg-white
              border
              rounded-2xl
              px-5
              py-3
              text-gray-500
              shadow-sm
              hover:bg-gray-50
              transition
              "
            >
              Filter By
            </button>

            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Assignment"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                w-full
                bg-white
                border
                rounded-2xl
                px-5
                py-3
                pl-12
                shadow-sm
                outline-none
                focus:border-blue-500
                "
              />
            </div>
          </div>

          {filteredAssignments.length === 0 && searchQuery ? (
            <div
              className="
              flex
              flex-col
              items-center
              justify-center
              py-32
              "
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No assignments found
              </h2>
              <p className="text-gray-500 mb-8">
                Try adjusting your search query
              </p>
            </div>
          ) : filteredAssignments.length === 0 ? (
  <div
    className="
    flex
    flex-col
    items-center
    justify-center
    py-32
    "
  >
    <h2 className="text-4xl font-bold mb-4">
      No assignments yet
    </h2>

    <p className="text-gray-500 mb-8">
      Create your first assignment
    </p>

    <a
      href="/assignments/create"
      className="
      bg-black
      text-white
      px-8
      py-4
      rounded-full
      hover:bg-gray-800
      transition
      "
    >
      Create Assignment
    </a>
  </div>
) : (
  <div
    className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-8
    "
  >
    {filteredAssignments.map((assignment) => (
      <AssignmentCard
        key={assignment._id}
        id={assignment._id}
        title={
          assignment.instructions
            ?.split(" ")
            .slice(0, 4)
            .join(" ") || "Untitled Assignment"
        }
        assignedOn={new Date(
          assignment.createdAt
        ).toLocaleDateString()}
        dueDate={new Date(
          assignment.dueDate
        ).toLocaleDateString()}
        onDelete={handleDelete}
      />
    ))}
  </div>
)}
        </div>
      </div>
      <a
        href="/assignments/create"
        className="
        fixed
        bottom-8
        left-1/2
        -translate-x-1/2
        bg-black
        text-white
        px-8
        py-4
        rounded-full
        shadow-xl
        z-50
        hover:bg-gray-800
        transition
        "
      >
        + Create Assignment
      </a>
    </div>
  );
}