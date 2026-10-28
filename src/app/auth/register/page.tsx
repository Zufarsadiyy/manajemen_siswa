"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Key,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function HomePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!acceptedTerms) {
      alert("You must accept the terms and conditions to register.");
      return;
    }

    if (
      !formData.password ||
      formData.password !== formData.confirmPassword
    ) {
      alert("Password do not match");
      return;
    }

    console.log("Form submitted:", formData);
    router.push("/auth/login");
  };

  const getPasswordStrength = (password: string) => {
    if (password.length >= 12) {
      return { text: "strong", color: "text-green-600" };
    }
    if (password.length >= 8) {
      return { text: "Medium", color: "text-yellow-600" };
    }
    if (password.length <= 6) {
      return { text: "Weak", color: "text-red-600" };
    }
    return { text: "", color: "" };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const isFormValid =
    acceptedTerms &&
    formData.password &&
    formData.password === formData.confirmPassword;

  return (
    <div className="fixed inset-0 z-[100] min-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-md items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-blue-600/10" />
          <div className="relative z-10">
            <a
              href="/auth/login"
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </a>

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/5 to-blue-600/100 shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join us today! It takes only a few steps.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email Address"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Your Password"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div
                    className={`mt-1 text-sm font-medium ${passwordStrength.color}`}
                  >
                    {passwordStrength.text}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div>
                    {formData.password !== formData.confirmPassword ? (
                      <div className="mt-1 text-sm font-medium text-red-600">
                        Password do not match
                      </div>
                    ) : (
                      <div className="mt-1 text-sm font-medium text-green-600">
                        Password match
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600"
                >
                  I agree to the terms and conditions
                </label>
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-3 font-medium text-white shadow-lg transition hover:from-blue-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Register
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
                    className="text-blue-600 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}