// 抓取隐私协议正文，写入 app/privacy/privacy-snapshot.ts。
//
// 为什么需要这个脚本：构建时要访问 api.anix.app，但那个域名挂在 Cloudflare 上，
// 对 GitHub Actions 的出口 IP 下发了 Managed Challenge（403 + cf-mitigated:
// challenge），CI 里抓不到。抓不到时页面回退到本快照，构建不会失败。
// 所以在能抓到的地方（开发者本机）跑一下本脚本，就能把正文刷新到最新。
//
// 用法: node scripts/sync-privacy.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PRIVACY_URL = 'https://api.anix.app/kv/data_usage_privacy';
const MIN_PRIVACY_LENGTH = 200;

const outputPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'app',
  'privacy',
  'privacy-snapshot.ts',
);

function fail(message) {
  console.error(`抓取隐私协议失败：${message}`);
  process.exit(1);
}

const response = await fetch(PRIVACY_URL).catch((error) => {
  fail(`请求异常（${error.message}）`);
});

if (!response.ok) {
  // Cloudflare 挑战页也是这个分支：状态码非 2xx，正文是 "Just a moment..."。
  fail(`HTTP ${response.status}`);
}

const text = await response.text();

// key 不存在时接口返回 HTTP 200 + 正文 "null"，只看状态码会把字符串 null 写进快照。
if (text.trim().length < MIN_PRIVACY_LENGTH) {
  fail(`正文异常（${text.trim().length} 字符）`);
}

// 正文是中文散文，通常不含反引号和 ${，用模板字符串写出来 diff 才逐行可读；
// 万一含有就退回 JSON.stringify，那种情况下可读性让位于正确性。
const readable = !text.includes('`') && !text.includes('${');
const literal = readable ? `\`${text}\`` : JSON.stringify(text);
const fetchedAt = new Date().toISOString();

writeFileSync(
  outputPath,
  `// 由 scripts/sync-privacy.mjs 生成，请勿手改；要刷新正文就跑那个脚本。
// 抓取时间：${fetchedAt}
// 来源：${PRIVACY_URL}

export const PRIVACY_SNAPSHOT_FETCHED_AT = ${JSON.stringify(fetchedAt)};

export const PRIVACY_SNAPSHOT = ${literal};
`,
);

console.log(`已写入 ${outputPath}（${text.trim().length} 字符）`);
