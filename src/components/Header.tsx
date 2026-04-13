import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner container container--wide">
        <Link href="/" className="header__logo">
          <span className="header__logo-icon">IM</span>
          인테리어뮤지엄
        </Link>
        <nav className="header__nav">
          <Link href="/#about">소개</Link>
          <Link href="/experts">전문가</Link>
          <Link href="/#contact">문의하기</Link>
          <Link href="/#contact" className="header__cta">
            무료 상담 신청
          </Link>
        </nav>
      </div>
    </header>
  );
}
