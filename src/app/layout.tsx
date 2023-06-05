import './globals.css';

export const metadata = {
  title: 'Convex Developer Search',
  description: 'Search Docs, Stack, Discord all at once',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-n12">{children}</body>
    </html>
  );
}
