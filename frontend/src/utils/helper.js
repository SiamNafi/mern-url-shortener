import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api.js";
import { login } from "../store/slice/authSlice.js";

export const checkAuth = async ({ context }) => {
  const { queryClient, store } = context;

  try {
    const user = await queryClient.fetchQuery({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
      retry: false,
    });

    if (!user) {
      return redirect({ to: "/auth" });
    }

    // Sync user with Redux store
    store.dispatch(login(user));

    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) {
      return redirect({ to: "/auth" });
    }

    return true; // authenticated ✅
  } catch (error) {
    console.error("Auth check failed:", error.message);
    return redirect({ to: "/auth" });
  }
};
