import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const display = Manrope({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: {
    default: "Alteryx careers",
    template: "%s · Alteryx",
  },
  description: "One open role at Alteryx. Strategy roles are listed and closed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
