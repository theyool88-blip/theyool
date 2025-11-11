import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "법무법인 더율 - 이혼전문변호사",
  description: "이혼, 재산분할, 양육권, 위자료 등 이혼 관련 모든 법률 문제를 전문적으로 상담합니다. 법무법인 더율이 함께합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
