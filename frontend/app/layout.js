"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
// import Navbar from "../components/Navbar";
import ColorBends from "../components/ColorBends";
import { use } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

// export const metadata = {
//   title: "Video Summarrizer AI",
//   description: "Deep learning projects and deployment",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SUMA AI</title>
      </head>
      <body className="relative min-h-screen">
        
        {/* Background with mouse movement */}
        <div className="absolute inset-0 -z-10">
          <ColorBends
            colors={["#0ABAB5", "#56DFCF", "#ADEED9", "#FFEDF3"]}
            rotation={30}
            speed={0.25}           // biar smooth
            scale={1.2}
            frequency={1.5}
            warpStrength={1.2}
            noise={0.08}
            mouseInfluence={1}
            parallaxIntensity={0.45}  // inilah yang bikin efek mouse
          />
        </div>

        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
