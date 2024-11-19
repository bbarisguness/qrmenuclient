import { GlobalProvider } from "@/context/GlobalContext";

export default async function CompanyLayout({ children, params }) {
    return (
        <div>
            <GlobalProvider>
                {children}
            </GlobalProvider>
        </div>
    );
}
