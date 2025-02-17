"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserDetail({ params }) {
  const { id } = params;
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{user.user}</h1>
      <p><strong>Interests:</strong> {user.interest.join(", ")}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete</button>
    </div>
  );
}
