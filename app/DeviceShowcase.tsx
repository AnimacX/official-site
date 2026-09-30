'use client';

import { useState } from 'react';

const devices = [
  {
    name: 'iPhone',
    line: '随时观看',
    note: '随时查看追番进度与番剧资讯',
    image: '/marketing/device-iphone.jpg',
    alt: 'AnimacX iPhone 番剧资讯界面',
    className: 'is-phone',
  },
  {
    name: 'iPad',
    line: '沉浸大屏',
    note: '更宽阔的界面，适合沉浸观看',
    image: '/marketing/device-ipad.jpg',
    alt: 'AnimacX iPad 番剧资讯界面',
    className: 'is-tablet',
  },
  {
    name: 'Mac',
    line: '桌面体验',
    note: '完整呈现播放、资料与管理功能',
    image: '/marketing/device-mac.jpg',
    alt: 'AnimacX Mac 番剧资讯界面',
    className: 'is-desktop',
  },
  {
    name: 'Apple TV',
    line: '客厅大屏',
    note: '在客厅的大屏幕上继续观看',
    image: '/marketing/device-tv.jpg',
    alt: 'AnimacX Apple TV 番剧资讯界面',
    className: 'is-tv',
  },
];

export default function DeviceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDevice = devices[activeIndex];

  return (
    <div className="device-interactive">
      <div className="device-list" role="tablist" aria-label="选择设备查看界面">
        {devices.map((device, index) => (
          <button
            className={`device-row${activeIndex === index ? ' is-active' : ''}`}
            key={device.name}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="device-preview"
            onClick={() => setActiveIndex(index)}
          >
            <span className="device-index">0{index + 1}</span>
            <strong>{device.name}</strong>
            <span className="device-line">{device.line}</span>
            <span className="device-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div className={`device-preview ${activeDevice.className}`} id="device-preview" role="tabpanel">
        <div className="device-preview-copy">
          <span>{activeDevice.name}</span>
          <b>{activeDevice.note}</b>
        </div>
        <div className="device-preview-canvas">
          <div
            className="device-preview-blur"
            aria-hidden="true"
            style={{ backgroundImage: `url("${activeDevice.image}")` }}
          />
          <img key={activeDevice.image} src={activeDevice.image} alt={activeDevice.alt} />
        </div>
      </div>
    </div>
  );
}
