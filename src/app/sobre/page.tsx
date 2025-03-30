import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { values, team } from '../constants';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative bg-blue-600">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About HenaWeb
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              Transforming ideas into digital reality, focusing on quality, innovation, and results.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Help businesses grow digitally by offering innovative and personalized technology solutions.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Our Values
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6"
                >
                  <div className="text-blue-600 mb-4">
                    {value.icon()}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Team
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400">
                    {member.role}
                  </p>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 