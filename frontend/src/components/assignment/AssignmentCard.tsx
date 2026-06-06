"use client";

import Link from "next/link";
import { useState } from "react";
import { MoreVertical, Trash2, Eye } from "lucide-react";
import { deleteAssignment } from "@/services/assignment.service";

interface Props {
  id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
  onDelete: () => void;
}

export default function AssignmentCard({
  id,
  title,
  assignedOn,
  dueDate,
  onDelete,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this assignment?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      await deleteAssignment(id);
      onDelete();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/assignments/${id}`}>
      <div
        className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        border
        border-gray-200
        hover:shadow-lg
        hover:scale-105
        transition-all
        duration-300
        relative
        h-40
        flex
        flex-col
        justify-between
        cursor-pointer
        "
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowMenu(!showMenu);
            }}
            className="
            text-gray-400
            hover:text-gray-600
            transition
            p-2
            rounded-lg
            hover:bg-gray-100
            "
          >
            <MoreVertical size={20} />
          </button>

          {showMenu && (
            <div
              className="
              absolute
              right-0
              top-full
              mt-2
              w-48
              bg-white
              border
              border-gray-200
              rounded-xl
              shadow-lg
              z-50
              overflow-hidden
              "
              onClick={(e) => e.preventDefault()}
            >
              <Link
                href={`/assignments/${id}`}
                className="
                flex
                items-center
                gap-3
                px-4
                py-3
                text-gray-700
                hover:bg-gray-50
                transition
                border-b
                border-gray-200
                "
              >
                <Eye size={18} />
                <span>View Assignment</span>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                disabled={loading}
                className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-red-600
                hover:bg-red-50
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
                "
              >
                <Trash2 size={18} />
                <span>{loading ? "Deleting..." : "Delete Assignment"}</span>
              </button>
            </div>
          )}
        </div>

        <h3
          className="
          text-2xl
          font-bold
          mb-4
          line-clamp-2
          pr-8
          "
        >
          {title}
        </h3>

        <div
          className="
          flex
          justify-between
          items-end
          text-xs
          text-gray-600
          "
        >
          <span>
            <strong>Assigned:</strong> {assignedOn}
          </span>

          <span>
            <strong>Due:</strong> {dueDate}
          </span>
        </div>
      </div>
    </Link>
  );
}