import { useState } from "react";

export default function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false);

  return (
    <>
      {/* Tooltip */}
      {showTip && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "25px",
            background: "#111827",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "14px",
            boxShadow: "0 10px 25px rgba(0,0,0,.2)",
            whiteSpace: "nowrap",
            zIndex: 9999
          }}
        >
          Any query? <strong>Chat with us</strong> 😊
        </div>
      )}

      {/* Button */}
      <a
        href="https://wa.me/9996881144"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 25px rgba(0,0,0,.25)",
          cursor: "pointer",
          zIndex: 9999
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-6.0C.122 5.281 5.34 0 12.06 0c3.173 0 6.167 1.24 8.413 3.488a11.82 11.82 0 013.48 8.41c-.003 6.72-5.284 12.04-11.995 12.04a11.9 11.9 0 01-6.128-1.68L.057 24zm6.597-3.807c1.77 1.05 3.27 1.67 5.392 1.67 5.448 0 9.886-4.43 9.89-9.87.003-5.463-4.41-9.89-9.877-9.89-5.46 0-9.89 4.42-9.89 9.88 0 2.23.73 4.28 1.97 5.97l-.63 2.3 2.25-.96zm11.533-5.464c-.074-.123-.272-.198-.57-.347-.297-.149-1.76-.867-2.03-.967-.272-.099-.47-.148-.67.149-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.074-.297-.148-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.148-.669-1.61-.916-2.207-.242-.58-.487-.501-.67-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.02-1.04 2.48 0 1.46 1.065 2.875 1.213 3.074.148.198 2.095 3.2 5.08 4.487.71.306 1.264.489 1.696.626.712.227 1.36.195 1.872.118.571-.085 1.76-.718 2.01-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </>
  );
}
