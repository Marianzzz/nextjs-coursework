import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Головна сторінка',
  description: 'Головна сторінка Mugetsu',
}

export default function Home() {
  return (
   <h1>Головна сторінка</h1>
  );
}
