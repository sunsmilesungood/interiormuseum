import Image from "next/image";
import ExpertsSection from "@/components/ExpertsSection";
import TrustBanner from "@/components/TrustBanner";
import ContactForm from "@/components/ContactForm";
import { createClient } from "@/utils/supabase/server";
import { Expert } from "@/data/dummyExperts";
import {
  Video,
  PlayCircle,
  Palette,
  Eye,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const { data: dbExperts } = await supabase
    .from("experts")
    .select("*, portfolios(*)")
    .order("created_at", { ascending: false });

  const categoryMap: Record<string, string> = {
    demolition: "철거",
    tile: "타일",
    carpentry: "목공",
    wallpaper: "도배",
    paint: "도장",
    electric: "전기",
  };

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
    <main>
      {/* ========== Hero Section ========== */}
      <section className="hero">
        <div className="container container--wide">
          <div className="hero__layout">
            <div className="hero__text">
              <div className="hero__badge animate-fade-in-up">
                <span className="hero__badge-icon">
                  <Video size={14} />
                </span>
                영상으로 확인하는 전문가의 작업
              </div>
              <h1
                className="hero__title animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                공간에 <em>예술</em>을 더하는
                <br />
                인테리어 마스터를
                <br />
                만나보세요
              </h1>
              <p
                className="hero__desc animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                단순한 시공이 아닌, 자부심과 장인 정신으로 공간을 완성하는
                인테리어 전문가들을 소개합니다. 진정한 실력자들과 함께 신뢰할 수
                있는 시공을 경험하세요.
              </p>
              <div
                className="hero__actions animate-fade-in-up"
                style={{ animationDelay: "300ms" }}
              >
                <a
                  href="#experts"
                  className="hero__btn-primary hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  전문가 만나기 →
                </a>
                <a
                  href="#contact"
                  className="hero__btn-secondary bg-white/50 backdrop-blur-sm"
                >
                  무료 상담 신청
                </a>
              </div>
              <div className="hero__stats">
                <div>
                  <div className="hero__stat-number">150+</div>
                  <div className="hero__stat-label">영상 보유 전문가</div>
                </div>
                <div>
                  <div className="hero__stat-number">2,800+</div>
                  <div className="hero__stat-label">완료된 프로젝트</div>
                </div>
                <div>
                  <div className="hero__stat-number">98%</div>
                  <div className="hero__stat-label">고객 만족도</div>
                </div>
              </div>
            </div>

            <div
              className="hero__images animate-fade-in-left"
              style={{ animationDelay: "200ms" }}
            >
              <div className="hero__image-main hover:scale-[1.02] transition-transform duration-700">
                <Image
                  src="/images/hero-main.jpg"
                  alt="프리미엄 인테리어 공간"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="hero__image-stack">
                <div className="hero__image-small hover:scale-[1.03] transition-transform duration-500 delay-100">
                  <Image
                    src="/images/hero-modern.jpg"
                    alt="모던 인테리어"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="hero__image-small hover:scale-[1.03] transition-transform duration-500 delay-200">
                  <Image
                    src="/images/hero-luxury.jpg"
                    alt="럭셔리 인테리어"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="hero__image-floating-card animate-float">
                <span className="hero__image-floating-icon">
                  <Video size={20} />
                </span>
                <div>
                  <strong>영상으로 증명된 실력</strong>
                  <span>작업 전 과정을 투명하게 공개</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== About Section ========== */}
      <section id="about" className="about">
        <div className="container">
          <div className="about__grid">
            <div className="about__text">
              <p className="about__label animate-fade-in-up">About Us</p>
              <h2
                className="about__title animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                오직 실력으로 증명하는
                <br />
                <strong>공간의 마스터들</strong>
              </h2>
              <p className="about__desc">
                인테리어뮤지엄은 수십 년간 기술과 감각을 갈고닦은 장인들을
                세상에 알립니다. 말이 아닌 시공 사례로, 약속이 아닌 경력으로
                스스로를 증명해온 분들과 함께 당신의 공간을 완성하세요.
              </p>
              <div
                className="about__features animate-fade-in-up"
                style={{ animationDelay: "300ms" }}
              >
                <div className="about__feature">
                  <div className="about__feature-icon">
                    <PlayCircle size={22} />
                  </div>
                  <div className="about__feature-text">
                    <h4>현장 영상 공개</h4>
                    <p>
                      실제 시공 현장을 가감 없이 촬영한 영상을 통해 실력을
                      증명합니다.
                    </p>
                  </div>
                </div>
                <div className="about__feature">
                  <div className="about__feature-icon">
                    <Palette size={22} />
                  </div>
                  <div className="about__feature-text">
                    <h4>예술가로서의 가치</h4>
                    <p>
                      단순 시공자가 아닌, 공간 예술가로서의 자부심을
                      지켜드립니다.
                    </p>
                  </div>
                </div>
                <div
                  className="about__feature hover:-translate-y-1 transition-transform duration-300"
                  style={{ animationDelay: "200ms" }}
                >
                  <div className="about__feature-icon">
                    <Eye size={22} />
                  </div>
                  <div className="about__feature-text">
                    <h4>투명한 소통</h4>
                    <p>
                      시공 전 과정에서 고객과의 신뢰를 최우선으로 생각합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about__image-container animate-fade-in-right hover:shadow-2xl transition-all duration-700">
              <Image
                src="/images/about-interior.jpg"
                alt="인테리어 시공 현장"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="about__image-badge">
                <strong>Since 2024</strong>
                <span>신뢰를 회복하는 여정</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Experts Section (Client Component) ========== */}
      <ExpertsSection experts={experts} limit={8} />

      {/* ========== Trust Banner ========== */}
      <TrustBanner />

      {/* ========== Contact Section ========== */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact__layout">
            <div className="contact__info">
              <p className="contact__info-label">Contact Us</p>
              <h2 className="contact__info-title">
                프로젝트를
                <br />
                함께 시작해보세요
              </h2>
              <p className="contact__info-desc">
                어떤 공간이든, 어떤 분야든 최적의 전문가를 매칭해드립니다.
                문의를 남겨주시면 빠르게 확인 후 연락드리겠습니다.
              </p>
              <div className="contact__info-items">
                <div className="contact__info-item">
                  <div className="contact__info-item-icon">
                    <Mail />
                  </div>
                  <div className="contact__info-item-text">
                    <h4>이메일 문의</h4>
                    <p>contact@interiormuseum.com</p>
                  </div>
                </div>
                <div className="contact__info-item">
                  <div className="contact__info-item-icon">
                    <Phone />
                  </div>
                  <div className="contact__info-item-text">
                    <h4>전화 상담</h4>
                    <p>02-1234-5678 (평일 09:00~18:00)</p>
                  </div>
                </div>
                <div className="contact__info-item">
                  <div className="contact__info-item-icon">
                    <MapPin />
                  </div>
                  <div className="contact__info-item-text">
                    <h4>오피스</h4>
                    <p>서울특별시 강남구 테헤란로 123</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
