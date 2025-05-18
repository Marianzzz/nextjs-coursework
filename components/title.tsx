export default function Title({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <h1 className='text-center mt-4 text-2xl font-bold text-gray-800'>{children}</h1>
}