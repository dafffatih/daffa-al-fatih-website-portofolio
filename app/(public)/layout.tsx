import { Navbar } from "@/components/layout/navbar";
import { BackgroundWrapper } from "@/components/backgrounds/background-wrapper";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <BackgroundWrapper />
            <Navbar />
            {children}
        </>
    );
}
