import { services } from '../constants';
import { Card, CardBody } from './ui/Card';
import { Section, SectionHeader } from './ui/Section';
import { Button } from './ui/Button';

const Services = () => {
  return (
    <Section>
      <SectionHeader
        title="Our Services"
        description="Complete digital solutions to transform your business"
      />
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} variant="hover">
            <CardBody>
              <div className="text-primary-600 mb-4">
                {service.icon()}
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-secondary-500 dark:text-secondary-400 mb-4">
                {service.description}
              </p>
              <Button
                href={`/services#${service.id}`}
                variant="outline"
              >
                Learn More
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Services; 