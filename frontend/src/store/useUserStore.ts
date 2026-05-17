import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}
interface SignupFormData {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}
interface UserState {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  signup: (formData: SignupFormData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return
    }

    try {
      const res = await axios.post<User>("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
    } catch (error: any) {
      set({ loading: false });
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";

      toast.error(errorMessage);
    }
  },
  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post<User>("/auth/login", { email, password });
      set({ user: res.data, loading: false });
    } catch (error: any) {
      set({ loading: false });
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  },
}));