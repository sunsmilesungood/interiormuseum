import Link from 'next/link';
import { Expert } from '@/data/dummyExperts';

export default function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link href={`/experts/${expert.id}`} className="expert-card group hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-out">
      <div className="expert-card__image overflow-hidden">
        <img 
          src={expert.imageUrl} 
          alt={`${expert.name} 마스터`} 
          className="group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <span className={`expert-card__category-badge expert-card__category-badge--${expert.categorySlug} group-hover:-translate-y-1 transition-transform duration-300`}>
          {expert.category}
        </span>
      </div>
      <div className="expert-card__body">
        <h3 className="expert-card__name">{expert.name}</h3>
        <p className="expert-card__specialty">{expert.specialty}</p>
        <p className="expert-card__bio">{expert.bio}</p>
        <div className="expert-card__meta">
          <span className="expert-card__experience">{expert.experience}</span>
          <span className="expert-card__arrow group-hover:bg-black group-hover:text-white transition-colors duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
