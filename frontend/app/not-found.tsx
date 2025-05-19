export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 text-center">
      <h1 className="text-7xl font-extrabold text-green-500 drop-shadow-md">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">Oops! Page not found.</p>
      <p className="mt-2 text-gray-600 max-w-md">
        The page you're looking for might have been removed or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-8 py-3 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 transition-all duration-200"
      >
        Go Back Home
      </a>
    </div>
  );
}
