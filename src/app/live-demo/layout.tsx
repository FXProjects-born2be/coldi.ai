/**
 * Live Demo Layout
 * This layout wraps only the live-demo pages and excludes Header/Footer
 * It's a nested layout that extends the root layout
 */
import './layout.scss';

export default function LiveDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="layout">{children}</div>;
}
