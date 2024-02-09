import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      {/* Left Section */}
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Section */}
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Sign Up to Create your account
          </h1>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                placeholder="Enter Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <input
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                id="password"
                onChange={handleChange}
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <p className="text-red-600 text-base">
            {error && "somthing went wrong"}
          </p>
          {/* Sign In Link */}
          <p className="mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
