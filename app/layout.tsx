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
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <Header />
          <main className="flex-grow container mx-auto py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
