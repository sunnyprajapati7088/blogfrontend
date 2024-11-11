import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to Blogify</h1>
          <p className="mt-4 text-lg md:text-xl">
            Discover articles, insights, and stories on topics that matter to
            you.
          </p>
          <Link
            to="/blogs"
            className="mt-8 inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose Blogify?
          </h2>
          <p className="mt-2 text-gray-600">
            A place to find high-quality, informative, and insightful content.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-indigo-600">
                Diverse Topics
              </h3>
              <p className="mt-2 text-gray-600">
                Explore articles from tech, lifestyle, health, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-indigo-600">
                Expert Writers
              </h3>
              <p className="mt-2 text-gray-600">
                Read content created by professionals and enthusiasts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-indigo-600">
                Community Driven
              </h3>
              <p className="mt-2 text-gray-600">
                Join a community of curious readers and writers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
   { //   <section className="py-16">
    //     <div className="max-w-7xl mx-auto px-6 text-center">
    //       <h2 className="text-3xl font-bold text-gray-800">Latest Blogs</h2>
    //       <p className="mt-2 text-gray-600">
    //         Read our latest and most popular blogs.
    //       </p>

    //       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    //           <h3 className="text-2xl font-bold text-indigo-600">
    //             Blog Title 1
    //           </h3>
    //           <p className="mt-2 text-gray-600">
    //             A brief description of the blog. Capture the readers attention
    //             with a short preview.
    //           </p>
    //           <Link
    //             to="/blogs/1"
    //             className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
    //           >
    //             Read More →
    //           </Link>
    //         </div>
    //         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    //           <h3 className="text-2xl font-bold text-indigo-600">
    //             Blog Title 2
    //           </h3>
    //           <p className="mt-2 text-gray-600">
    //             A brief description of the blog. Capture the readers attention
    //             with a short preview.
    //           </p>
    //           <Link
    //             to="/blogs/2"
    //             className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
    //           >
    //             Read More →
    //           </Link>
    //         </div>
    //         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    //           <h3 className="text-2xl font-bold text-indigo-600">
    //             Blog Title 3
    //           </h3>
    //           <p className="mt-2 text-gray-600">
    //             A brief description of the blog. Capture the readers attention
    //             with a short preview.
    //           </p>
    //           <Link
    //             to="/blogs/3"
    //             className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-700"
    //           >
    //             Read More →
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
        //   </section>
      }

      {/* Call-to-Action Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="mt-2 text-lg">
            Sign up to stay updated with the latest blogs and news!
          </p>
          <Link
            to="/blogs"
            className="mt-8 inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
