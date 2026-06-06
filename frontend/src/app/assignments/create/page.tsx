import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import AssignmentForm from "@/components/assignment/AssignmentForm";

export default function CreateAssignmentPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        <div className="mt-6">

  <div className="mb-8">
    <h2 className="text-2xl font-bold">
      Create Assignment
    </h2>

    <p className="text-gray-500">
      Set up a new assignment for your students
    </p>

    <div className="mt-4 h-1 bg-gray-200 rounded-full">
      <div className="h-1 w-1/2 bg-black rounded-full"></div>
    </div>
  </div>

  <AssignmentForm />

</div>
      </div>
    </div>
  );
}