import backgroundPattern from "@/assets/background-pattern.svg";

export const ChatArea = () => (
  <main className='relative flex-1 overflow-hidden bg-(image:--gradient-chat)'>
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0 opacity-50'
      style={{
        backgroundColor: "var(--pattern-color)",
        maskImage: `url(${backgroundPattern})`,
        WebkitMaskImage: `url(${backgroundPattern})`,
        maskRepeat: "repeat",
        WebkitMaskRepeat: "repeat",
        maskSize: "280px",
        WebkitMaskSize: "280px"
      }}
    />
  </main>
);
