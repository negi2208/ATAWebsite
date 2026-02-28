export const getGuestToken = () => {
  let token = localStorage.getItem("guest_token");

  if (!token) {
    // Fallback-safe UUID generator
    token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    localStorage.setItem("guest_token", token);
  }

  return token;
};
