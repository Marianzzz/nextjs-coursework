import type { Metadata } from 'next'
import NewsContent from './components/news';

export const metadata: Metadata = {
  title: 'Головна сторінка',
  description: 'Головна сторінка Mugetsu',
}

export default function Home() {
  return (
    <div className='p-4 px-10'>
      <NewsContent />
    </div>
  );
}
