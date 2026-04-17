"use client";

import { useState, useTransition } from "react";
import { sendContactEmail } from "@/app/actions/contact";

type Toast = { message: string; success: boolean } | null;

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<Toast>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendContactEmail({ success: false, message: "" }, formData);
      setToast(result);
      setTimeout(() => setToast(null), 3500);
    });
  }

  return (
    <form className="contact-form" action={handleSubmit}>
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
              disabled={isPending}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-expert">찾는 전문가 이름</label>
            <input
              type="text"
              id="contact-expert"
              name="expertName"
              className="form-control"
              placeholder="전문가 이름 (선택)"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="form-row">
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
              disabled={isPending}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-address">공사 주소</label>
            <input
              type="text"
              id="contact-address"
              name="address"
              className="form-control"
              placeholder="공사 주소를 입력하세요"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contact-category">시공 분야</label>
          <select
            id="contact-category"
            name="category"
            className="form-control"
            disabled={isPending}
          >
            <option value="">분야를 선택하세요</option>
            <option value="demolition">철거</option>
            <option value="tile">타일</option>
            <option value="carpentry">목공</option>
            <option value="wallpaper">도배</option>
            <option value="furniture">가구</option>
            <option value="electric">전기</option>
            <option value="total">토탈</option>
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
            placeholder="문의 내용을 자유롭게 적어주세요."
            required
            disabled={isPending}
          ></textarea>
        </div>

        <button type="submit" className="btn-submit" disabled={isPending}>
          {isPending ? "전송 중..." : "메일 전송하기"}
        </button>

        {toast && (
          <div className={`form-toast ${toast.success ? "form-toast--success" : "form-toast--error"}`}>
            <span className="form-toast__icon">{toast.success ? "✓" : "✕"}</span>
            {toast.message}
          </div>
        )}
      </form>
  );
}
