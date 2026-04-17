export default function TrustBanner() {
  return (
    <section className="trust-banner">
      <div className="container">
        <h2 className="trust-banner__title">
          작업 과정을 직접 보고 비교한 뒤 결정하세요
        </h2>
        <p className="trust-banner__desc">
          공개된 시공 기록과 업체 정보를 통해 이용자가 직접 확인하고 판단할 수
          있도록 돕습니다.
        </p>
        <a
          href="#contact"
          className="trust-banner__btn hover:shadow-xl transition-all duration-300 active:scale-95 inline-block"
        >
          업체 상담 요청하기 →
        </a>
      </div>
    </section>
  );
}
