import { UserProfile } from "@/DataTypes/Profile";
import { api } from "./Api";



export async function getProfile() {
  try {
    const { data } = await api.get("/api/users/profile");
    if (!data?.success) {
      throw new Error((data as any)?.error || "Failed to fetch profile");
    }
    return data.profile;
  } catch (err: any) {
    throw new Error(err?.message || "Could not fetch user's data");
  }
}

export async function updateProfile(params: Omit<UserProfile, "id">) {
  try {

    const { data } = await api.put("/api/users/profile", {
      profile: params,
    });
    if (!data?.success) {
      throw new Error((data as any)?.error || "Failed to update profile");
    }
    return data.message;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to update profile");
  }
}
