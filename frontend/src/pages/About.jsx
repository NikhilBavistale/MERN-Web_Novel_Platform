import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleButtonClick = () => {
    navigate("/sign-up"); // Navigate to sign-up page
  };
  const handleHomeClick = () => {
    navigate("/"); // Navigate to home page
  };
  return (
    <div className="bg-gray-100 px-4 lg:px-24 min-h-screen">
      <header className="bg-blue-500 text-white py-8 px-4">
        <h1 className="text-4xl font-bold text-center">Mystic Codex</h1>
        <p className="text-lg text-center">
          Explore a Digital Oasis for Storytellers and Readers
        </p>
      </header>

      {/* Company's Journey */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Company's Journey
          </h2>
          <p className="text-lg text-gray-700">
            At Mystic Codex, we embarked on a journey fueled by our passion for
            storytelling and our determination to create a platform where
            imagination knows no bounds. Our humble beginnings in the world of
            web novel platforms have blossomed into a reliable and innovative
            hub for both aspiring and seasoned writers to dive into the realm of
            digital storytelling.
          </p>
        </div>
      </section>

      {/* Purpose and Goals */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Purpose and Goals
          </h2>
          <p className="text-lg text-gray-700">
            Our ultimate purpose is to provide a haven for storytellers and
            readers alike, offering a seamless platform where creative minds can
            showcase their literary prowess and enthusiasts can indulge in
            captivating narratives. We strive to foster a vibrant and engaging
            community that thrives on the power of imagination.
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>
              Empowering writers to unleash their creativity and share their
              stories with a global audience.
            </li>
            <li>
              Enriching the reading experience by curating a vast collection of
              original and diverse content.
            </li>
            <li>
              Fostering a supportive community that encourages constructive
              feedback and collaboration.
            </li>
          </ul>
        </div>
      </section>

      {/* Introduction to the Team */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Introduction to the Team
          </h2>
          <p className="text-lg text-gray-700">
            Behind Mystic Codex, a team of passionate minds works tirelessly to
            bring our vision to life. Our dedicated team comprises experienced
            web developers, digital designers, and literary enthusiasts who
            share a common love for nurturing creativity. Together, we strive to
            create an exceptional platform tailored to the needs of both writers
            and readers.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Offerings</h2>
          <p>
            Mystic Codex offers a comprehensive suite of features designed to
            cater to the needs of both authors and avid readers.
          </p>
          <ul>
            <li>
              Creation Tools: Equipped with intuitive writing tools, authors can
              unleash their imagination and craft captivating stories
              seamlessly. From organizing chapters to customizing formatting,
              our user-friendly interface allows writers to focus solely on
              their creativity.
            </li>
            <li>
              Wide-ranging Genres: Dive into a world of diverse genres, from
              spine-tingling mysteries to epic fantasies. Our platform hosts an
              extensive range of categories, ensuring there's a story waiting
              for every reader, no matter their preference.
            </li>
            <li>
              Reader Engagement: Interact with writers and fellow enthusiasts
              through comments, ratings, and discussions. Our platform
              encourages vibrant conversations, forging connections between
              authors and readers.
            </li>
            <li>
              Publication Opportunities: Stand out in the literary world by
              showcasing your talent on Mystic Codex. Gain recognition within a
              growing community of passionate readers and talented writers.
              Opportunities for collaboration with other authors or publication
              options are also available.
            </li>
          </ul>
        </div>
      </section>

      {/* Customer Opinions */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Customer Opinions
          </h2>
          {/* Add Customer Opinions content here */}
          <p>
            Don't just take our word for it—here's what some of our valued users
            have to say about their experience with Mystic Codex:
          </p>
          <blockquote>
            <p>
              "Mystic Codex has truly become my sanctuary for inspiration. The
              platform's vast selection of stories and the ability to connect
              with writers has ignited my passion for reading and writing like
              never before." - Sarah, avid reader.
            </p>
            <p>
              "As an aspiring writer, Mystic Codex has provided me with the
              perfect platform to showcase my work. The supportive community and
              access to valuable feedback have been instrumental in my growth as
              a writer." - James, aspiring author.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Achievements
          </h2>
          {/* Add Achievements content here */}
          <p>
            Mystic Codex takes immense pride in the accomplishments we've
            achieved since our inception. Some notable achievements include:
          </p>
          <ul>
            <li>
              Hosting thousands of captivating stories from talented authors
              worldwide.
            </li>
            <li>
              Garnering a thriving community of passionate readers and writers.
            </li>
            <li>
              Collaborating with renowned publishing houses to provide
              publication opportunities for exceptional authors discovered on
              Mystic Codex.
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
          <p className="text-lg mb-8">
            Join Mystic Codex today and become part of a vibrant community that
            celebrates the art of storytelling.
          </p>
          {currentUser ? (
            <button
              onClick={handleHomeClick}
              className="bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-blue-200 hover:text-white transition duration-300 ease-in-out"
            >
              Go to Home
            </button>
          ) : (
            <button
              onClick={handleButtonClick}
              className="bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-blue-200 hover:text-white transition duration-300 ease-in-out"
            >
              Sign Up Now
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
