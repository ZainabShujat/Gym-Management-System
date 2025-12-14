import '../styles/globals.css';
import Sidebar from '@/components/layout/Sidebar';
import SkipLink from '@/components/layout/SkipLink';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Gym Management System',
  description: 'A modern gym management system built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SkipLink />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <main id="main-content" className="flex-1 lg:ml-0" role="main">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
