"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        return;
      }

      router.push("/experts/new");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--color-navy)",
              marginBottom: "1rem",
            }}
          >
            <Lock size={22} color="#fff" />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--color-navy)",
              marginBottom: "0.375rem",
            }}
          >
            관리자 로그인
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            인테리어뮤지엄 관리자 전용 페이지입니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            padding: "2rem",
          }}
        >
          {error && (
            <div
              style={{
                marginBottom: "1.25rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            style={{
              width: "100%",
              marginTop: "0.5rem",
              opacity: isLoading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
            disabled={isLoading}
          >
            <Lock size={16} />
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
