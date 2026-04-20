"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Expert } from "@/data/dummyExperts";
import ExpertCard from "./ExpertCard";

const CATEGORIES = [
  "전체",
  "토탈",
  "철거",
  "타일",
  "목공",
  "도배",
  "가구",
  "전기",
  "창호",
  "기타",
];

export default function ExpertsSection({
  experts,
  showContactLink,
  hideHeader,
  limit,
}: {
  experts: Expert[];
  showContactLink?: boolean;
  hideHeader?: boolean;
  limit?: number;
}) {
  const [activeTab, setActiveTab] = useState("전체");

  const filtered =
    activeTab === "전체"
      ? experts
      : experts.filter((e) => e.category === activeTab);

  const filteredExperts = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="experts" className="experts">
      <div className="container">
        {!hideHeader && (
          <div className="section-header">
            <p className="section-header__label">Our ARCHIVE</p>
            <h2 className="section-header__title">
              분야별 작업 기록과 업체 정보
            </h2>
            <p className="section-header__desc">
              분야별 시공 과정과 업체 정보를 직접 보고 비교할 수 있습니다
            </p>
          </div>
        )}

        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className={`category-tab ${
                activeTab === cat ? "category-tab--active" : ""
              }`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="experts-grid">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
        <div className="experts-more">
          {showContactLink ? (
            <Link href="/#contact" className="experts-more__btn">
              문의하기
            </Link>
          ) : (
            <Link href="/experts" className="experts-more__btn">
              더보기
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
