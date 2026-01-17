import "./globals.css"; // This must match the filename in your app folder
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Satyam Kumar | Full Stack Developer",
  description: "Professional portfolio of Satyam Kumar"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}