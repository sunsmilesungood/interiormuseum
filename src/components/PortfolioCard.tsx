"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";
import { Portfolio } from "@/data/dummyExperts";

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com"
    ) {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : null;
  } catch {
    return null;
  }
}

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const [open, setOpen] = useState(false);
  const embedUrl = getYoutubeEmbedUrl(portfolio.youtubeUrl);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <div className="portfolio-card">
        <button
          type="button"
          className="portfolio-card__image"
          onClick={() => setOpen(true)}
          aria-label={`${portfolio.title} 영상 재생`}
        >
          <img src={portfolio.thumbnailUrl} alt={portfolio.title} />
          <span className="portfolio-card__play">
            <Play fill="currentColor" size={24} />
          </span>
        </button>
        <div className="portfolio-card__body">
          <h3 className="portfolio-card__title">{portfolio.title}</h3>
          <p className="portfolio-card__desc">{portfolio.description}</p>
          <a
            href={portfolio.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-card__youtube"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="18"
              height="18"
              style={{ marginRight: 6 }}
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            YouTube에서 보기
          </a>
        </div>
      </div>

      {open && (
        <div
          className="yt-modal-overlay"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={portfolio.title}
        >
          <div
            className="yt-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="yt-modal-close"
              onClick={close}
              aria-label="닫기"
            >
              <X size={24} />
            </button>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={portfolio.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="yt-modal-iframe"
              />
            ) : (
              <div className="yt-modal-fallback">
                <p>영상을 불러올 수 없습니다.</p>
                <a
                  href={portfolio.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube에서 보기
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
