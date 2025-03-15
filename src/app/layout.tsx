'use client'

import { usePathname } from "next/navigation";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${montserrat.className} page-container`}>
        
        <main className={`${montserrat.className} content-wrap`}>{children}</main>
        
        {pathname !== "/components" && pathname !== "/userCart" && pathname !== "/adminHome" && (
          <footer className="footer">
            <p>LOLA STUDIO</p>
            <p>© 2020 - 2024</p>
            <p>TRENUCI ZA PAMĆENJE</p>
          </footer>
        )}

      </body>
    </html>
  );
}
