import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import { SideMenu } from "@/components/sideMenu/SideMenu";

export const metadata = {
  title: "Grande Qr Menü",
  description: "Grande Digital Qr Menü",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <GlobalProvider>
          <SideMenu />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
