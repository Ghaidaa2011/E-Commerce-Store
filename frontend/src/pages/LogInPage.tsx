import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { AuthCard } from "../components/Auth/AuthCard";
import { Input } from "../components/Auth/Input";
import { Button } from "../components/Auth/Button";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <AuthCard title="Log in to your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          label="Email address"
          type="email"
          icon={Mail}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          icon={Lock}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Button type="submit" loading={loading} icon={LogIn}>
          Login
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-400">
        Not a member?{" "}
        <Link
          to="/signup"
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          Sign up now <ArrowRight className="inline h-4 w-4" />
        </Link>
      </p>
    </AuthCard>
  );
};

export default LogInPage;
