import React from 'react';

const Privacy = () => {
  return (
    <div className="mt-[65px] max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Privacy Policy</h1>
        <p className="text-base sm:text-lg mt-2">
          This Privacy Policy explains how we collect, use, and protect your information when you use our website.
        </p>
      </header>

      <main className="space-y-6">
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Information We Collect</h2>
          <p className="mt-2 text-sm sm:text-base">
            We collect personal information when you register, sign in, or interact with our website. This may include your name, email address, and browsing activity.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">How We Use Your Information</h2>
          <p className="mt-2 text-sm sm:text-base">We use your information to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Provide personalized content and recommendations.</li>
            <li>Enhance the functionality of our website.</li>
            <li>Communicate with you regarding updates and offers.</li>
          </ul>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">How We Protect Your Information</h2>
          <p className="mt-2 text-sm sm:text-base">
            We implement industry-standard security measures to protect your information from unauthorized access, alteration, or destruction.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Sharing Your Information</h2>
          <p className="mt-2 text-sm sm:text-base">
            We do not share your personal information with third parties, except for service providers who assist in running the website or as required by law.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Your Rights</h2>
          <p className="mt-2 text-sm sm:text-base">
            You have the right to access, update, and delete your personal information. You can also request to opt out of communications from us at any time.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Cookies and Tracking</h2>
          <p className="mt-2 text-sm sm:text-base">
            We use cookies and similar tracking technologies to enhance user experience and analyze website traffic. You can manage cookies in your browser settings.
          </p>
        </section>

        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold sm:text-2xl">Changes to This Policy</h2>
          <p className="mt-2 text-sm sm:text-base">
            We may update this Privacy Policy from time to time. Please check this page periodically to stay informed about how we protect your privacy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold sm:text-2xl">Contact Us</h2>
          <p className="mt-2 text-sm sm:text-base">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <address className="mt-2 text-sm sm:text-base">
            Email: <a href="mailto:support@example.com" className="underline">support@example.com</a>
          </address>
        </section>
      </main>
    </div>
  );
};

export default Privacy;
