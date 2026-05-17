import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import { AuthCard } from "../components/Auth/AuthCard";
import { Input } from "../components/Auth/Input";
import { Button } from "../components/Auth/Button";
import { useUserStore } from "../store/useUserStore";

const SignUpPage = () => {
  const { signup, loading } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <AuthCard title="Create your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="name"
          label="Full name"
          type="text"
          icon={User}
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
        />

        <Input
          id="email"
          label="Email address"
          type="email"
          icon={Mail}
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          icon={Lock}
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="••••••••"
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          icon={Lock}
          required
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="••••••••"
        />

        <Button type="submit" loading={loading} icon={UserPlus}>
          Sign up
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          Login here <ArrowRight className="inline h-4 w-4" />
        </Link>
      </p>
    </AuthCard>
  );
};

export default SignUpPage;
