import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import studentdata from "./../../data/StudentDetails.json";
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
    <div>
      <h1>Edit Student {id}</h1>
      <p>Name: {student.name}</p>
      <p>Class: {student.class}</p>
      {/* ... display other student details as needed */}
    </div>
  );
};

export default EditStudent;
