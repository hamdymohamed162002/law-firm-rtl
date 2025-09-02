import "./globals.css";
import AppProviders from "../components/Providers";  // <-- default import

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
         <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
