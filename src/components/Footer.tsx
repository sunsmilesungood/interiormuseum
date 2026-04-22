import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__logo">인테리어뮤지엄</div>
            <p className="footer__desc">
              공간을 창조하는 예술가들을 세상에 알리고,
              <br />
              고객과 전문가 사이의 신뢰를 회복합니다.
            </p>
          </div>
          <div className="footer__links">
            <div className="footer__link-group">
              <h4>서비스</h4>
              <Link href="/experts">전문가 찾기</Link>
              <Link href="/#contact">프로젝트 문의</Link>
              {/* <Link href="#">시공 가이드</Link> */}
            </div>
            {/* <div className="footer__link-group">
              <h4>회사</h4>
              <Link href="/#about">회사 소개</Link>
              <Link href="#">이용약관</Link>
              <Link href="#">개인정보처리방침</Link>
            </div> */}
            <div className="footer__link-group">
              <h4>고객센터</h4>
              {/* <Link href="#">자주 묻는 질문</Link> */}
              <a href="mailto:interiormu@naver.com">이메일 문의</a>
              <a href="tel:02-1234-5678">전화 문의</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; 2026 인테리어뮤지엄. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
