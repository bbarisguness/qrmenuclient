import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Grande Qr Menü",
  description: "Grande Digital Qr Menü",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9DDRH7PQYP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9DDRH7PQYP');
          `}
        </Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
