import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuantGPT",
  description: "A helpful assistant designed to help you navigate through the VectorBT (PRO) documentation.",
  icons: {
    icon: "/vectorbtpro.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {assistantId ? children : <Warnings />}
        <img className="logo" src="/vectorbtpro.svg" alt="VectorBT (PRO) Logo" />
      </body>
    </html>
  );
}
