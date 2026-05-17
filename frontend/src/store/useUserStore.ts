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
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
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
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error: any) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during logout";

      toast.error(errorMessage);
    }
  },
}));