import { Play } from "lucide-react";
import { Portfolio } from "@/data/dummyExperts";

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="portfolio-card">
      <a
        href={portfolio.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-card__image"
      >
        <img src={portfolio.thumbnailUrl} alt={portfolio.title} />
        <span className="portfolio-card__play">
          <Play fill="currentColor" size={24} />
        </span>
      </a>
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
  );
}
