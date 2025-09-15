import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const response = await fetch(
        "https://68c32307f9928dbf33f0cbd6.mockapi.io/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data, age: data.age === "" ? 0 : Number(data.age)
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      window.alert("User added Successfully ✅");
      navigate("/");
      // console.log(data);
    } catch (error) {
      console.error("Error adding user:", error);
      window.alert("Error adding user ❌");
    }
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="text-center font-bold text-2xl mb-6 text-blue-900">
          ADD NEW USER
        </h1>

        <form action={handleSubmit} className="space-y-4">
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">First Name:</span>
            <input
              name="firstName"
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Enter first name"
            />
          </label>
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">Last Name:</span>
            <input
              name="lastName"
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Enter last name"
            />
          </label>
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">Age:</span>
            <input
              name="age"
              type="number"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="input your age"
            />
          </label>
          <label className="flex flex-col gap-1 font-medium">
            <span className="mb-1 font-bold">Email:</span>
            <input
              name="email"
              type="email"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
              placeholder="Enter your email"
            />
          </label>
          <label className="flex flex-col w-42 gap-1 font-medium">
            <span className="mb-1 font-bold">Gender:</span>
            <select
              name="gender"
              id=""
              required
              className="text-gray-700 outline-0">
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
              className="cursor-pointer px-3 py-1.5 rounded-md text-semibold text-white bg-blue-900"
            >
              Add
            </button>
            <Link
              to={"/"}
              className="px-3 py-1.5 rounded-md text-semibold text-white bg-red-500"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;