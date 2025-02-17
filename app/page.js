"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <Link href="/add">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add User</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="p-2 border-b">
            <div className="text-blue-600">{user.user}</div>
            <div className="text-blue-600">{user.interest}</div>
            <div className="text-blue-600">{user.age}</div>
            <div className="text-blue-600">{user.mobile}</div>
            <div className="text-blue-600">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
