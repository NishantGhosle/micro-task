"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: "",
    interest: "",
    age: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:5000/users", {
        ...formData,
        interest: formData.interest.split(","),
        age: parseInt(formData.age),
        mobile: parseInt(formData.mobile),
      });
      router.push("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="user" placeholder="Name" className="border p-2 w-full" onChange={handleChange} required />
        <input name="interest" placeholder="Interests (comma-separated)" className="border p-2 w-full" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" className="border p-2 w-full" onChange={handleChange} required />
        <input name="mobile" type="number" placeholder="Mobile" className="border p-2 w-full" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full" onChange={handleChange} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
