"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Props = {
  expertId: string;
  profileImageUrl?: string | null;
  portfolioImageUrls?: (string | null | undefined)[];
};

function extractStoragePath(publicUrl: string): string | null {
  try {
    const marker = "/storage/v1/object/public/images/";
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return publicUrl.slice(idx + marker.length);
  } catch {
    return null;
  }
}

export default function DeleteExpertButton({
  expertId,
  profileImageUrl,
  portfolioImageUrls = [],
}: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const supabase = createClient();

      // 1. Storage에서 이미지 삭제
      const pathsToDelete: string[] = [];

      if (profileImageUrl) {
        const path = extractStoragePath(profileImageUrl);
        if (path) pathsToDelete.push(path);
      }

      for (const url of portfolioImageUrls) {
        if (url) {
          const path = extractStoragePath(url);
          if (path) pathsToDelete.push(path);
        }
      }

      if (pathsToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("images")
          .remove(pathsToDelete);

        if (storageError) {
          console.error("이미지 삭제 오류:", storageError.message);
          // 이미지 삭제 실패해도 계속 진행 (이미 없는 파일일 수 있음)
        }
      }

      // 2. DB에서 포트폴리오 삭제
      const { error: portfolioError } = await supabase
        .from("portfolios")
        .delete()
        .eq("expert_id", expertId);

      if (portfolioError) throw new Error(`포트폴리오 삭제 실패: ${portfolioError.message}`);

      // 3. DB에서 전문가 삭제
      const { error: expertError } = await supabase
        .from("experts")
        .delete()
        .eq("id", expertId);

      if (expertError) throw new Error(`전문가 삭제 실패: ${expertError.message}`);

      router.push("/experts");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "삭제 중 오류가 발생했습니다.");
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
          정말 삭제하시겠습니까?
        </span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            padding: "8px 16px",
            backgroundColor: "#e8534a",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: isDeleting ? "not-allowed" : "pointer",
            opacity: isDeleting ? 0.7 : 1,
          }}
        >
          {isDeleting ? "삭제 중..." : "삭제 확인"}
        </button>
        {!isDeleting && (
          <button
            onClick={() => setShowConfirm(false)}
            style={{
              padding: "8px 16px",
              backgroundColor: "white",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            취소
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      style={{
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 20px",
        backgroundColor: "white",
        color: "#e8534a",
        border: "1px solid #e8534a",
        borderRadius: "var(--radius-md)",
        fontSize: "0.9375rem",
        fontWeight: 600,
        cursor: "pointer",
        lineHeight: 1,
      }}
    >
      <Trash2 size={16} />
      삭제
    </button>
  );
}
