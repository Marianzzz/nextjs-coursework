import type { Metadata } from 'next'
import Title from '@/components/title';
 
export const metadata: Metadata = {
  title: 'Головна сторінка',
  description: 'Головна сторінка Mugetsu',
}

export default function Home() {
  return (
   <Title>Головна сторінка</Title>
  );
}
