import {
  createSignal,
  For,
  lazy,
  onCleanup,
  onMount,
  Show,
  Suspense,
} from "solid-js";
import { PortfolioCollection } from "~/types";
import TeaserCollection from "~/components/TeaserCollection";
import { H1, H2, SectionHeading } from "~/layout/Headings";
import SEO from "~/components/SEO";
import { Web3Form } from "~/components/Web3Form";
import { A, createAsync, query } from "@solidjs/router";
import PreviewProject from "~/components/PreviewProject";
import { useLenis } from "~/components/LenisProvider";

const fetchPortfolio = query(async (): Promise<PortfolioCollection[]> => {
  "use server";
  const res = await fetch("https://cdn.mikeangelo.art/db.json");
  return (await res.json()) as PortfolioCollection[];
}, "portfolio-home");

const landingHighlightLength = 3;

export default function Home() {
  let introPanel!: HTMLDivElement;
  let bgAnims!: HTMLDivElement;
  let tagInner!: HTMLDivElement;
  let moreContainer!: HTMLDivElement;
  let contactContainer!: HTMLDivElement;

  const [isPaused, setIsPaused] = createSignal(false);

  const LottieAnim = lazy(() => import("../components/LottieAnim"));
  const BgGradient = lazy(() => import("../components/BgGradient"));
  const Panel3d = lazy(() => import("../components/Panel3d"));

  const portfolioCollection = createAsync(() => fetchPortfolio());

  onMount(() => {
    const lenis = useLenis();
    let offset = 0;
    const scrollYLimit = 200;
    const scrollSpeed = 0.08;

    if (tagInner) {
      const original = Array.from(tagInner.children) as HTMLElement[];
      original.forEach((child) => {
        const clone = child.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        tagInner.appendChild(clone);
      });
    }

    function getHalf() {
      return tagInner ? tagInner.scrollWidth / 2 : 0;
    }

    function wrapOffset(val: number) {
      const half = getHalf();
      if (!half) return val;
      return ((val % half) + half) % half;
    }

    let isVisible = true;

    const visibilityHandler = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    const scrollerObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 },
    );

    function animate(_currentTime: number, delta: number) {
      if (isPaused() || !isVisible) return;

      offset = wrapOffset(offset + scrollSpeed * delta);
      if (tagInner) tagInner.style.transform = `translateX(${-offset}px)`;
    }

    const unregisterLenis = lenis!.registerCallback((time, delta) => {
      animate(time, delta);

      if (lenis?.lenis()) {
        const scroll = lenis.lenis()?.scroll || 0;
        introPanel.classList.toggle("blur-xl", scroll > scrollYLimit);
        introPanel.classList.toggle("opacity-0", scroll > scrollYLimit);
        introPanel.style.setProperty("--scroll-y", `${scroll}px`);
      }
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };

    const opacityObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        target.classList.add("translate-y-9");
        if (entry.isIntersecting) {
          target.classList.remove("scrolled");
          target.classList.remove("translate-y-9");
          observer.unobserve(target);
        } else {
          target.classList.add("scrolled");
          target.classList.add("translate-y-9");
        }
      });
    }, observerOptions);

    const expandObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const { target } = entry;
        if (entry.isIntersecting) {
          target.classList.add("lg:gap-3");
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    let hasTrackedBlurb = false;
    const blurbObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedBlurb) {
            hasTrackedBlurb = true;
            blurbObserver.unobserve(entry.target);

            const target = entry.target as HTMLDivElement;
            const handleScroll = () => {
              const { offsetHeight } = target;
              const { scrollY } = window;

              if (scrollY >= offsetHeight - 96) {
                target.style.position = "sticky";
                target.style.top = "0px";
                target.style.left = "0px";
                //target.style.zIndex = "-2";
              } else {
                target.style.position = "";
                target.style.top = "";
                target.style.left = "";
                target.style.zIndex = "";
              }

              target.classList.toggle(
                "opacity-0",
                scrollY >= offsetHeight * 1.25,
              );
              target.classList.toggle("invisible", scrollY >= offsetHeight * 2);
            };

            document.addEventListener("scroll", handleScroll, {
              passive: true,
            });

            onCleanup(() => {
              document.removeEventListener("scroll", handleScroll);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    opacityObserver.observe(moreContainer);
    opacityObserver.observe(contactContainer);

    onCleanup(() => {
      unregisterLenis();
      document.removeEventListener("visibilitychange", visibilityHandler);
      scrollerObserver.disconnect();
      opacityObserver.disconnect();
      expandObserver.disconnect();
      blurbObserver.disconnect();
    });
  });

  return (
    <>
      <SEO
        title="Creative Technologist in New Jersey and New York - Mike Angelo | Graphic and Motion Design, Web Development, and Advertising Campaigns"
        description="Mike Angelo is a Creative Technologist serving New Jersey and the greater New York area, specializing in advertising campaigns, web design and development, and comprehensive advertising campaigns."
        canonical="https://mikeangelo.art"
        ogImage="https://cdn.mikeangelo.art/og-default.png"
        localBusiness={true}
        organization={true}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mike Angelo",
          jobTitle: "Creative Technologist",
          description:
            "Creative Technologist serving New Jersey and the greater New York area",
          url: "https://mikeangelo.art",
          address: {
            "@type": "PostalAddress",
            addressRegion: "NJ",
            addressCountry: "US",
          },
          knowsAbout: [
            "Art Direction",
            "Web Design",
            "Advertising Campaigns",
            "Content Creation",
            "Web Development",
          ],
        }}
      />
      <main class="w-full relative flex flex-col justify-center items-center">
        <section
          class="w-full h-screen fixed top-0 left-0 fade__animate -z-10"
          ref={bgAnims}
        >
          <Suspense>
            <div class="fade__animate h-screen w-full flex justify-center items-center">
              <Panel3d model="https://cdn.mikeangelo.art/MA_Logo_3D.glb" />
            </div>
            <BgGradient />
            <LottieAnim url="https://cdn.mikeangelo.art/anim.json" />
          </Suspense>
        </section>
        <section class="w-full h-screen -z-10"></section>
        <section class="px-6 -z-10 fixed top-0 left-0 overflow-hidden perspective-normal mix-blend-difference h-screen w-full flex justify-center items-center">
          <article
            ref={introPanel}
            style={{
              transform: "translateZ(calc(var(--scroll-y, 0px) * -0.5))",
            }}
            class="def__animate w-full flex flex-col justify-start md:ml-36 lg:ml-72 lg:items-center md:flex-row gap-4 md:gap-6 lg:gap-8"
          >
            <div class="not-dark:invert flex flex-col justify-center text-left w-full max-w-md">
              <H1>Hi. I'm Mike.</H1>
              <p class="dark:invert transition-opacity duration-100 ease-out">
                I design high-quality creative assets for digital marketing,
                social media content, and web development.
              </p>
            </div>
          </article>
        </section>

        <div class="z-2 w-full">
          <section class="bg-neutral-100 dark:bg-neutral-950 w-full">
            <SectionHeading>Project Highlights</SectionHeading>
          </section>
          <section class="w-full bg-white dark:bg-black py-18">
            <Show when={portfolioCollection()}>
              <For each={portfolioCollection()}>
                {(collection, idx) =>
                  idx() < landingHighlightLength && (
                    <PreviewProject
                      data={collection}
                      reverse={idx() % 2 === 1}
                    />
                  )
                }
              </For>
            </Show>
          </section>
          <section class="w-full flex flex-col bg-white dark:bg-black">
            <div class="bg-neutral-100 dark:bg-neutral-950 w-full">
              <SectionHeading>More Projects</SectionHeading>
            </div>
            <div
              ref={moreContainer}
              class="fade__animate w-full flex flex-col gap-9 justify-center max-w-7xl mx-auto py-18 px-6"
            >
              <Show when={portfolioCollection()}>
                <TeaserCollection
                  data={portfolioCollection() as PortfolioCollection[]}
                  limit={4}
                />
              </Show>
              <A
                href="/projects"
                class="text-center lg:mx-auto lg:text-left lg:flex w-full lg:w-fit items-center gap-2 text-xl font-bold px-9 py-6 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:gap-3 transition-all duration-200 group/link"
              >
                View All Projects
              </A>
            </div>
          </section>
          <section class="py-36 border-t border-black/10 dark:border-white/10 w-full bg-white dark:bg-black">
            <div
              ref={contactContainer}
              class="fade__animate flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-18 xl:gap-24 items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto lg:max-w-7xl w-full"
            >
              <div class="flex flex-col gap-4 md:gap-6 lg:max-w-md xl:max-w-lg px-4 sm:px-6">
                <span class="dark:text-shadow-lg text-shadow-black/10">
                  <H2>Drop me a line.</H2>
                </span>
                <p class="text-black dark:text-white">
                  I'm always looking for new opportunities and collaborations.
                  Let's build something great.
                </p>
              </div>
              <Web3Form />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
