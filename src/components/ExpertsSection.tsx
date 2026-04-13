"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Expert } from "@/data/dummyExperts";
import ExpertCard from "./ExpertCard";

const CATEGORIES = [
  "전체",
  "철거",
  "타일",
  "목공",
  "도배",
  "도장",
  "전기",
  "창호",
];

export default function ExpertsSection({ experts }: { experts: Expert[] }) {
  const [activeTab, setActiveTab] = useState("전체");

  const filteredExperts =
    activeTab === "전체"
      ? experts
      : experts.filter((e) => e.category === activeTab);

  return (
    <section id="experts" className="experts">
      <div className="container">
        <div className="section-header">
          <p className="section-header__label">Our Masters</p>
          <h2 className="section-header__title">분야별 최고의 전문가들</h2>
          <p className="section-header__desc">
            자부심을 가지고 공간을 완성하는 인테리어 마스터들을 만나보세요
          </p>
        </div>

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
          <a href="#contact" className="experts-more__btn">
            더보기
            <ChevronDown
              size={16}
              strokeWidth={2}
              style={{ marginLeft: "4px" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
