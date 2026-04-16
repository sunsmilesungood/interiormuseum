export default function ExpertDetailLoading() {
  return (
    <main style={{ paddingTop: "72px" }}>
      <section className="detail-hero">
        <div className="container">
          <div className="profile-layout">
            <div
              className="profile-image"
              style={{
                background: "var(--color-border, #e5e7eb)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <div
              className="profile-content"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[120, 200, 160, 260, 180].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: i === 1 ? "2.5rem" : "1rem",
                    width: `${w}px`,
                    borderRadius: "0.375rem",
                    background: "var(--color-border, #e5e7eb)",
                    animation: "pulse 1.5s ease-in-out infinite",
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </main>
  );
}
