import './layout.scss';

export default function HealthcareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="layout">{children}</div>;
}
