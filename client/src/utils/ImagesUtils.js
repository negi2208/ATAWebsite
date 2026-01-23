export const resolveImageUrl = (path) => {
    if (!path) return "/images/placeholder.jpg";

    // agar already full URL hai
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    // agar uploads se start ho raha hai
    if (path.startsWith("uploads")) {
        return `${import.meta.env.VITE_API_URL}/${path.replace(/\\/g, "/")}`;
    }

    return path;
};