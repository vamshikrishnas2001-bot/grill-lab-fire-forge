import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/primitives";

export interface StoryClip {
  /**
   * Full URL to the video file (e.g. Vercel Blob, Cloudinary, Bunny.net).
   * Leave empty until you've uploaded real footage somewhere — the card
   * will just show the poster image until a src is provided.
   */
  src: string;
  /** Poster/thumbnail shown before playback and as a fallback when src is empty */
  poster: string;
  /** Small caption, e.g. "01 · THE CHARCOAL" */
  label: string;
  /** Subtitle under the caption, e.g. "1,200°F burn" */
  title: string;
}

/**
 * Add real clips here once you've uploaded footage to an external host
 * (Vercel Blob Storage, Cloudinary, Bunny.net, etc). Just paste the URL
 * into `src` — nothing else needs to change.
 *
 * Example:
 *   { src: "https://xxxx.public.blob.vercel-storage.com/charcoal.mp4",
 *     poster: charcoal, label: "01 · THE CHARCOAL", title: "1,200°F burn" }
 */
export const STORY_CLIPS: StoryClip[] = [];

export function StoryReel({ clips }: { clips: StoryClip[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  if (!clips.length) return null;

  function handleTap(i: number) {
    const clip = clips[i];
    if (!clip.src) return; // nothing to play yet, just a poster placeholder

    if (activeIndex === i) {
      // toggle play/pause on the already-open card
      const v = videoRefs.current[i];
      if (!v) return;
      if (v.paused) v.play();
      else v.pause();
      return;
    }

    // pause whichever was playing before
    if (activeIndex !== null) {
      videoRefs.current[activeIndex]?.pause();
    }
    setActiveIndex(i);
    requestAnimationFrame(() => {
      const v = videoRefs.current[i];
      if (v) {
        v.muted = muted;
        v.currentTime = 0;
        v.play();
      }
    });
  }

  function toggleMute(i: number, e: React.MouseEvent) {
    e.stopPropagation();
    const v = videoRefs.current[i];
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section className="py-16 md:py-32">
      <div className="container-grill">
        <SectionLabel>From the Fire</SectionLabel>
        <h2 className="display-lg mt-3 text-warm max-w-xl">The Truck, In Motion.</h2>
        <p className="mt-3 text-warm/60 max-w-md">Tap a clip to watch.</p>
      </div>

      <div className="container-grill mt-10">
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {clips.map((clip, i) => {
            const isActive = activeIndex === i;
            const isPlayable = Boolean(clip.src);

            return (
              <button
                key={clip.label + i}
                onClick={() => handleTap(i)}
                className={cn(
                  "relative shrink-0 w-[220px] md:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden border bg-bg2 snap-start text-left transition",
                  isActive ? "border-ember" : "border-white/10"
                )}
              >
                {isPlayable && (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={clip.src}
                    poster={clip.poster}
                    loop
                    playsInline
                    muted={muted}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {!isPlayable && (
                  <img
                    src={clip.poster}
                    alt={clip.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

                {isActive ? (
                  <Pause className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 text-warm/90" />
                ) : (
                  <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 text-warm/90" />
                )}

                {isActive && isPlayable && (
                  <button
                    onClick={(e) => toggleMute(i, e)}
                    className="absolute top-2 right-2 text-warm/80 hover:text-warm transition"
                  >
                    {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                )}

                <div className="absolute left-3 right-3 bottom-3">
                  <p className="label-mono text-ember text-[10px] whitespace-nowrap overflow-hidden text-ellipsis">{clip.label}</p>
                  <p className="text-warm text-sm font-medium leading-tight mt-1">{clip.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
