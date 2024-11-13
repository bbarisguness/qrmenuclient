import "./globals.css";

export const metadata = {
  title: "Grande Qr Menü",
  description: "Grande Digital Qr Menü",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
