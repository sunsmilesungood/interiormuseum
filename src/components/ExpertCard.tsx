import Image from "next/image";
import Link from "next/link";
import { Expert } from "@/data/dummyExperts";

export default function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link href={`/experts/${expert.id}`} className="expert-card group">
      <div className="expert-card__image overflow-hidden">
        {expert.imageUrl ? (
          <Image src={expert.imageUrl} alt={`${expert.name} 마스터`} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="expert-card__image-placeholder" />
        )}
        <span
          className={`expert-card__category-badge expert-card__category-badge--${expert.categorySlug}`}
        >
          {expert.category}
        </span>
      </div>
      <div className="expert-card__body">
        <h3 className="expert-card__name">{expert.name}</h3>
        <p className="expert-card__specialty">{expert.specialty}</p>
        <p className="expert-card__bio">{expert.bio}</p>
        <div className="expert-card__meta">
          <span className="expert-card__experience">{expert.experience}</span>
          <span className="expert-card__arrow">→</span>
        </div>
      </div>
    </Link>
  );
}
