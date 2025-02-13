import React, { useEffect, useState } from "react";
import useAxiosAuth from "../hooks/useAxiosAuth";
import { fetchStudents, Student } from "../services/StudentsServices";

const StudentsList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [ulbranch, setUlbranch] = useState<number>(1);
    const [status, setStatus] = useState<string>("pending");
    const [scholarship, setScholarship] = useState<string>("all");
    const [error, setError] = useState<string | null>(null);

    const axiosInstance = useAxiosAuth("admin", "password");

    useEffect(() => {
        const getStudents = async () => {
            try {
                const data = await fetchStudents(axiosInstance, ulbranch, status, scholarship);

                setStudents(data);
            } catch (err) {
                setError("Failed to fetch students");
            }
        };

        getStudents();
    }, [axiosInstance, ulbranch, status, scholarship]);

    return (
        <div>
            <h1>Student List</h1>

            {/* Dropdown for UL Branch */}
            <label>UL Branch:</label>
            <select value={ulbranch} onChange={(e) => setUlbranch(Number(e.target.value))}>
                <option value={1}>Branch 1</option>
                <option value={2}>Branch 2</option>
                <option value={3}>Branch 3</option>
            </select>

            {/* Dropdown for Status */}
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

            {/* Dropdown for Scholarships */}
            <label>Scholarship:</label>
            <select value={scholarship} onChange={(e) => setScholarship(e.target.value)}>
                <option value="all">All</option>
                <option value="scholarship1">Scholarship 1</option>
                <option value="scholarship2">Scholarship 2</option>
            </select>

            {error && <p>{error}</p>}

            <ul>
                {students.length > 0 ? (
                    <ul>
                        {students.map((student) => (
                            <li key={student.id}>
                                <strong>{student.firstName}</strong> - {student.email} (Status: {student.candidatures[0].status})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No students found.</p>
                )}
            </ul>
        </div>
    );
};

export default StudentsList;

