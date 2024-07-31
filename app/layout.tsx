import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
// import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stunning Gallery",
  description: "A curated gallery of visually appealing websites for design inspiration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content="A curated gallery showcasing stunning and visually appealing websites for design inspiration. Explore new trends, submit your designs, and get inspired." />
        <meta name="keywords" content="web design, gallery, design inspiration, stunning websites, creative UI, UX, Next.js, Tailwind CSS" />
        <meta property="og:title" content="Stunning Gallery - Inspiring Web Design" />
        <meta property="og:description" content="Discover a curated selection of visually appealing websites for design inspiration. Explore, learn, and get inspired." />
        <meta property="og:url" content="https://stunning-nu.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stunning Gallery - Inspiring Web Design" />
        <meta name="twitter:description" content="Explore a curated selection of visually stunning websites and get inspired." />
        <link rel="canonical" href="https://stunning-nu.vercel.app/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="Content-Language" content="en" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Stunning Gallery",
            "url": "https://stunning-nu.vercel.app/",
            "description": "A curated gallery of visually appealing websites for design inspiration."
          })}
        </script>
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>

  );
}
