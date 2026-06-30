import { Instagram } from "lucide-react";
import { Reveal, SectionLabel, CTAButton } from "@/components/primitives";

export interface InstaPost {
  /** Image shown inside the polaroid frame */
  img: string;
  /** Optional small caption under the photo, e.g. "12.4k likes" */
  caption?: string;
}

/** Your Instagram handle — shown in the heading and used for the "Follow" button link */
const IG_HANDLE = "thegrilllab";
const IG_URL = `https://instagram.com/${IG_HANDLE}`;

const TILTS = ["-rotate-6", "-rotate-2", "rotate-2", "rotate-6"];

export function InstaSection({ posts }: { posts: InstaPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container-grill">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionLabel>Chapter 06 · On The Gram</SectionLabel>
              <h2 className="display-lg mt-3 text-warm max-w-xl">
                Follow the Fire — <span className="text-ember">@{IG_HANDLE}</span>
              </h2>
              <p className="mt-3 text-warm/60 max-w-md">
                Behind-the-scenes char, daily drops, and the truck on the move.
              </p>
            </div>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <CTAButton variant="ghost" className="gap-2">
                <Instagram className="h-4 w-4" />
                Follow on Instagram
              </CTAButton>
            </a>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-center gap-x-2 gap-y-10 md:gap-x-0">
          {posts.map((post, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block ${TILTS[i % TILTS.length]} hover:rotate-0 hover:scale-105 transition-transform duration-500 ease-out md:-mx-3`}
              >
                <div className="bg-[#f4f1ea] p-3 pb-10 w-[170px] sm:w-[200px] md:w-[230px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]">
                  <div className="aspect-square overflow-hidden bg-bg2">
                    <img
                      src={post.img}
                      alt="The Grill Lab on Instagram"
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition duration-700"
                    />
                  </div>
                  {post.caption && (
                    <p className="mt-3 text-center font-display text-sm text-black/70 truncate">
                      {post.caption}
                    </p>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
