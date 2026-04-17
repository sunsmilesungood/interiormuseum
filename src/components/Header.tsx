import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          {user && (
            <Link href="/experts/new" className="header__admin-btn">
              관리자
            </Link>
          )}
          <Link href="/#contact" className="header__cta">
            업체 정보 요청
          </Link>
        </nav>
      </div>
    </header>
  );
}
