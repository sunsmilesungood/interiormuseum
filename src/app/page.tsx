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
    furniture: "가구",
    electric: "전기",
    total: "토탈",
    other: "기타",
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
                영상으로 확인하는 작업의 과정
              </div>
              <h1
                className="hero__title animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                공간에 <em>감각</em>을 더하는
                {/* <br />
                인테리어 마스터를
                <br />
                만나보세요 */}
                <br />
                인테리어 마스터를
                <br />
                사람들의 시공 과정을
                <br />
                영상으로 직접 확인하세요
              </h1>
              <p
                className="hero__desc animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                인테리어뮤지엄은 시공자의 얼굴, 실명, 작업 과정이 담긴 영상을
                기록하고 정리합니다. 공개된 시공 사례와 업체 정보를 통해 직접
                비교하고 판단할 수 있도록 돕습니다.
              </p>
              <div
                className="hero__actions animate-fade-in-up"
                style={{ animationDelay: "300ms" }}
              >
                <a
                  href="#experts"
                  className="hero__btn-primary hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  작업 기록 보기 →
                </a>
                <a
                  href="#contact"
                  className="hero__btn-secondary bg-white/50 backdrop-blur-sm"
                >
                  업체 정보 요청
                </a>
              </div>
              <div className="hero__stats">
                <div>
                  <div className="hero__stat-number">150+</div>
                  <div className="hero__stat-label">공개된 작업 기록</div>
                </div>
                <div>
                  <div className="hero__stat-number">2,800+</div>
                  <div className="hero__stat-label">기록된 프로젝트</div>
                </div>
                <div>
                  <div className="hero__stat-number">업체 정보</div>
                  <div className="hero__stat-label">상시 안내</div>
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
                  <strong>영상으로 확인하는 작업 과정</strong>
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
                과정으로 신뢰를 쌓는
                <br />
                <strong>인테리어 아카이브</strong>
              </h2>
              <p className="about__desc">
                인테리어뮤지엄은 시공자의 얼굴, 이름, 작업 과정이 담긴 영상을
                기록하고 정리합니다. 공개된 시공 사례와 업체 정보를 통해
                이용자가 직접 보고 비교하고 판단할 수 있도록 돕습니다.
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
                    <p>공개 가능한 실제 시공 과정을 영상으로 기록합니다.</p>
                  </div>
                </div>
                <div className="about__feature">
                  <div className="about__feature-icon">
                    <Palette size={22} />
                  </div>
                  <div className="about__feature-text">
                    <h4>업체 정보 안내</h4>
                    <p>
                      시공자 실명, 업체 정보, 공개 가능한 면허 정보를 함께
                      제공합니다.
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
                    <h4>직접 확인 후 진행</h4>
                    <p>
                      실제 견적, 계약, 시공, 하자보수는 해당 업체와 직접
                      이루어집니다.
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
                <span>정직한 시공의 시작</span>
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
                프로젝트에
                <br />
                맞는 업체를 안내받아보세요
              </h2>
              <p className="contact__info-desc">
                희망하는 공간과 공사 내용을 남겨주시면, 공개된 시공 기록과 업체
                정보를 바탕으로 확인 가능한 업체를 안내해드립니다.
                <br />본 요청은 인테리어뮤지엄의 직접 상담이 아닌, 업체 정보
                안내 및 상담 의사 전달을 위한 요청입니다. 실제 견적, 계약, 시공,
                하자보수는 해당 업체와 이용자 간에 직접 진행됩니다.
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
                {/* <div className="contact__info-item">
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
                </div> */}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
