import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { content } from "../content";
import { assetUrl } from "../lib/asset";

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi],
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="galeria" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="section-title text-center">Galería</h2>

        <div className="relative mt-10">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {content.gallery.map((photo, i) => (
                <div
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_70%]"
                  key={photo.src + i}
                >
                  <div className="mx-2 aspect-[4/3] overflow-hidden rounded-xl bg-black/5">
                    <img
                      src={assetUrl(photo.src)}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      width={800}
                      height={600}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          >
            ›
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {content.gallery.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a foto ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === selected ? "bg-[var(--color-brand)]" : "bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
