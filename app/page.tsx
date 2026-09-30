import DeviceShowcase from './DeviceShowcase';

const features = [
  {
    number: '01',
    title: '本地与网络播放',
    copy: '支持本地文件与网络媒体，让不同来源的内容在同一处顺畅播放。',
    accent: '媒体播放',
  },
  {
    number: '02',
    title: '弹幕体验',
    copy: '调整速度、密度、透明度与显示区域，在观看氛围与画面之间找到平衡。',
    accent: '弹幕设置',
  },
  {
    number: '03',
    title: '字幕与翻译',
    copy: '字幕搜索、语言匹配与翻译彼此协作，让语言不再中断观看。',
    accent: '字幕工具',
  },
  {
    number: '04',
    title: '画质增强',
    copy: 'HDR、视频增强与超分辨率，让熟悉的画面呈现更多细节。',
    accent: '画面细节',
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="AnimacX 首页">
          <img className="brand-mark" src="/icon.png" alt="" />
          <span>AnimacX</span>
        </a>
        <div className="nav-links">
          <a href="#features">功能</a>
          <a href="#showcase">界面</a>
          <a href="#devices">设备</a>
          <a href="https://github.com/AnimacX/AnimacX" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <a className="nav-cta" href="https://testflight.apple.com/join/zCpAVFFj" target="_blank" rel="noreferrer">获取 AnimacX</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> 跨设备动漫与媒体播放器</p>
          <h1>让每一帧，<br /><em>都值得追。</em></h1>
          <p className="hero-lede">
            记录追番进度，播放本地与网络媒体。无论使用 iPhone、iPad、Mac 还是 Apple TV，
            都能从上次停下的位置继续。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="https://testflight.apple.com/join/zCpAVFFj" target="_blank" rel="noreferrer">获取 AnimacX <span>↗</span></a>
            <a className="text-button" href="#features">查看功能 <span>↓</span></a>
          </div>
          <div className="platform-list" aria-label="支持平台">
            <span>iPhone</span><i />
            <span>iPad</span><i />
            <span>Mac</span><i />
            <span>Apple TV</span>
          </div>
        </div>

        <div className="hero-stage" aria-label="AnimacX 全平台应用界面">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="player-card">
            <img
              className="hero-product-image"
              src="/marketing/hero-platforms.jpg"
              alt="AnimacX 在 Mac、Apple TV、iPad 与 iPhone 上的应用界面"
            />
          </div>
          <div className="floating-card codec-card">
            <span className="floating-icon">◈</span>
            <span><b>视频增强</b><small>呈现更多画面细节</small></span>
          </div>
          <div className="floating-card sync-card">
            <span className="sync-ring">✓</span>
            <span><b>进度同步</b><small>在不同设备间继续观看</small></span>
          </div>
        </div>
      </section>

      <section className="features section-shell" id="features">
        <div className="section-heading">
          <p className="section-kicker">播放体验</p>
          <h2>专注于观看，<br />也照顾每个细节。</h2>
          <p>从媒体播放到弹幕、字幕与画质增强，为动漫内容提供完整的观看体验。</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-card-top">
                <span className="feature-number">{feature.number}</span>
                <span className="feature-accent">{feature.accent}</span>
              </div>
              <div className="feature-symbol" aria-hidden="true">
                {feature.number === '01' ? '▶' : feature.number === '02' ? '弹' : feature.number === '03' ? '字' : '✦'}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="playback-section section-shell">
        <div className="playback-copy">
          <p className="section-kicker">沉浸观看</p>
          <h2>把画面，<br />留给故事。</h2>
          <p>
            播放控制、字幕和弹幕设置在需要时出现，开始观看后自然退场。
          </p>
          <ul className="check-list">
            <li><span>✓</span> 自定义弹幕显示效果</li>
            <li><span>✓</span> 多语言字幕与翻译</li>
            <li><span>✓</span> 跨设备同步观看进度</li>
          </ul>
        </div>
        <div className="playback-media">
          <img src="/marketing/mobile-player.jpg" alt="AnimacX iPhone 播放器、弹幕与播放控制界面" />
          <div className="media-badge"><b>弹幕</b><span>与故事同频</span></div>
        </div>
      </section>

      <section className="showcase section-shell" id="showcase">
        <div className="section-heading showcase-heading">
          <div>
            <p className="section-kicker">番剧资料</p>
            <h2>从发现作品，<br />到继续观看。</h2>
          </div>
          <p>集中查看番剧资讯、追番进度、角色资料与剧集信息。</p>
        </div>
        <div className="showcase-stack">
          <figure className="showcase-card">
            <img src="/marketing/browse.jpg" alt="AnimacX Mac 番剧资讯与继续观看界面" />
            <figcaption><span>01</span><b>更新中的作品与观看进度，一目了然。</b></figcaption>
          </figure>
          <figure className="showcase-card showcase-card-offset">
            <img src="/marketing/details.jpg" alt="AnimacX Mac 番剧详情、角色与剧集界面" />
            <figcaption><span>02</span><b>作品资料、角色信息与剧集列表，清晰呈现。</b></figcaption>
          </figure>
        </div>
      </section>

      <section className="devices section-shell" id="devices">
        <div className="devices-intro">
          <p className="section-kicker">跨设备体验</p>
          <h2>每一块屏幕，<br />都有熟悉的 AnimacX。</h2>
          <p>选择设备，查看 AnimacX 在不同平台上的界面。</p>
        </div>
        <DeviceShowcase />
      </section>

      <section className="download-section" id="download">
        <div className="download-glow" />
        <div className="download-content">
          <img className="download-mark" src="/icon.png" alt="AnimacX 图标" />
          <p className="section-kicker">获取 AnimacX</p>
          <h2>下一集，<br /><em>从这里继续。</em></h2>
          <p>在 iPhone、iPad、Mac 与 Apple TV 上，继续你的观看进度。</p>
          <div className="download-actions">
            <a className="primary-button" href="https://testflight.apple.com/join/zCpAVFFj" target="_blank" rel="noreferrer">加入 TestFlight 测试 <span>↗</span></a>
            <a className="text-button" href="https://github.com/AnimacX/AnimacX/issues" target="_blank" rel="noreferrer">问题与反馈</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><img className="brand-mark" src="/icon.png" alt="" /><span>AnimacX</span></a>
        <p>让喜欢的作品，在每一块屏幕上继续播放。</p>
        <div className="footer-links">
          <a href="https://github.com/AnimacX/AnimacX" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/privacy.html">隐私协议</a>
          <a href="https://github.com/AnimacX/AnimacX/issues" target="_blank" rel="noreferrer">支持</a>
          <a href="#top">返回顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}
