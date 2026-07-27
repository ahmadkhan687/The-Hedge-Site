import Image from "next/image";
import { toDisplayHtml } from "@/lib/rich-text";
import type { ArticleBlock, ListItem } from "@/lib/articles";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

function Html({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "p" | "h2" | "h3" | "div";
}) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: toDisplayHtml(text) }}
    />
  );
}

export default function ArticleBody({ blocks }: ArticleBodyProps) {
  if (!blocks.length) return null;

  return (
    <div className="flex flex-col gap-7">
      {blocks.map((block) => {
        if (block.type === "heading") {
          if (block.level === 3) {
            return (
              <Html
                key={block.id}
                as="h3"
                text={block.text}
                className="mt-4 font-eb-garamond text-[clamp(1.35rem,3vw,1.75rem)] font-medium leading-[1.3] text-[#111]"
              />
            );
          }

          return (
            <Html
              key={block.id}
              as="h2"
              text={block.text}
              className="mt-6 font-eb-garamond text-[clamp(1.5rem,3.5vw,2rem)] font-semibold leading-[1.25] text-[#111]"
            />
          );
        }

        if (block.type === "quote") {
          return (
            <aside
              key={block.id}
              className="my-2 border border-[#C6A02C]/25 bg-[#EDE6D8] px-6 py-7 sm:px-8 sm:py-8"
            >
              <p className="font-eb-garamond text-[clamp(1.15rem,2.5vw,1.4rem)] font-medium italic leading-[1.55] text-[#111]">
                &ldquo;
                <Html text={block.text} />
                &rdquo;
              </p>
              {block.citation ? (
                <p className="mt-4 font-inter text-xs font-extrabold uppercase tracking-[0.08em] text-[#6B665F]">
                  {block.citation}
                </p>
              ) : null}
            </aside>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={block.id} className="flex flex-col gap-5 py-1">
              {block.items.map((item: ListItem) => (
                <li key={item.id} className="flex gap-3.5">
                  <span
                    className="mt-2 size-2.5 shrink-0 bg-[#C6A02C]"
                    aria-hidden
                  />
                  <p className="font-eb-garamond text-lg leading-[1.55] text-[#111] sm:text-xl">
                    {item.title ? (
                      <>
                        <Html
                          text={item.title}
                          className="font-semibold"
                        />
                        {item.text ? (
                          <span className="font-normal text-[#111]/80">
                            {" "}
                            — <Html text={item.text} />
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <Html text={item.text} />
                    )}
                  </p>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "image" && block.url) {
          return (
            <figure key={block.id} className="my-2 flex flex-col gap-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111]/5">
                <Image
                  src={block.url}
                  alt={block.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                  unoptimized={block.url.includes("supabase.co")}
                />
              </div>
              {block.alt ? (
                <figcaption className="font-inter text-sm text-[#6B665F]">
                  {block.alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "paragraph") {
          return (
            <Html
              key={block.id}
              as="div"
              text={block.text}
              className={
                block.lead
                  ? "font-eb-garamond text-[clamp(1.2rem,2.5vw,1.45rem)] font-normal leading-[1.65] text-[#111] [&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic [&_i]:italic"
                  : "font-eb-garamond text-lg font-normal leading-[1.7] text-[#111]/85 sm:text-xl [&_strong]:font-semibold [&_b]:font-semibold [&_em]:italic [&_i]:italic"
              }
            />
          );
        }

        return null;
      })}
    </div>
  );
}
