import ExpertsSection from "@/components/ExpertsSection";
import TrustBanner from "@/components/TrustBanner";
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
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
                  alt="프리미엄 인테리어 공간"
                />
              </div>
              <div className="hero__image-stack">
                <div className="hero__image-small hover:scale-[1.03] transition-transform duration-500 delay-100">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                    alt="모던 인테리어"
                  />
                </div>
                <div className="hero__image-small hover:scale-[1.03] transition-transform duration-500 delay-200">
                  <img
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=600&auto=format&fit=crop"
                    alt="럭셔리 인테리어"
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
              <img
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=900&auto=format&fit=crop"
                alt="인테리어 시공 현장"
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
      <ExpertsSection experts={experts} />

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

            <form
              className="contact-form"
              id="contactForm"
              action="mailto:contact@interiormuseum.com"
              method="post"
              encType="text/plain"
            >
              <h3 className="contact-form__title">프로젝트 문의</h3>
              <p className="contact-form__subtitle">
                내용을 남겨주시면 확인 후 연락드리겠습니다.
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">
                    이름 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="form-control"
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-company">회사명</label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    className="form-control"
                    placeholder="회사명 (선택)"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-email">
                    이메일 <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-control"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">
                    연락처 <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    className="form-control"
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-category">시공 분야</label>
                <select
                  id="contact-category"
                  name="category"
                  className="form-control"
                >
                  <option value="">분야를 선택하세요</option>
                  <option value="demolition">철거</option>
                  <option value="tile">타일</option>
                  <option value="carpentry">목공</option>
                  <option value="wallpaper">도배</option>
                  <option value="paint">도장</option>
                  <option value="electric">전기</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">
                  문의 내용 <span className="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-control"
                  placeholder="시공 분야, 예상 일정, 공간의 크기 등을 자유롭게 적어주세요."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-submit" id="btn-send">
                메일 전송하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
