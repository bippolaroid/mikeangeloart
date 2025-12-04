import { A, useNavigate, useParams } from "@solidjs/router";
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
import { Button, ContainerLabel, LinkButton, Tag } from "~/layout/Cards";
import { H1, H2 } from "~/layout/Headings";
import data from "../../db.json";
import Collection, { PortfolioCollection } from "~/components/Collection";
import { slugify } from "~/hooks";
import VideoLib from "~/components/VideoLib";

const collectionData: PortfolioCollection[] = data;

export function MainKeypoint(props: {
  data: PortfolioCollection;
  standalone?: boolean;
  reverse?: boolean;
}) {
  return (
    <section class="z-1 w-full relative flex flex-col gap-18">
      <header class="z-1 flex flex-col gap-6 px-6 lg:px-0 text-black dark:text-white">
        <div
          class={`text-black/20 w-full dark:text-white/20 h-fit border-b border-b-black/10 dark:border-b-white/10 pb-1${
            props.standalone ? " mb-6" : ""
          }`}
        >
          <ContainerLabel>Project Highlight</ContainerLabel>
        </div>
        <Show when={props.standalone}>
          <div class="flex flex-col gap-18 py-18 lg:flex-row justify-center items-center w-full max-w-7xl mx-auto">
            <div class="flex flex-col gap-6 w-full">
              <A
                href={`/projects?client=${slugify(props.data.clientName)}`}
                class="w-full hover:opacity-50 def__animate"
              >
                <img
                  src={props.data.clientLogo}
                  class="not-dark:invert opacity-20 max-h-24 max-w-24"
                  loading="lazy"
                />
              </A>
              <A
                href={`/projects/${props.data.slug}`}
                class="w-full hover:opacity-50 def__animate"
              >
                <H1>{props.data.title}</H1>
              </A>
            </div>
            <div class="w-full flex flex-col gap-6 max-w-xl">
              <div class="flex flex-col gap-1 text-black dark:text-white w-full border border-neutral-100 dark:border-neutral-900 p-6 rounded-3xl">
                <div class="text-black/20 w-fit dark:text-white/20 h-fit border-b border-b-black/10 dark:border-b-white/10 pb-1">
                  <ContainerLabel>Objective</ContainerLabel>
                </div>
                <p class="text-left text-black dark:text-white">
                  {props.data.projectObjective}
                </p>
              </div>
              <div
                class="flex gap-1 justify-start items-center w-full overflow-x-auto scroll-smooth def__animate"
                style="scrollbar-width: none;"
              >
                <For each={props.data.tags}>
                  {(tag) => {
                    return (
                      <Tag href={`/projects?tags=${tag.replace(" ", "+")}`}>
                        {tag}
                      </Tag>
                    );
                  }}
                </For>
              </div>
            </div>
          </div>
        </Show>
      </header>
      <div
        class={`z-1 w-full mx-auto flex flex-col ${
          !(props.reverse ?? false) ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-12 justify-center items-center`}
      >
        <div class="w-full">
          <Featured url={props.data.mainKeypointMedia} />
        </div>
        <article class="w-full lg:max-w-1/3 flex flex-col items-start justify-center">
          <div class="flex flex-col gap-6 px-6">
            <div class="text-black dark:text-white w-full dark:shadow-[0px_-18px_18px_-18px_rgba(255,255,255,0.5)] mx-auto rounded-3xl p-6 flex flex-col gap-6 bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/5 dark:border-t dark:border-t-white">
              <div class="flex flex-col gap-1">
                <div class="text-black/20 w-fit dark:text-white/20 h-fit border-b border-b-black/10 dark:border-b-white/10 pb-1">
                  <ContainerLabel>Strategy</ContainerLabel>
                </div>
                <p class="text-left text-black dark:text-white">
                  {props.data.mainKeypointDescription}
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <Metric icon="/MA_Icons25_Lightbulb.svg">
                  {props.data.mainKeypointMetricOne}
                </Metric>
                <Metric icon="/MA_Icons25_Lightbulb.svg">
                  {props.data.mainKeypointMetricTwo}
                </Metric>
              </div>
              <Show when={props.standalone}>
                <div class="w-fit py-3">
                  <LinkButton href={`/projects/${props.data.slug}`}>
                    See Project
                  </LinkButton>
                </div>
              </Show>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { slug } = params;

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

  return (
    <main class="w-full">
      <Show when={project()} fallback={<div>Loading</div>}>
        <Show when={lightboxImg()}>
          <Lightbox src={{ get: lightboxImg, set: setLighboxImg }} />
        </Show>
        <img
          src={project()?.cover}
          class="-z-1 w-full object-cover scale-120 h-full fixed top-0 blur-xl"
          loading="eager"
        />
        <div class="-z-1 w-full fixed h-screen dark:backdrop-saturate-100 backdrop-saturate-200 dark:bg-black mix-blend-overlay"></div>
        <section class="h-full flex items-center bg-white/50 dark:bg-black/90">
          <article class="flex flex-col items-center w-full px-6">
            <div class="flex flex-col gap-6 items-center w-full py-36 max-w-3xl">
              <A
                href=""
                class="flex flex-col cursor-pointer def__animate hover:opacity-50 w-fit justify-center"
              >
                <img
                  src={project()?.clientLogo}
                  class="aspect-auto max-h-9 max-w-24 not-dark:invert opacity-20"
                  loading="eager"
                />
              </A>
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
        <section class="bg-white dark:bg-black py-18 border-t border-b border-black/10 dark:border-white/10 px-6">
          <div class="flex gap-3 max-w-3xl mx-auto my-18 p-6 border border-neutral-100 dark:border-neutral-900 rounded-3xl">
            <div class="text-black/10 dark:text-white/10 border-r border-r-black/10 dark:border-r-white/10 w-fit pr-2 py-1 h-fit">
              <ContainerLabel>Objective</ContainerLabel>
            </div>
            <p class="text-black dark:text-white">
              {project()?.projectObjective}
            </p>
          </div>
          <section class="lg:p-18">
            <MainKeypoint data={project()!} />
          </section>
          <section class="border-t border-black/10 dark:border-white/10 py-36">
            <For each={project()?.projectKeypoints}>
              {(keypoint) => {
                return (
                  <div class="w-full flex flex-col md:flex-row justify-between px-8 max-w-[1920px] mx-auto">
                    <div class="w-full flex items-center justify-center md:justify-start py-24">
                      <div class="max-w-lg dark:shadow-[0px_-18px_18px_-18px_rgba(255,255,255,0.5)] rounded-3xl p-6 flex flex-col gap-6 bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/5 dark:border-t dark:border-t-white">
                        <H2>{keypoint.title}</H2>
                        <p class="dark:text-white">{keypoint.description}</p>
                      </div>
                    </div>
                    <div class="w-full flex justify-center md:justify-end">
                      <For each={keypoint.media}>
                        {(media) => {
                          return (
                            <>
                              <img
                                class="w-full max-w-xl hover:saturate-125 def__animate cursor-pointer md:pl-2 border-l border-transparent hover:border-black/10 dark:hover:border-white/10"
                                onClick={() => {
                                  setLighboxImg(media);
                                }}
                                src={media}
                              />
                            </>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                );
              }}
            </For>
          </section>
          <VideoLib videos={project()!.projectVideos} />
        </section>
      </Show>
      <section class="bg-white dark:bg-black">
        <Collection data={collectionData} />
      </section>
    </main>
  );
}



const Metric = ({ children, icon }: { children: string; icon: string }) => {
  return (
    <article class="flex items-center gap-3">
      <div class="border border-black/50 dark:border-white/50 p-1 rounded-lg opacity-20">
        <img src={icon} loading="eager" class="w-8 h-8 dark:invert" />
      </div>
      <span class="uppercase text-sm font-bold tracking-widest text-black/20 dark:text-white/20">
        {children}
      </span>
    </article>
  );
};

const Lightbox = ({
  src,
}: {
  src: { get: Accessor<string | undefined>; set: Setter<string | undefined> };
}) => {
  let imgRef!: HTMLImageElement;
  function clearLightbox(e: PointerEvent) {
    if (e.target !== imgRef) {
      src.set();
    }
  }
  onMount(() => {
    document.body.classList.add("overflow-hidden");
    document.body.addEventListener("click", clearLightbox);
    onCleanup(() => {
      document.body.classList.remove("overflow-hidden");
      document.body.removeEventListener("click", clearLightbox);
    });
  });
  return (
    <div class="z-10 fixed w-screen h-screen flex justify-center items-center dark:bg-black/98">
      <div class="w-full max-w-3xl mx-auto pt-[5vh] flex flex-col items-center gap-3">
        <img ref={imgRef} class="w-full" src={src.get()} />
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

const Featured = ({ url }: { url: string }) => {
  if (url.includes("vimeo")) {
    return (
      <iframe
        src={url}
        class="aspect-video w-full border-t border-b border-black/5 dark:border-white/5"
        allow="fullscreen"
      ></iframe>

    )
  } else {
    return (
      <img
        src={url}
        class="object-cover w-full"
      />
    )
  }
}