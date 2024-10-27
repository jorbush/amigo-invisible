import { ThemeProvider } from '@/app/components/ThemeProvider';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Amigo Invisible',
    description:
        'Asigna a tus amigos invisibles de forma automática, con email y todo.',
    icons: {
        icon: '/mi-amigo-invisible.webp',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body
                className={`${font.className} flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950`}
            >
                <ThemeProvider>
                    <Header />
                    <main className="container mx-auto flex-grow py-2 sm:py-8">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
