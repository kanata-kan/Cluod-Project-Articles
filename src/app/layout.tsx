import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Header from './_component/header/Header';
import Footer from './_component/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cloud Hosting',
  description: 'Welcome to the site Cloud Hosting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ToastContainer position='top-center' theme='colored' />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
