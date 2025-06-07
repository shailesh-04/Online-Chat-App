import { useAuth } from "@context/Auth";
import { useNavigate,Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Auto-redirect after 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => navigate(-1), 8000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const getCustomMessage = () => {
        if (isAuthenticated) {
            return "The page you requested doesn't exist in your authorized area.";
        }
        return "You might need to login to access this page.";
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-brp-4 z-10">
            <div className="max-w-md w-full backdrop-blur-md p-10 rounded-xl shadow-lg text-center animate-fade-in-up">
                {/* Animated 404 Icon */}
                <div className="relative inline-block mb-6 animate-bounce">
                    <div className="absolute -inset-4 bg-red-100 rounded-full opacity-70 animate-pulse"></div>
                    <div className="relative flex items-center justify-center w-24 h-24  text-white text-4xl font-bold rounded-full mx-auto">
                        404
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3 animate-fade-in-down">
                    Page Not Found
                </h1>
                
                <p className="text-[#fff] mb-6 animate-fade-in-up delay-100">
                    {getCustomMessage()}
                </p>

                {/* Animated Search Icon */}
                <div className="mb-8 flex justify-center animate-wiggle">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 text-[#c2c3f1]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go Back
                    </button>
                    
                    <Link
                        to="/"
                        className="block w-full px-6 py-3 border border-indigo-600 text-white rounded-lg hover:bg-indigo-50  hover:text-indigo-600 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go to Homepage
                    </Link>
                </div>

                <p className="mt-6 text-sm text-gray-500 animate-fade-in-up delay-200">
                    You'll be redirected back automatically in 8 seconds...
                </p>
            </div>
        </div>
    );
};

export default NotFound;