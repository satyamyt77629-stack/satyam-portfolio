export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        padding: "16px",
        textAlign: "center",
        fontSize: "14px",
        color: "#64748b"
      }}
    >
      © {new Date().getFullYear()} Satyam Kumar
    </footer>
  );
}