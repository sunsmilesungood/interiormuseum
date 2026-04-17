import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { Expert } from "@/data/dummyExperts";
import ExpertsSection from "@/components/ExpertsSection";

const categoryMap: Record<string, string> = {
  demolition: "철거",
  tile: "타일",
  carpentry: "목공",
  wallpaper: "도배",
  furniture: "가구",
  electric: "전기",
  total: "토탈",
  other: "기타",
};

async function ExpertsGrid() {
  const supabase = await createClient();
  const { data: dbExperts } = await supabase
    .from("experts")
    .select("id, name, category, specialty, bio, experience, profile_image_url, quote, tags")
    .order("created_at", { ascending: false });

  const experts: Expert[] = (dbExperts || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    category: categoryMap[row.category] || row.category,
    categorySlug: row.category,
    specialty: row.specialty || "",
    bio: row.bio,
    experience: row.experience,
    imageUrl: row.profile_image_url || null,
    quote: row.quote,
    longBio: row.bio,
    tags: row.tags ? row.tags.split(",").map((t: string) => t.trim()) : [],
    portfolios: [],
  }));

  return <ExpertsSection experts={experts} showContactLink hideHeader />;
}

function ExpertsGridSkeleton() {
  return (
    <section className="experts" style={{ paddingTop: "2rem" }}>
      <div className="container">
        <div className="experts-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: "1rem",
                background: "var(--color-border, #e5e7eb)",
                aspectRatio: "3/4",
                animation: "pulse 1.5s ease-in-out infinite",
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

export default function ExpertsListPage() {
  return (
    <main style={{ paddingTop: "72px" }}>
      {/* ========== Page Header ========== */}
      <section className="experts-page-header">
        <div className="container">
          <h1 className="experts-page-header__title">전문가 찾기</h1>
        </div>
      </section>

      {/* ========== Experts Grid ========== */}
      <Suspense fallback={<ExpertsGridSkeleton />}>
        <ExpertsGrid />
      </Suspense>
    </main>
  );
}
