import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog | HenaWeb',
  description: 'Artigos sobre desenvolvimento web, tecnologia e inovação.',
};

// Dados simulados dos posts
const posts = [
  {
    id: 1,
    title: 'As últimas tendências em desenvolvimento web',
    excerpt: 'Descubra as tecnologias que estão revolucionando o desenvolvimento web em 2024.',
    date: '2024-04-01',
    image: '/images/blog/trends.jpg',
    category: 'Tecnologia',
  },
  {
    id: 2,
    title: 'Como melhorar o SEO do seu site',
    excerpt: 'Dicas práticas para otimizar seu site e melhorar seu posicionamento nos mecanismos de busca.',
    date: '2024-03-28',
    image: '/images/blog/seo.jpg',
    category: 'Marketing Digital',
  },
  {
    id: 3,
    title: 'A importância da acessibilidade web',
    excerpt: 'Entenda por que a acessibilidade é crucial para o sucesso do seu site.',
    date: '2024-03-25',
    image: '/images/blog/accessibility.jpg',
    category: 'Desenvolvimento',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Blog
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{post.category}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </time>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                >
                  Ler mais →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 