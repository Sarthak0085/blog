import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center my-10 mb-16 py-2">
            <div className="mt-12 animate-spin">
                <svg
                    className="w-64 h-64 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16l4-4-4-4" />
                </svg>
            </div>
            <h1 className="text-6xl font-extrabold text-red-500">404</h1>
            <p className="mt-4 text-2xl text-gray-600">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            <div className="mt-6">
                <Link
                    href="/"
                    className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};
