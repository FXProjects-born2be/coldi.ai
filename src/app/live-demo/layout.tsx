/**
 * Live Demo Layout
 * This layout wraps only the live-demo pages and excludes Header/Footer
 * It's a nested layout that extends the root layout
 */
export default function LiveDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
