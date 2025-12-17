import { useNavigate, useParams } from "@solidjs/router";
import {
  Accessor,
  createEffect,
  createResource,
  createSignal,
  For,
  onCleanup,
  onMount,
  Setter,
  Show,
} from "solid-js";
import { Button, ContainerLabel, Tag } from "~/layout/Cards";
import { H1, H2 } from "~/layout/Headings";
import data from "../../db.json";
import Collection, { PortfolioCollection } from "~/components/Collection";
import VideoLib from "~/components/VideoLib";
import { MainKeypoint } from "~/components/MainKeypoint";

const collectionData: PortfolioCollection[] = data;

export default function ProjectPage() {
  const params = useParams();
  const navigate = useNavigate();

  async function findCollection(slug: string) {
    for (const collection of collectionData) {
      if (collection.slug === slug) return collection;
    }
  }

  const [project, { refetch }] = createResource(() => params.slug, findCollection);

  const [lightboxImg, setLighboxImg] = createSignal<string>();

  createEffect(() => {
    if (project.state === "ready" && !project()) {
      navigate("/projects", { replace: true });
    }
  });

  const [coverWebP, setCoverWebP] = createSignal<string>();

  createEffect(() => {
    const p = project();
    if (!p) return;

    if (p.cover.endsWith(".jpg") || p.cover.endsWith(".jpeg")) {
      const base = p.cover.replace(/\.(jpg|jpeg)$/i, "");
      setCoverWebP(`${base}.webp`);
    } else {
      setCoverWebP("");
    }
  });

  const Media = (props: { jpeg: string; webp?: string }) => {
    return (
      <picture>
        <Show when={props.webp}>
          <source srcset={props.webp} type="image/webp" />
        </Show>
        <img
          src={props.jpeg}
          class="-z-1 w-full object-cover scale-120 h-full fixed top-0 blur-xl"
          loading="eager"
        />
      </picture>
    );
  };

  return (
    <>
      <main class="w-full">
        <Show when={project()} fallback={<div>Loading</div>} keyed>
          <Show when={lightboxImg()}>
            <Lightbox src={{ get: lightboxImg, set: setLighboxImg }} />
          </Show>
          <Show when={project()?.cover} keyed>
            {p => (
              <Media
                jpeg={p}
                webp={coverWebP() || undefined}
              />
            )}
          </Show>
          <div class="-z-1 w-full fixed h-screen dark:backdrop-brightness-150 backdrop-saturate-200 bg-white mix-blend-soft-light"></div>
          <section class="h-full flex items-center bg-white/50 dark:bg-neutral-950/90">
            <article class="flex flex-col items-center w-full px-6">
              <div class="flex flex-col gap-6 items-center w-full py-36 max-w-3xl">
                <div
                  class="flex flex-col def__animate w-fit justify-center"
                >
                  <img
                    src={project()?.clientLogo}
                    class="aspect-auto max-h-9 max-w-24 not-dark:invert opacity-20"
                    loading="eager"
                  />
                </div>
                <span class="text-center"><H1>{project()?.title as string}</H1></span>
                <div class="hidden lg:flex justify-center gap-1 w-full flex-wrap pt-18">
                  <For each={project()?.tags}>
                    {(tag) => (
                      <Tag href={`/projects?tags=${tag.replace(" ", "+")}`}>
                        {tag}
                      </Tag>
                    )}
                  </For>
                </div>
              </div>
            </article>
          </section>
          <section class="bg-white dark:bg-neutral-950 lg:pt-18 border-t border-b border-black/10 dark:border-white/10 px-6">
            <div class="flex flex-col lg:flex-row gap-3 max-w-3xl mx-auto my-18 p-6 border border-neutral-100 dark:border-neutral-900 rounded-3xl">
              <div class="text-black/10 dark:text-white/10 not-lg:border-b lg:border-r border-black/10 dark:border-white/10 w-fit pr-2 py-1 h-fit">
                <ContainerLabel>Objective</ContainerLabel>
              </div>
              <p class="text-black dark:text-white">
                {project()?.projectObjective}
              </p>
            </div>
            <section class="pb-18 lg:pt-18 lg:pb-36">
              <Show when={project()} keyed>
                {(p) => <MainKeypoint data={p} />}
              </Show>
            </section>
            <section class="flex flex-col gap-6 lg:gap-18 border-t border-black/10 dark:border-white/10 py-18 lg:py-36">
              <For each={project()?.projectKeypoints}>
                {(keypoint) => {
                  let boxRef!: HTMLDivElement;

                  onMount(() => {
                    if (!boxRef) return;

                    const observer = new IntersectionObserver(
                      ([entry], observer) => {
                        boxRef.classList.toggle("scrolled", !entry.isIntersecting);
                        if (entry.isIntersecting) observer.disconnect();
                      },
                      {
                        root: null,
                        rootMargin: "0px",
                        threshold: 0.5
                      }
                    );

                    observer.observe(boxRef);

                    onCleanup(() => observer.disconnect());
                  });
                  return (
                    <div class="w-full flex flex-col lg:flex-row gap-6 justify-between max-w-[1440px] mx-auto">
                      <div class="w-full flex items-start justify-center md:justify-start">
                        <div ref={boxRef} class="transition duration-500 max-w-lg dark:shadow-[0px_9px_18px_0px_rgb(0,0,0,0.25)] rounded-3xl p-6 flex flex-col gap-6 bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/5 dark:border-t dark:border-t-white">
                          <H2>{keypoint.title}</H2>
                          <p class="dark:text-white">{keypoint.description}</p>
                        </div>
                      </div>
                      <div class="w-full flex flex-col gap-6 lg:gap-18 items-end">
                        <For each={keypoint.media}>
                          {(media) => {
                            const filename = () => {
                              if (media.includes(".jpeg")) {
                                return media.split(".jpeg")[0];
                              } else if (media.includes(".jpg")) {
                                return media.split(".jpg")[0]
                              } else if (media.includes(".png")) {
                                return media.split(".png")[0]
                              }
                            }
                            let keypointMedia!: HTMLElement;

                            onMount(() => {
                              if (!keypointMedia) return;

                              const observer = new IntersectionObserver(
                                ([entry], observer) => {
                                  keypointMedia.classList.toggle("scrolled", !entry.isIntersecting);
                                  if (entry.isIntersecting) observer.disconnect();
                                },
                                {
                                  root: null,
                                  rootMargin: "0px",
                                  threshold: 0.5
                                }
                              );

                              observer.observe(keypointMedia);

                              onCleanup(() => observer.disconnect());
                            });

                            if (media.includes("mp4")) {
                              return (
                                <>
                                  <video ref={keypointMedia as HTMLVideoElement} src={media} autoplay muted loop class="border border-neutral-100 dark:border-neutral-900 rounded-xl aspect-auto" />
                                </>
                              )
                            } else {
                              return (
                                <picture ref={keypointMedia}>
                                  <source srcset={`${filename()}.webp`} type="image/webp" onClick={() => {
                                    setLighboxImg(`${filename()}.webp`);
                                  }} />
                                  <img
                                    class="border border-neutral-100 dark:border-neutral-900 w-full h-auto aspect-auto rounded-xl max-w-xl hover:brightness-105 hover:saturate-125 def__animate cursor-pointer"
                                    onClick={() => {
                                      setLighboxImg(media);
                                    }}
                                    src={media}
                                  />
                                </picture>
                              );
                            }

                          }}
                        </For>
                      </div>
                    </div>
                  );
                }}
              </For>
            </section>
            <Show when={project()!.projectVideos.length > 0}>
              <VideoLib videos={project()!.projectVideos} />
            </Show>
          </section>
        </Show>
        <section class="bg-white dark:bg-black">
          <Collection data={collectionData} />
        </section>
      </main>
    </>
  );
}

const Lightbox = ({
  src,
}: {
  src: { get: Accessor<string | undefined>; set: Setter<string | undefined> };
}) => {
  let imgRef!: HTMLImageElement;

  function clickHandler(e: PointerEvent) {
    const target = e.target;
    if (target !== imgRef) {
      src.set();
    }
  }

  onMount(() => {
    document.addEventListener("click", clickHandler)
    onCleanup(() => {
      document.removeEventListener("click", clickHandler)
    })
  }
  )

  return (
    <div class="z-10 fixed w-screen h-screen flex justify-center items-center bg-white/98 dark:bg-black/98">
      <div class="w-full pt-[5vh] flex flex-col items-center gap-3">
        <img ref={imgRef} class="max-h-[75dvh]" src={src.get()} />
        <Button
          type="button"
          onClick={() => {
            src.set();
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};