import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AnimacX — 让每一帧，都值得追。',
  description: '记录追番进度，播放本地与网络媒体，在 iPhone、iPad、Mac 与 Apple TV 上继续观看。',
  icons: {
    icon: '/favicon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'AnimacX',
    title: 'AnimacX — 让每一帧，都值得追。',
    description: '跨设备动漫与媒体播放体验，支持弹幕、字幕翻译与视频增强。',
    images: [{ url: '/og.png', width: 1792, height: 1024, alt: 'AnimacX — 让每一帧，都值得追。' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnimacX — 让每一帧，都值得追。',
    description: '跨设备动漫与媒体播放体验，支持弹幕、字幕翻译与视频增强。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
