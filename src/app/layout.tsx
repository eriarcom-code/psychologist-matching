import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Психолог для подростка - Подбор специалистов',
  description: 'Найдите лучшего психолога для вашего подростка. Автоматический подбор специалистов с учетом ваших предпочтений.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
