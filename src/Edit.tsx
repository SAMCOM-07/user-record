import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://68c32307f9928dbf33f0cbd6.mockapi.io/api/users/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAge(data.age);
        setGender(data.gender);
        setEmail(data.email);
        // console.log("Fetched user:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserDetails();
  }, [id]);

  const updateUserDetails = async () => {
      try {
        const response = await fetch(
          `https://68c32307f9928dbf33f0cbd6.mockapi.io/api/users/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName,
              lastName,
              age: age === "" ? 0 : age,
              gender,
              email,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add user");
        }
        window.alert("User Details Updated Successfully ✅");
        navigate("/");
        // console.log(data);
      } catch (error) {
        console.error("Error updating user details:", error);
        window.alert("Error updating user details ❌");
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateUserDetails();
    };

  return (
    <div>
      <div className="w-full">
        <h1 className="text-center font-bold text-2xl mb-6 text-blue-900">
          EDIT USER DETAILS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">First Name:</span>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Enter first name"
            />
          </label>
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">Last Name:</span>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Enter last name"
            />
          </label>
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">Age:</span>
            <input
              onChange={(e) => {
                const val = e.target.value;
                setAge(val === "" ? "" : Number(val));
              }}
              value={age}
              type="number"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="input your age"
            />
          </label>
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">Email:</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Enter your email"
            />
          </label>
          <label className="flex flex-col w-42 gap-1 font-medium">
            <span className="mb-1 font-bold">Gender:</span>
            {/* <input onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Enter your gender"
            /> */}
            <select
              name=""
              id=""
              required
              className="text-gray-700 outline-0"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option defaultChecked value="">
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="homosexual">Homosexual</option>
            </select>
          </label>

          <div className="space-x-4 mt-8">
            <button
              type="submit"
              onClick={() => {
                // addUser();
                // navigate('/');
              }}
              className="cursor-pointer px-3 py-1.5 rounded-md text-semibold text-white bg-blue-900"
            >
              Update
            </button>
            <Link
              to={"/"}
              className="px-3 py-1.5 rounded-md text-semibold text-white bg-red-500"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
