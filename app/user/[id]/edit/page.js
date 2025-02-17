"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditUser({ params }) {
  const { id } = params;
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: "",
    interest: "",
    age: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        ...formData,
        interest: formData.interest.split(","),
        age: parseInt(formData.age),
        mobile: parseInt(formData.mobile),
      });
      router.push("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="user" value={formData.user} className="border p-2 w-full" onChange={handleChange} required />
        <input name="interest" value={formData.interest} className="border p-2 w-full" onChange={handleChange} required />
        <input name="age" type="number" value={formData.age} className="border p-2 w-full" onChange={handleChange} required />
        <input name="mobile" type="number" value={formData.mobile} className="border p-2 w-full" onChange={handleChange} required />
        <input name="email" type="email" value={formData.email} className="border p-2 w-full" onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
