import Image from 'next/image';
import { testimonials } from '../constants';
import { Card, CardBody } from './ui/Card';
import { Section, SectionHeader } from './ui/Section';

const Testimonials = () => {
  return (
    <Section variant="dark">
      <SectionHeader
        title="O que nossos clientes dizem"
      />
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-secondary-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-secondary-600 dark:text-secondary-300">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials; 