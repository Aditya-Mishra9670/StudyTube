import React from 'react';

const Cookies = () => {
  return (
    <div className="mt-[65px] max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Cookies Policy</h1>
        <p className="text-base sm:text-lg mt-2">
          This Cookies Policy explains how our website uses cookies to improve your browsing experience.
        </p>
      </header>

      <main className="space-y-6">
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">What Are Cookies?</h2>
          <p className="mt-2 text-sm sm:text-base">
            Cookies are small text files stored on your device when you visit a website. They help the website function effectively and provide a better user experience.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">How We Use Cookies</h2>
          <p className="mt-2 text-sm sm:text-base">Our website uses cookies to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Enhance website functionality and performance.</li>
            <li>Remember your preferences and settings.</li>
            <li>Analyze site traffic to improve content and usability.</li>
          </ul>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Types of Cookies We Use</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> Necessary for the website to function properly.
            </li>
            <li>
              <strong>Performance Cookies:</strong> Collect information about how users interact with the website.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember user preferences and enhance the user experience.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us analyze and improve the website's performance.
            </li>
          </ul>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Managing Cookies</h2>
          <p className="mt-2 text-sm sm:text-base">
            You can manage cookies through your browser settings. Most browsers allow you to block or delete cookies.
            However, disabling cookies may impact the functionality of the website.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Third-Party Cookies</h2>
          <p className="mt-2 text-sm sm:text-base">
            Our website may use cookies from third-party services, such as analytics providers, to enhance your experience. These cookies are governed by the respective third parties' policies.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Updates to This Policy</h2>
          <p className="mt-2 text-sm sm:text-base">
            We may update this Cookies Policy from time to time. Please review this page periodically to stay informed about how we use cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold sm:text-2xl">Contact Us</h2>
          <p className="mt-2 text-sm sm:text-base">
            If you have any questions about this Cookies Policy, please contact us at:
          </p>
          <address className="mt-2 text-sm sm:text-base">
            Email: <a href="mailto:support@example.com" className="underline">support@example.com</a>
          </address>
        </section>
      </main>
    </div>
  );
};

export default Cookies;
