export const metadata = {
  title: "Satyam Kumar | Portfolio",
  description: "Professional portfolio of Satyam Kumar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}