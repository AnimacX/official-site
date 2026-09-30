import type { Metadata } from 'next';
import Link from 'next/link';

const PRIVACY_URL = 'https://api.anix.app/kv/data_usage_privacy';

// 协议正文约 2400 字符，这里只做兜底：用来挡掉 "null"、空响应以及网关返回的
// 短错误页，正常内容离这个下限很远。2026-09-30 实测正文 2381 字符。
const MIN_PRIVACY_LENGTH = 200;

// 静态导出（next.config.ts 的 output: 'export'）下没有请求时的运行时，构建时
// 会把每个路由预渲染一遍，这个 fetch 就在那时执行一次，正文随产物一起发布。
// 真正保证这一点的是 output: 'export' 本身：2026-09-30 实测删掉下面这行，构建
// 结果与产物完全相同。留作显式声明——若以后改回服务端渲染，没有它，fetch 的
// 默认 no-store 会把路由判成动态。
export const dynamic = 'force-static';

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
  // 不要传 `cache: 'force-cache'`：vinext 的 fetch shim 会把这个属性透传给
  // `new Request()`，而 dev 模式跑在 workerd 上，它拒绝该取值并抛
  // "Unsupported cache mode"。抓取时机交给路由段配置，fetch 这里保持最朴素。
  const response = await fetch(PRIVACY_URL);
  const text = await response.text();

  // 这里抛出的异常会让构建失败（vinext 报 "RSC handler returned 500"）。
  // 必须自己校验正文：key 不存在时该接口返回的是 HTTP 200 + 正文 "null"，
  // 只看状态码会把字符串 null 当成协议正文渲染出去。
  if (!response.ok) {
    throw new Error(`获取隐私协议失败：HTTP ${response.status}`);
  }
  if (text.trim().length < MIN_PRIVACY_LENGTH) {
    throw new Error(`获取隐私协议失败：正文异常（${text.trim().length} 字符）`);
  }

  return text;
}

export default async function PrivacyPage() {
  // 抓取失败会直接让构建失败，避免把空页面发上线。
  const privacyText = await getPrivacyText();

  return (
    <main className="legal-page">
      <header className="legal-nav">
        <Link className="brand" href="/" aria-label="AnimacX 首页">
          <img className="brand-mark" src="/icon.png" alt="" />
          <span>AnimacX</span>
        </Link>
        <Link className="legal-back" href="/">← 返回首页</Link>
      </header>
      <article className="legal-document">
        <p className="section-kicker">PRIVACY &amp; DATA</p>
        <h1>隐私协议</h1>
        <div className="legal-meta">
          <span className="live-dot" />
          协议内容同步自 AnimacX 服务
        </div>
        <div className="legal-copy">{privacyText}</div>
        <a className="legal-source" href={PRIVACY_URL} target="_blank" rel="noreferrer">
          查看纯文本原文 ↗
        </a>
      </article>
    </main>
  );
}
