import React, { useEffect, useState } from "react";
import { type User } from "./types.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState<User | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://68c32307f9928dbf33f0cbd6.mockapi.io/api/users/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-6 text-blue-900">
        USER DETAILS
      </h1>
      {details && (
        <div className="space-y-2 mb-6">
          <p className="font-bold text-lg">
            First Name:{" "}
            <span className="ml-4 text-gray-500 font-medium">
              {details.firstName}
            </span>
          </p>
          <p className="font-bold text-lg">
            Last Name:{" "}
            <span className="ml-4 text-gray-500 font-medium">
              {details.lastName}
            </span>
          </p>
          <p className="font-bold text-lg">
            Age:{" "}
            <span className="ml-4 text-gray-500 font-medium">
              {details.age}
            </span>
          </p>
          <p className="font-bold text-lg">
            Gender:{" "}
            <span className="ml-4 text-gray-500 font-medium">
              {details.gender}
            </span>
          </p>
          <p className="font-bold text-lg flex">
            Email:
            <span className="ml-4 text-gray-500 flex gap-2 font-medium">
              <span>{details.email}</span>
                    <button
                      type="button"
                      className="text-blue-600 cursor-pointer hover:text-blue-900 text-xs border border-blue-600 rounded px-2 py-0.5"
                      onClick={() => {
                        navigator.clipboard.writeText(user.email);
                        alert("Email copied to clipboard!");
                      }}
                      title="Copy email"
                    >
                      Copy
                    </button>
            </span>
          </p>
        </div>
      )}
      <Link
        to={"/"}
        className="px-3 py-1.5 rounded-md text-semibold text-white bg-red-500"
      >
        Back
      </Link>
    </div>
  );
};

export default Details;
