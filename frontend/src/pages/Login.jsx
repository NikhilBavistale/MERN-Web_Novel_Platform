import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import ToastComponent from "../components/ToastComponent";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [userSuccess, setUserSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(loginFailure("Please fill all the fields"));
    }
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
      }

      if (res.ok) {
        dispatch(loginSuccess(data));
        setUserSuccess("Login successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* right  */}
      <div
        className="w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            Sign In to your account
          </h1>
          <div className="flex-1 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              <div>
                <TextInput
                  type="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                />
              </div>

              <div className="mt-4">
                <TextInput
                  type="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="***************"
                  minLength="6"
                  required
                />
              </div>

              <Button
                disabled={loading}
                type="submit"
                gradientDuoTone="purpleToPink"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            <OAuth />

            <div className="flex gap-2 text-sm mt-5">
              <span>Dont Have an account?</span>
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </div>
            {userSuccess && (
              <div className="fixed bottom-5 left-5">
                <ToastComponent message={userSuccess} type="success" />
              </div>
            )}
            {errorMessage && (
              <div>
                <ToastComponent message={errorMessage} type="error" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
