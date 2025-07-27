import React, { useEffect, useRef } from "react";
import "@/assets/lyrics.css";

// --- TypeScript Interfaces ---
interface LyricSegment {
  utf8: string;
}

export interface LyricLine {
  tStartMs: number;
  dDurationMs: number;
  segs?: LyricSegment[] | null;
}

export interface RollingLyricsProps {
  lyrics: LyricLine[];
  currentTime: number; // Current time in seconds
  height?: number;
  largeSize?: boolean;
}

// --- React Component ---
const RollingLyrics: React.FC<RollingLyricsProps> = ({
  lyrics,
  currentTime,
  height,
  largeSize,
}) => {
  // A ref to hold an array of refs, one for each lyric line element
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Find the index of the current active lyric line.
  // 'findLastIndex' is perfect for finding the last item that meets the condition,
  // which is exactly what we need for tracking progress through lyrics.
  const activeIndex = lyrics.findLastIndex(
    (line) => currentTime * 1000 >= line.tStartMs
  );

  // This effect runs whenever the active lyric line changes
  useEffect(() => {
    if (activeIndex !== -1 && lineRefs.current[activeIndex]) {
      // Scroll the active line into the center of the container
      lineRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  return (
    <div className={`lyrics-container ${height ? `h-[${height}px]` : ``} `}>
      {lyrics.map((line, index) => (
        <p
          key={`${line.tStartMs}-${index}`}
          // Assign the ref for each line to our array of refs
          ref={(el) => (lineRefs.current[index] = el)}
          className={`${largeSize ? "lyric-line-large" : "lyric-line"}  ${
            index === activeIndex ? "active text-black dark:text-white" : ""
          }  `}
        >
          {line.segs ? line.segs[0].utf8 : <></>}
        </p>
      ))}
    </div>
  );
};

export default RollingLyrics;
