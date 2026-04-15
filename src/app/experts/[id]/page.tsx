import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
// import { dummyExperts } from "@/data/dummyExperts";
import { createClient } from "@/utils/supabase/server";
import { Expert } from "@/data/dummyExperts";
import TrustBanner from "@/components/TrustBanner";
import PortfolioCard from "@/components/PortfolioCard";
import DeleteExpertButton from "./DeleteExpertButton";

type Props = {
  params: Promise<{ id: string }>;
};

// 동적 SEO 메타데이터 생성은 잠시 제외 (나중에 적용)

export default async function ExpertDetailPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: dbExpert } = await supabase
    .from("experts")
    .select("*, portfolios(*)")
    .eq("id", id)
    .single();

  if (!dbExpert) {
    notFound();
  }

  const categoryMap: Record<string, string> = {
    demolition: "철거",
    tile: "타일",
    carpentry: "목공",
    wallpaper: "도배",
    paint: "도장",
    electric: "전기",
  };

  const expert: Expert = {
    id: dbExpert.id,
    name: dbExpert.name,
    category: categoryMap[dbExpert.category] || dbExpert.category,
    categorySlug: dbExpert.category,
    specialty: dbExpert.specialty || "",
    bio: dbExpert.bio,
    experience: dbExpert.experience,
    imageUrl: dbExpert.profile_image_url || null,
    quote: dbExpert.quote,
    longBio: dbExpert.bio,
    tags: dbExpert.tags
      ? dbExpert.tags.split(",").map((t: string) => t.trim())
      : [],
    portfolios:
      dbExpert.portfolios?.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        youtubeUrl: p.youtube_url,
        thumbnailUrl: p.youtube_thumbnail_url,
      })) || [],
  };

  return (
    <main style={{ paddingTop: "72px" }}>
      {/* ========== Profile Hero ========== */}
      <section className="detail-hero">
        <div className="container">
          <div className="profile-layout">
            <div className="profile-image">
              {expert.imageUrl ? (
                <Image src={expert.imageUrl} alt={expert.name} fill style={{ objectFit: "cover" }} />
              ) : (
                <div className="profile-image__placeholder" />
              )}
              {/* <span
                className="profile-image__badge"
                style={{ backgroundColor: `var(--cat-${expert.categorySlug})` }}
              >
                {expert.category}
              </span> */}
            </div>
            <div className="profile-content">
              <span className="profile-content__category">
                {expert.category} · {expert.categorySlug}
              </span>
              <h1 className="profile-content__name">{expert.name}</h1>
              <p className="profile-content__subtitle">
                {expert.specialty} · {expert.experience} · 전국
              </p>

              {expert.quote && (
                <blockquote className="profile-content__quote">
                  {expert.quote}
                </blockquote>
              )}

              <p className="profile-content__bio">
                {expert.longBio || expert.bio}
              </p>

              <div className="profile-content__tags">
                {expert.tags?.map((tag) => (
                  <span key={tag} className="profile-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "1rem", flexWrap: "wrap" }}>
                <Link
                  href="/#contact"
                  className="btn-contact"
                  style={{ margin: 0 }}
                >
                  이 마스터에게 문의하기 →
                </Link>
                <Link
                  href={`/experts/${expert.id}/edit`}
                  className="btn-contact"
                  style={{
                    margin: 0,
                    backgroundColor: "white",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  프로필 수정
                </Link>
                <DeleteExpertButton
                  expertId={expert.id}
                  profileImageUrl={expert.imageUrl}
                  portfolioImageUrls={expert.portfolios?.map((p) => p.thumbnailUrl)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Portfolio Section ========== */}
      <section className="portfolio">
        <div className="container">
          <div className="section-header">
            <p className="section-header__label">Portfolio</p>
            <h2 className="section-header__title">영상으로 보는 시공 현장</h2>
            <p className="section-header__desc">
              현장의 전 과정을 영상으로 직접 확인해보세요
            </p>
          </div>

          {expert.portfolios && expert.portfolios.length > 0 ? (
            <div className="portfolio-grid">
              {expert.portfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--color-text-tertiary)",
              }}
            >
              <p>아직 등록된 포트폴리오 영상이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* ========== CTA Section ========== */}
      <section className="trust-banner" style={{ marginTop: "40px" }}>
        <div className="container">
          <h2 className="trust-banner__title">
            이 마스터와 함께 하고 싶으신가요?
          </h2>
          <p className="trust-banner__desc">
            영상으로 실력이 증명된 마스터에게 지금 문의하세요.
          </p>
          <Link href="/#contact" className="trust-banner__btn">
            프로젝트 문의하기 →
          </Link>
        </div>
      </section>
    </main>
  );
}
