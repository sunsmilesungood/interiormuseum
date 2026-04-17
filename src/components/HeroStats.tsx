"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

export default function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count150 = useCountUp(150, 1600, visible);
  const count2800 = useCountUp(2800, 2000, visible);

  return (
    <div className="hero__stats" ref={ref}>
      <div>
        <div className="hero__stat-number">
          {visible ? `${count150}+` : "0+"}
        </div>
        <div className="hero__stat-label">공개된 작업 기록</div>
      </div>
      <div>
        <div className="hero__stat-number">
          {visible ? `${count2800.toLocaleString()}+` : "0+"}
        </div>
        <div className="hero__stat-label">기록된 프로젝트</div>
      </div>
      <div
        style={{
          transform: visible ? "translateY(0)" : "translateY(16px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.7s ease 1.8s, opacity 0.7s ease 1.8s",
        }}
      >
        <div className="hero__stat-number">업체 정보</div>
        <div className="hero__stat-label">상시 안내</div>
      </div>
    </div>
  );
}
