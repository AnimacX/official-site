import type { Metadata } from 'next';
import Link from 'next/link';

import { PRIVACY_SNAPSHOT } from './privacy-snapshot';

const PRIVACY_URL = 'https://api.anix.app/kv/data_usage_privacy';

// 协议正文约 2400 字符，这里只做兜底：用来挡掉 "null"、空响应以及网关返回的
// 短错误页，正常内容离这个下限很远。2026-09-30 实测正文 2381 字符。
const MIN_PRIVACY_LENGTH = 200;

// 抓取卡死时不能拖着构建一起等，超时就当作失败走快照。
const FETCH_TIMEOUT_MS = 15_000;

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

// 抓取实时正文，任何异常都返回 null，交给调用方回退到快照。
async function fetchPrivacyText(): Promise<string | null> {
  // 不要传 `cache: 'force-cache'`：vinext 的 fetch shim 会把这个属性透传给
  // `new Request()`，而 dev 模式跑在 workerd 上，它拒绝该取值并抛
  // "Unsupported cache mode"。抓取时机交给路由段配置，fetch 这里保持最朴素。
  let response: Response;
  try {
    response = await fetch(PRIVACY_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (error) {
    // 已确认的场景：GitHub Actions 的 runner 被 Cloudflare 判定为机器人，
    // 收到 403 + cf-mitigated: challenge（正文是 "Just a moment..."）；
    // 网络不通时也会走到这里。
    console.warn(
      `[privacy] 抓取实时正文失败，本次使用快照：${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }

  const text = await response.text();

  // 必须自己校验正文：key 不存在时该接口返回的是 HTTP 200 + 正文 "null"，
  // 只看状态码会把字符串 null 当成协议正文渲染出去。Cloudflare 挑战页同样是
  // 非 2xx + 一段 HTML，一并挡在这里。
  if (!response.ok) {
    console.warn(`[privacy] 接口返回 HTTP ${response.status}，本次使用快照`);
    return null;
  }
  if (text.trim().length < MIN_PRIVACY_LENGTH) {
    console.warn(`[privacy] 正文只有 ${text.trim().length} 字符，本次使用快照`);
    return null;
  }

  return text;
}

async function getPrivacyText() {
  // 抓不到就回退到仓库里的快照，而不是让构建失败：构建失败等于整站发不出去，
  // 代价远大于隐私正文晚一轮更新。快照由 `npm run sync:privacy` 在能抓到的
  // 机器上刷新。
  return (await fetchPrivacyText()) ?? PRIVACY_SNAPSHOT;
}

export default async function PrivacyPage() {
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
