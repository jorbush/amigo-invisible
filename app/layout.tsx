import { ThemeProvider } from '@/app/components/ThemeProvider';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <Header />
          <main className="container mx-auto flex-grow py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
