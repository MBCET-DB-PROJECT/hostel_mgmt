import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import studentdata from "./../../data/StudentDetails.json";
import "tailwindcss/tailwind.css";

interface Student {
  id: number;
  name: string;
  class: string;
  sem: string;
  roomno: string;
}

const EditStudent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (id) {
      const selectedStudent = studentdata.find(
        (s: any) => s.id === parseInt(id as string)
      );
      if (!selectedStudent) {
        console.error("Student not found");
        return;
      }
      setStudent(selectedStudent);
    }
  }, [id]);

  if (!id || !student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/3 flex justify-center flex-col bg-red-100">
        <div className="flex justify-center text-center items-center ">
          <h1 className="text-3xl font-semibold mt-5">Edit Student:</h1>
        </div>
        <div>
          <div className="flex flex-col  space-y-5 ">
            <div className="flex  justify-around mt-10">
              <div>
                <p>Name: {student.name}</p>
              </div>
              <div>
                <button className="px-4 py-2 rounded-lg bg-gray-300">
                  edit
                </button>
              </div>
            </div>

            <div className="flex  justify-around  ">
              {" "}
              <p>Class: {student.class}</p>
              <button className="px-4 py-2 rounded-lg bg-gray-300">edit</button>
            </div>
            <div className="flex justify-around ">
              <p>Semester: {student.sem}</p>
              <button className="px-4 py-2 rounded-lg bg-gray-300">edit</button>
            </div>
            <div className="flex justify-around ">
              <p>Room: {student.roomno}</p>
              <button className="px-4 py-2 rounded-lg bg-gray-300">edit</button>
            </div>
          </div>

          {/* ... display other student details as needed */}
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
