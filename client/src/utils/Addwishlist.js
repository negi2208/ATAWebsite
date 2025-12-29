import { api } from "./api";
import { getGuestToken } from "./guest";

export const addToWishlist = async (product_id) => {
  const user_id = localStorage.getItem("user_id");
  const guest_token = getGuestToken();

  return api.post("/api/wishlist/add", {
    product_id,
    ...(user_id ? { user_id } : { guest_token }),
  });
};
