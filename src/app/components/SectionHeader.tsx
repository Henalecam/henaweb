interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
        {title}
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
} 