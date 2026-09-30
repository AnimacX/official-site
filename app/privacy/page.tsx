import type { Metadata } from 'next';

const PRIVACY_URL = 'https://api.anix.app/kv/data_usage_privacy';

export const metadata: Metadata = {
  title: '隐私协议 — AnimacX',
  description: 'AnimacX 数据存储、同步与第三方服务说明。',
  openGraph: {
    title: '隐私协议 — AnimacX',
    description: 'AnimacX 数据存储、同步与第三方服务说明。',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: '隐私协议 — AnimacX',
    description: 'AnimacX 数据存储、同步与第三方服务说明。',
    images: [],
  },
};

async function getPrivacyText() {
  try {
    const response = await fetch(PRIVACY_URL, { cache: 'no-store' });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

export default async function PrivacyPage() {
  const privacyText = await getPrivacyText();

  return (
    <main className="legal-page">
      <header className="legal-nav">
        <a className="brand" href="/" aria-label="AnimacX 首页">
          <img className="brand-mark" src="/icon.png" alt="" />
          <span>AnimacX</span>
        </a>
        <a className="legal-back" href="/">← 返回首页</a>
      </header>
      <article className="legal-document">
        <p className="section-kicker">PRIVACY &amp; DATA</p>
        <h1>隐私协议</h1>
        <div className="legal-meta">
          <span className="live-dot" />
          内容由 AnimacX 服务实时提供
        </div>
        {privacyText ? (
          <div className="legal-copy">{privacyText}</div>
        ) : (
          <div className="legal-error">
            <h2>暂时无法获取隐私协议</h2>
            <p>请稍后刷新页面，或直接访问协议原文。</p>
          </div>
        )}
        <a className="legal-source" href={PRIVACY_URL} target="_blank" rel="noreferrer">
          查看纯文本原文 ↗
        </a>
      </article>
    </main>
  );
}
