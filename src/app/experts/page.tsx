import { createClient } from "@/utils/supabase/server";
import { Expert } from "@/data/dummyExperts";
import ExpertsSection from "@/components/ExpertsSection";

const categoryMap: Record<string, string> = {
  demolition: "철거",
  tile: "타일",
  carpentry: "목공",
  wallpaper: "도배",
  paint: "도장",
  electric: "전기",
};

export default async function ExpertsListPage() {
  const supabase = await createClient();
  const { data: dbExperts } = await supabase
    .from("experts")
    .select("*, portfolios(*)")
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
    portfolios:
      row.portfolios?.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        youtubeUrl: p.youtube_url,
        thumbnailUrl: p.youtube_thumbnail_url,
      })) || [],
  }));

  return (
    <main style={{ paddingTop: "72px" }}>
      {/* ========== Page Header ========== */}
      <section className="experts-page-header">
        <div className="container">
          <h1 className="experts-page-header__title">전문가 찾기</h1>
        </div>
      </section>

      {/* ========== Experts Grid ========== */}
      <ExpertsSection experts={experts} showContactLink hideHeader />
    </main>
  );
}
