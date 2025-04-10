import React from 'react';

const Contact = () => {
  return (
    <div className="mt-[65px] max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Contact Us</h1>
        <p className="text-base sm:text-lg mt-2 ">
          We'd love to hear from you! Reach out with any questions, feedback, or inquiries.
        </p>
      </header>

      <main className="space-y-6">
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold  sm:text-2xl">Get in Touch</h2>
          <p className="mt-2 text-sm sm:text-base text-base-content">
            Have any questions or need support? Fill out the form below, and we will get back to you as soon as possible.
          </p>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold  sm:text-2xl">Contact Form</h2>
          <form className="space-y-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base text-base-content">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-base-300 rounded mt-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm sm:text-base text-base-content">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-base-300 rounded mt-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm sm:text-base text-base-content">
                Your Message
              </label>
              <textarea
                id="message"
                className="w-full p-3 border border-base-300 rounded mt-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary"              >
                Send Message
              </button>
            </div>
          </form>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold  sm:text-2xl">Social Media</h2>
          <p className="mt-2 text-sm sm:text-base text-base-content">
            Stay connected with us on social media:
          </p>
          <ul className="flex space-x-4 mt-2">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-focus">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-focus">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-focus">
                Instagram
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold  sm:text-2xl">Contact Information</h2>
          <p className="mt-2 text-sm sm:text-base text-base-content">
            If you prefer to reach us via email, feel free to use the following address:
          </p>
          <address className="mt-2 text-sm sm:text-base text-base-content">
            Email: <a href="mailto:support@example.com" className="underline text-primary hover:text-primary-focus">support@example.com</a>
          </address>
        </section>
      </main>
    </div>
  );
};

export default Contact;
