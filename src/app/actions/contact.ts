"use server";

import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY_TEST);

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const category = formData.get("category") as string;
  const message = formData.get("message") as string;

  const categoryLabel: Record<string, string> = {
    demolition: "철거",
    tile: "타일",
    carpentry: "목공",
    wallpaper: "도배",
    paint: "도장",
    electric: "전기",
    other: "기타",
  };

  try {
    await resend.emails.send({
      from: "인테리어뮤지엄 <onboarding@resend.dev>",
      to: ["kimhogy@gmail.com"], // 가입한 이메일만 허용됨(무료플랜)
      subject: `[문의] ${name}님의 프로젝트 문의`,
      html: `
        <h2>새로운 프로젝트 문의가 접수되었습니다.</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; width: 120px;">이름</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          ${
            company
              ? `
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">회사명</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${company}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">이메일</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">연락처</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone}</td>
          </tr>
          ${
            category
              ? `
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">시공 분야</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${categoryLabel[category] ?? category}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; vertical-align: top;">문의 내용</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 16px; color: #888; font-size: 13px;">
          회신 이메일: <a href="mailto:${email}">${email}</a>
        </p>
      `,
    });

    return {
      success: true,
      message: "문의가 접수되었습니다. 빠르게 연락드리겠습니다.",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
