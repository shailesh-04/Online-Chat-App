import React, { useState } from "react";
import toast from "react-hot-toast";
import { register } from "@services/user";
import { Link, useNavigate } from "react-router-dom";
import SpinnerButton from "@components/ButtonSpinner";
const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "Name is required";
        else if (formData.name.length < 3)
            newErrors.name = "Name must be at least 3 characters";

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
            const toastId = toast.loading("Registering...");
            try {
                const res = await register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                toast.success(res.message, {
                    id: toastId,
                });
                navigate("/");
            } catch (error) {
                toast.error(error?.data?.message || "Registration failed!", {
                    id: toastId,
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
            {/* Registration Card */}
            <div className="w-[500px] animate-fade-in-up z-10 backdrop-blur-md p-10 rounded-xl border">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#fff] mb-2">
                        Create an Account
                    </h2>
                    <p className="text-[#ddd] text-sm">
                        Please enter your details to register
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="space-y-6"
                >
                    {/* Name Field */}
                    <div
                        className={`space-y-2 ${
                            errors.name ? "animate-shake" : ""
                        }`}
                    >
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-[#fff]"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            placeholder="name"
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-[#DDDDDD]"
                            } focus:outline-none focus:ring-2 focus:ring-[#764BA2] focus:border-transparent transition-all`}
                        />
                        {errors.name && (
                            <span className="block text-xs text-red-500 mt-1">
                                {errors.name}
                            </span>
                        )}
                    </div>

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
                            placeholder="email"
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

                    {/* Password Field */}
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
                            placeholder="password"
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
                    <SpinnerButton
                        isLoading={isSubmitting}
                        loadingText="Registring..."
                    >
                        Register
                    </SpinnerButton>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-[#fff]">
                    <p>
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="text-[#caace9] font-semibold hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
