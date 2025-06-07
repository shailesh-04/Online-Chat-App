import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@context/Auth";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const res = await login({
                    email: formData.email,
                    password: formData.password,
                });
                toast.success(res.message);
                navigate("/");
            } catch (error) {
                console.error(error);
                toast.error(error?.message || "Invalid Email or Password!", {
                    style: {
                        background: "#FF4D4F",
                        color: "#FFFFFF",
                    },
                    iconTheme: {
                        primary: "#FFFFFF",
                        secondary: "#FF4D4F",
                    },
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error("Please fix the errors in the form");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-5 z-10">
            {/* Login Card */}
            <div className=" w-[500px] animate-fade-in-up z-10 backdrop-blur-md p-10 rounded-xl border">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#fff] mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-[#ddd] text-sm">
                        Please enter your credentials to login
                    </p>
                </div>
                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
                    {/* Email Field */}
                    <div
                        className={`space-y-2 ${
                            errors.email ? "animate-shake" : ""
                        }`}
                    >
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-[#fff]"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            placeholder="Type Email..."
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-[#DDDDDD]"
                            } focus:outline-none focus:ring-2 focus:ring-[#764BA2] focus:border-transparent transition-all`}
                        />
                        {errors.email && (
                            <span className="block text-xs text-red-500 mt-1">
                                {errors.email}
                            </span>
                        )}
                    </div>
                    <div
                        className={`space-y-2 ${
                            errors.password ? "animate-shake" : ""
                        }`}
                    >
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-[#fff]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Type Password..."
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-[#DDDDDD]"
                            } focus:outline-none focus:ring-2 focus:ring-[#764BA2] focus:border-transparent transition-all`}
                        />
                        {errors.password && (
                            <span className="block text-xs text-red-500 mt-1">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-lg bg-[#764BA2] text-white font-semibold text-lg hover:bg-[#655885] hover:translate-y-[-2px] transition-all duration-300 ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-[#fff]">
                    <p>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#caace9] font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
