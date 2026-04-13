export default function TrustBanner() {
  return (
    <section className="trust-banner">
      <div className="container">
        <h2 className="trust-banner__title">
          전문가의 작업을 영상으로 직접 보고 결정하세요
        </h2>
        <p className="trust-banner__desc">
          가장 정직하게 실력을 증명하는 마스터들이 기다리고 있습니다.
        </p>
        <a href="#contact" className="trust-banner__btn hover:-translate-y-1 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 inline-block">
          무료 상담 신청하기 →
        </a>
      </div>
    </section>
  );
}
