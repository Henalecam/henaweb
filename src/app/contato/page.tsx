import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';
import { Section, SectionHeader } from '../components/ui/Section';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <Section>
          <Container>
            <SectionHeader
              title="Get in Touch"
              description="We're ready to help with your digital needs. Choose your preferred way to contact us."
            />

            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Email
                      </h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        henriquealexandredec@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Phone
                      </h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        +55 (41) 99915-5948
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary-600 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Business Hours
                      </h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Monday to Friday: 9am to 6pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Contact />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
} 