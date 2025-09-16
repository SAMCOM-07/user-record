import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type User } from "./types.tsx";
import Loading from "./Loading.tsx";

const Table = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://68c32307f9928dbf33f0cbd6.mockapi.io/api/users"
        );
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
        // console.log("Fetched user:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://68c32307f9928dbf33f0cbd6.mockapi.io/api/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user.id !== id));
      window.alert("User successfully deleted ✅");
    } catch (error) {
      console.error("Error deleting user:", error);
      window.alert("Error deleting user ❌");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-2xl mb-6 text-blue-900">
        USER TABLE
      </h1>
      <Link
        to={"/create"}
        className="px-3 py-1.5 rounded-tl-md rounded-br-md bg-blue-800 hover:bg-blue-900 text-white font-semibold transition"
      >
        Add User
      </Link>

      <table className="w-fit hidden lg:block rounded-md overflow-hidden shadow-md mt-4">
        <thead className="bg-blue-900">
          <tr>
            <th className="text-white p-3 text-center">S/N</th>
            <th className="text-white p-3 text-center">FIRSTNAME</th>
            <th className="text-white p-3 text-center">LASTNAME</th>
            <th className="text-white p-3 text-center">AGE</th>
            <th className="text-white p-3 text-center">GENDER</th>
            <th className="text-white p-3 text-center">EMAIL</th>
            <th className="text-white p-3 text-center">ACTION</th>
          </tr>
        </thead>

        {isLoading ? (
          <tbody>
            <tr className="">
              <td colSpan={7}>
                <Loading />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {users && users.length ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="even:bg-gray-100 hover:bg-blue-50 transition-colors "
                >
                  <td className="p-3 font-semibold text-center">{index + 1}</td>
                  <td className="p-3 font-semibold text-center">
                    {user.firstName}
                  </td>
                  <td className="p-3 font-semibold text-center">
                    {user.lastName}
                  </td>
                  <td className="p-3 font-semibold text-center">{user.age}</td>
                  <td className="p-3 font-semibold text-center">
                    {user.gender}
                  </td>
                  <td className="p-3 font-semibold space-x-2">
                    <span>{user.email}</span>
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
                  </td>
                  <td className="p-3 font-semibold text-center">
                    <div className="flex gap-2 items-center justify-center">
                      <Link
                        to={`/details/${user.id}`}
                        className="px-3 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold transition"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${user.id}`}
                        className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4">
                  No user found....
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
      {/* mobile view */}
      <div className="lg:hidden mt-4 space-y-4">
        {isLoading ? (<Loading />) : (users && users.length ? (
          users.map((user, index) => {
            return (
              <div key={index} className="w-full p-4 shadow-[0_0_5px_gray] rounded-md flex flex-col gap-2">
                <p className="flex justify-between font-bold text-sm">FIRSTNAME:<span className="font-medium text-base">{user.firstName}</span></p>
                <p className="flex justify-between font-bold text-sm">LASTNAME:<span className="font-medium text-base">{user.lastName}</span></p>
                <p className="flex justify-between font-bold text-sm">AGE:<span className="font-medium text-base">{user.age}</span></p>
                <p className="flex justify-between font-bold text-sm">GENDER:<span className="font-medium text-base">{user.gender}</span></p>
                <p className="flex justify-between font-bold text-sm">EMAIL:<span className="font-medium text-base">{user.email}</span> </p>
                <p className="flex justify-between font-bold text-sm items-center">ACTION:<span className="flex font-medium text-base gap-2 items-center justify-center">
                  <Link
                    to={`/details/${user.id}`}
                    className="px-2 py-0.5 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold transition"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${user.id}`}
                    className="px-2 py-0.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-2 py-0.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                  >
                    Delete
                  </button>
                </span></p>
              </div>
            )
          })
        ) : (
          <p className="text-center">No user found....</p>
        ))}

      </div>
    </div>
  );
};

export default Table;
