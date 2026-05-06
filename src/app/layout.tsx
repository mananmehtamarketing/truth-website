import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";
import AudioToggle from "@/components/ui/AudioToggle";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Truth — Where the Night Reveals What Lies Beneath",
  description:
    "Truth: an electric underground cocktail bar and nightclub in Leamington Spa. Step below the surface and find a space created for those who crave more than the ordinary.",
  openGraph: {
    title: "Truth — Underground Cocktail Bar & Nightclub",
    description:
      "An electric underground cocktail bar and nightclub in Leamington Spa.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#010101",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-truth-black text-truth-bone">
        <Loader />
        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          <Nav />
          <PageTransition>
            <main className="relative w-full overflow-x-hidden">{children}</main>
          </PageTransition>
          <Footer />
          <AudioToggle />
        </LenisProvider>
      </body>
    </html>
  );
}
