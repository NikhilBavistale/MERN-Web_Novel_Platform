import { useSelector } from "react-redux";
import { Button, Label, Textarea } from "flowbite-react";
import { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl font-bold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* Profile Picture  */}
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="h-30 w-30 self-center cursor-pointer rounded-full object-cover mt-2"
        />

        {/* first row contains username and email */}
        <div className="flex gap-8">
          {/* Username  */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <input
              id="username"
              type="text"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          {/* Email address  */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email Address" />
            </div>
            <input
              id="email"
              type="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        </div>

        {/* second row containing country & Date of Birth */}
        <div className="flex gap-8">
          {/* Select field for country  */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="country" value="Country" />
            </div>
            <select
              id="country"
              defaultValue={currentUser.country}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              {/* Add options for countries */}
              <option value="USA">United States of America</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Japan">Japan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date of Birth  */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="dob" value="Date of Birth" />
            </div>

            <input
              id="dob"
              type="date"
              defaultValue={currentUser.dob}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
        </div>

        {/* third row containing profile picture and about me */}
        <div className="flex gap-8">
          {/* About me section */}
          <div className="lg:w-1/2 ">
            <div className="mb-2 block">
              <Label htmlFor="aboutMe" value="About Me" />
            </div>

            <Textarea
              id="aboutMe"
              defaultValue={currentUser.aboutMe}
              onChange={handleChange}
              placeholder="Write your bio..."
              required
              className="w-full"
              rows={6}
            />
          </div>
        </div>
        <Button type="submit" className="mt-10">
          Save
        </Button>
        <div className='flex justify-between mt-5'>
        <span
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      </form>
    </div>
  );
};

export default Profile;
