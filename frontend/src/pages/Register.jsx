import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      {/* Left Section */}
      <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Section */}
      <div
        className="w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            Sign Up to Create account
          </h1>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <TextInput
                type="text"
                id="username"
                onChange={handleChange}
                placeholder="Enter Username"
                required
              />
            </div>

            <div className="mt-4">
              <TextInput
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Enter Email Address"
                autoFocus
                required
              />
            </div>

            <div className="mt-4">
              <TextInput
                type="password"
                id="password"
                onChange={handleChange}
                placeholder="Enter Password"
                minLength="6"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="*"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
          <OAuth />

          {/* Sign In Link */}
          <p className="mt-8">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login Here
            </Link>
          </p>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
}
