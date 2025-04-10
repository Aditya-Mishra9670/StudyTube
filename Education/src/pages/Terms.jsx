import { ChevronRight } from "lucide-react";

const TermsOfUse = () => {
  return (
    <div className="bg-base-100  pt-16">
      <header className="max-w-4xl mx-auto px-6 py-8 border-b ">
        <h1 className="text-3xl font-bold mb-4 text-center">Terms of Use</h1>
        <p className="text-base  text-center">
          Welcome to StudyTube. By accessing or using our services, you agree to the terms outlined below. Please read them carefully.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4">User Responsibilities</h2>
          <p className="text-base  mb-4">
            By using our platform, you agree to the following responsibilities:
          </p>
          <ul className="space-y-2 pl-6 list-none">
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Provide accurate and up-to-date registration information.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Respect other users and maintain a safe and positive learning environment.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Use the platform solely for educational purposes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Content Policy</h2>
          <p className="text-base  mb-4">
            Our platform is dedicated to providing high-quality educational content:
          </p>
          <ul className="space-y-2 pl-6 list-none">
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Curated resources to help learners achieve their goals.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Certificates issued upon successful course completion.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Regularly updated content to ensure relevance.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Certifications</h2>
          <p className="text-base  mb-4">
            Upon completing a course, you will receive:
          </p>
          <ul className="space-y-2 pl-6 list-none">
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              A verified certificate of achievement.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Recognition of your skills and expertise.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              A digital badge for showcasing your accomplishments.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-base  mb-4">
            If you have questions or need assistance, please contact us:
          </p>
          <ul className="space-y-2 pl-6 list-none">
            <li className="flex items-start gap-2">
              <ChevronRight className=" w-5 h-5 mt-1" />
              Email: <a href="mailto:support@eduplatform.com" className="text-blue-500 underline">support@eduplatform.com</a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default TermsOfUse;
