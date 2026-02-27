/**
 * Live Demo Layout
 * This layout wraps only the live-demo pages and excludes Header/Footer
 * It's a nested layout that extends the root layout
 */
import Script from 'next/script';

import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LiveDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        id="hubspot-calendar-webhook"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('message', function(event) {
              let data = event.data;

              if (typeof data === 'string') {
                try { data = JSON.parse(data); } catch (e) {}
              }

              if (data && data.meetingBookSucceeded) {
                console.log("Success");

                fetch('https://aitassistance.app.n8n.cloud/webhook/hubspot-calendar', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    source: "website_calendar",
                    status: "booked",
                    hubspot_data: data
                  })
                })
                .then(res => console.log("✅", res.status))
                .catch(err => console.error("❌", err));
              }
            });
          `,
        }}
      />
      <div className="layout">{children}</div>
    </>
  );
}
