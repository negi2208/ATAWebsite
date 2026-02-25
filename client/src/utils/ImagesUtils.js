export const resolveImageUrl = (path) => {
  if (!path) return "/images/placeholder.jpg";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // handle /uploads OR uploads
  if (path.includes("uploads")) {
    const cleanPath = path.replace(/^\/+/, "").replace(/\\/g, "/");
    return `${import.meta.env.VITE_API_URL}/${cleanPath}`;
  }

  return path;
};