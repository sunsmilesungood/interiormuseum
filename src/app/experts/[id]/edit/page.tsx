"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Image as ImageIcon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function EditExpertPage() {
  const router = useRouter();
  const params = useParams();
  const expertId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expertData, setExpertData] = useState<any>(null);

  const [profileImageName, setProfileImageName] = useState<string>("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [existingProfileImageUrl, setExistingProfileImageUrl] = useState<string>("");
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // 포트폴리오(영상/이미지) 관리 상태
  const [portfolios, setPortfolios] = useState<any[]>([]);

  useEffect(() => {
    const fetchExpert = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("experts")
        .select("*, portfolios(*)")
        .eq("id", expertId)
        .single();
        
      if (data) {
        setExpertData(data);
        if (data.profile_image_url) {
          setExistingProfileImageUrl(data.profile_image_url);
        }
        
        if (data.portfolios && data.portfolios.length > 0) {
          setPortfolios(data.portfolios.map((p: any) => ({
            id: p.id,
            title: p.title || "",
            description: p.description || "",
            youtubeUrl: p.youtube_url || "",
            youtubeThumbnail: "",
            existingThumbnailUrl: p.youtube_thumbnail_url || "",
            thumbnailFile: null,
            thumbnailPreview: null,
          })));
        } else {
          setPortfolios([
            { title: "", description: "", youtubeUrl: "", youtubeThumbnail: "", thumbnailFile: null, existingThumbnailUrl: "", thumbnailPreview: null }
          ]);
        }
      } else {
        alert("데이터를 찾을 수 없습니다.");
        router.push("/");
      }
      setIsLoading(false);
    };

    fetchExpert();
  }, [expertId, router]);

  const addPortfolio = () => {
    setPortfolios([
      ...portfolios,
      { title: "", description: "", youtubeUrl: "", youtubeThumbnail: "", thumbnailFile: null, existingThumbnailUrl: "", thumbnailPreview: null },
    ]);
  };

  const removePortfolio = (index: number) => {
    setPortfolios(portfolios.filter((_, i) => i !== index));
  };

  const updatePortfolio = (index: number, field: string, value: any) => {
    const newPortfolios = [...portfolios];
    newPortfolios[index] = { ...newPortfolios[index], [field]: value };
    setPortfolios(newPortfolios);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const name = formData.get("name") as string;
      const category = formData.get("category") as string;
      const experience = formData.get("experience") as string;
      const specialty = formData.get("specialty") as string;
      const quote = formData.get("quote") as string;
      const bio = formData.get("bio") as string;
      const tagsString = formData.get("tags") as string;

      const supabase = createClient();
      
      // 1. 프로필 이미지 업로드 (변경된 경우에만)
      let profile_image_url = existingProfileImageUrl;
      if (profileImageFile) {
        const fileExt = profileImageFile.name.split('.').pop();
        const fileName = `profiles/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, profileImageFile);

        if (uploadError) throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
        
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        
        profile_image_url = publicUrlData.publicUrl;
      }

      // 2. 전문가(experts) 정보 Update
      const { error: expertError } = await supabase
        .from('experts')
        .update({
          name,
          category,
          experience,
          specialty,
          quote,
          bio,
          tags: tagsString,
          profile_image_url
        })
        .eq('id', expertId);

      if (expertError) throw new Error(`정보 수정 실패: ${expertError.message}`);

      // 3. 기존 포트폴리오 삭제 후 다시 Insert (단순화를 위해)
      await supabase.from('portfolios').delete().eq('expert_id', expertId);

      const validPortfolios = portfolios.filter(p => p.title || p.youtubeUrl || p.thumbnailFile || p.existingThumbnailUrl);
      
      if (validPortfolios.length > 0) {
        const portfoliosToInsert = [];

        for (const port of validPortfolios) {
          let youtube_thumbnail_url = port.existingThumbnailUrl; // 기존 URL 유지

          if (port.thumbnailFile) {
            const fileExt = port.thumbnailFile.name.split('.').pop();
            const fileName = `portfolios/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage
              .from('images')
              .upload(fileName, port.thumbnailFile);

            if (uploadError) throw new Error(`썸네일 업로드 실패: ${uploadError.message}`);
            
            const { data: publicUrlData } = supabase.storage
              .from('images')
              .getPublicUrl(fileName);
            
            youtube_thumbnail_url = publicUrlData.publicUrl;
          }

          portfoliosToInsert.push({
            expert_id: expertId,
            title: port.title,
            description: port.description,
            youtube_url: port.youtubeUrl,
            youtube_thumbnail_url
          });
        }

        const { error: portfoliosError } = await supabase
          .from('portfolios')
          .insert(portfoliosToInsert);

        if (portfoliosError) throw new Error(`포트폴리오 저장 실패: ${portfoliosError.message}`);
      }

      alert("성공적으로 수정되었습니다!");
      router.push(`/experts/${expertId}`);
      router.refresh();

    } catch (error: any) {
      console.error(error);
      alert(error.message || "수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="pt-[120px] pb-[100px] bg-[var(--color-bg)] text-center">
        <p>데이터를 불러오는 중입니다...</p>
      </main>
    );
  }

  return (
    <main className="pt-[120px] pb-[100px] bg-[var(--color-bg)]">
      <div className="container container--narrow">
        <div className="section-header mb-10">
          <p className="section-header__label">Admin</p>
          <h1 className="section-header__title">전문가 정보 수정</h1>
          <p className="section-header__desc">
            등록된 마스터의 프로필과 영상을 수정합니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-10 bg-white rounded-2xl shadow-sm"
        >
          <h3 className="contact-form__title text-xl mb-6">기본 정보</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                이름 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-control"
                placeholder="예: 김철수"
                defaultValue={expertData?.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">
                시공 분야 <span className="required">*</span>
              </label>
              <select id="category" name="category" required className="form-control" defaultValue={expertData?.category}>
                <option value="">분야 선택</option>
                <option value="demolition">철거</option>
                <option value="tile">타일</option>
                <option value="carpentry">목공</option>
                <option value="wallpaper">도배</option>
                <option value="paint">도장</option>
                <option value="electric">전기</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experience">
                경력 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                required
                className="form-control"
                placeholder="예: 15년"
                defaultValue={expertData?.experience}
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialty">주력 시공 공간</label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                className="form-control"
                placeholder="예: 하이엔드 주거공간"
                defaultValue={expertData?.specialty}
              />
            </div>
          </div>

          <div className="form-group">
            <label>프로필 이미지</label>
            <div className="mt-2">
              <input
                type="file"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProfileImageName(file.name);
                    setProfileImageFile(file);
                    setProfileImagePreview(URL.createObjectURL(file));
                  } else {
                    setProfileImagePreview(null);
                  }
                }}
              />
              {(profileImagePreview || existingProfileImageUrl) ? (
                <label 
                  htmlFor="profileImage"
                  className="block relative w-32 h-32 rounded-lg overflow-hidden border border-[var(--color-border)] group cursor-pointer"
                  title="프로필 이미지 교체"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={profileImagePreview || existingProfileImageUrl} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 text-white">
                    <ImageIcon size={24} />
                    <span className="text-xs font-medium mt-1">이미지 교체</span>
                  </div>
                </label>
              ) : (
                <label
                  htmlFor="profileImage"
                  className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-md)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <ImageIcon size={20} className="text-gray-400" />
                  프로필 이미지 업로드하기
                </label>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="quote">인용구 (한줄 철학)</label>
            <input
              type="text"
              id="quote"
              name="quote"
              className="form-control"
              placeholder="예: 공간은 그곳에 머무는 사람을 닮아야 합니다."
              defaultValue={expertData?.quote}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">
              상세 소개 (Bio) <span className="required">*</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              required
              className="form-control"
              rows={4}
              placeholder="마스터의 철학과 상세한 시공 경력을 적어주세요."
              defaultValue={expertData?.bio}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="tags">태그 (쉼표로 구분)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-control"
              placeholder="예: 꼼꼼함, 책임시공, 하이엔드, 상업공간"
              defaultValue={expertData?.tags}
            />
          </div>

          <hr className="my-10 border-0 border-t border-[var(--color-border-light)]" />

          <div className="flex justify-between items-center mb-6">
            <h3 className="contact-form__title text-xl m-0">
              포트폴리오 (영상/이미지)
            </h3>
            <button
              type="button"
              onClick={addPortfolio}
              className="flex items-center gap-1 text-sm font-semibold text-[var(--color-navy)] hover:text-opacity-80 transition-opacity"
            >
              <Plus size={16} /> 포트폴리오 추가
            </button>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            {portfolios.map((port, index) => (
              <div
                key={index}
                className="p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-bg)] relative group"
              >
                <button
                  type="button"
                  onClick={() => removePortfolio(index)}
                  className="absolute right-4 top-4 text-[#e8534a] hover:bg-red-50 p-1.5 rounded-full transition-colors"
                  title="삭제"
                >
                  <Trash2 size={20} />
                </button>

                <h4 className="text-[0.9375rem] font-bold mb-4 text-[var(--color-navy)]">
                  포트폴리오 #{index + 1}
                </h4>

                <div className="form-group mb-4">
                  <label>작업 제목</label>
                  <input
                    type="text"
                    className="form-control"
                    value={port.title}
                    onChange={(e) => updatePortfolio(index, "title", e.target.value)}
                    placeholder="예: 압구정 현대아파트 전체 리모델링"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group mb-4">
                    <label>유튜브 URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={port.youtubeUrl}
                      onChange={(e) => updatePortfolio(index, "youtubeUrl", e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label>유튜브 썸네일</label>
                    <div className="mt-1">
                      <input
                        type="file"
                        id={`thumbnail-${index}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            updatePortfolio(index, "youtubeThumbnail", file.name);
                            updatePortfolio(index, "thumbnailFile", file);
                            updatePortfolio(index, "thumbnailPreview", URL.createObjectURL(file));
                          }
                        }}
                      />
                      {(port.thumbnailPreview || port.existingThumbnailUrl) ? (
                        <label 
                          htmlFor={`thumbnail-${index}`}
                          className="block relative w-full max-w-[240px] aspect-video rounded-lg overflow-hidden border border-[var(--color-border)] group cursor-pointer"
                          title="썸네일 이미지 교체"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={port.thumbnailPreview || port.existingThumbnailUrl} 
                            alt="Thumbnail Preview" 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 text-white">
                            <ImageIcon size={24} />
                            <span className="text-sm font-medium mt-1">썸네일 교체</span>
                          </div>
                        </label>
                      ) : (
                        <label
                          htmlFor={`thumbnail-${index}`}
                          className="flex items-center justify-center gap-2 w-full h-[46px] border border-[var(--color-border)] rounded-[var(--radius-md)] bg-white text-[var(--color-text-secondary)] text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors px-4"
                        >
                          <ImageIcon size={18} className="text-gray-400" />
                          <span>썸네일 이미지 업로드</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group mb-0">
                  <label>간단한 설명</label>
                  <input
                    type="text"
                    className="form-control"
                    value={port.description}
                    onChange={(e) => updatePortfolio(index, "description", e.target.value)}
                    placeholder="투입된 인력과 시공 포인트를 적어주세요."
                  />
                </div>
              </div>
            ))}

            {portfolios.length === 0 && (
              <div className="text-center p-10 border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] text-[var(--color-text-tertiary)] text-sm">
                등록된 포트폴리오가 없습니다. [포트폴리오 추가] 버튼을 눌러주세요.
              </div>
            )}

            <button
              type="button"
              onClick={addPortfolio}
              className="flex items-center justify-center gap-1.5 p-3.5 mt-2 w-full border border-dashed border-[var(--color-border)] rounded-[var(--radius-md)] bg-white text-[var(--color-text-secondary)] text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <Plus size={16} /> 포트폴리오 추가
            </button>
          </div>

          <button
            type="submit"
            className="btn-submit flex justify-center items-center gap-2 w-full"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1 }}
          >
            <Save size={18} />
            {isSubmitting ? "수정 중..." : "전문가 정보 수정하기"}
          </button>
        </form>
      </div>
    </main>
  );
}
