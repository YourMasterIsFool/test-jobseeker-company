import { Link, Outlet } from "react-router"; // pastikan pakai 'react-router-dom'


function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow mb-6">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <nav className="flex space-x-8 text-lg font-medium">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Applicants
            </Link>
            <Link
              to="/candidate"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Candidates
            </Link>
            <Link
              to="/vacancy"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Vacancy
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
