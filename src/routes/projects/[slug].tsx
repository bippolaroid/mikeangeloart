import { A } from "@solidjs/router";
import { For } from "solid-js";
import { Tag } from "~/layout/Cards";
import { H1, H2 } from "~/layout/Headings";
import data from "../../db.json";
import { PortfolioCollection } from "~/components/Collection";

const collectionData: PortfolioCollection[] = data;

export default function ProjectPage() {
  return (
    <main class="w-full">
      <img
        src="/favicon.ico"
        class="-z-1 w-full brightness-150 saturation-125 blur-3xl object-cover h-full fixed top-0"
      />
      <section class="h-144 flex items-center">
        <article class="flex flex-col items-center gap-6 w-full px-6 max-w-3xl mx-auto">
          <A
            href=""
            class="flex flex-col cursor-pointer def__animate hover:opacity-50 w-fit justify-center"
          >
            <img
              src="/favicon.ico"
              class="aspect-auto my-6 max-h-9 max-w-24 invert-light"
              loading="eager"
            />
          </A>
          <H1>Test</H1>
          <div class="flex justify-center gap-1 w-full">
            <For each={["test", "test", "test", "test", "test"]}>
              {(tag) => <Tag href="">{tag}</Tag>}
            </For>
          </div>
          <div class="flex gap-3 p-3">
            <span class="pt-1 font-bold text-xs tracking-widest uppercase">
              Objective
            </span>
            <p>
              I currently take on projects independently, but I'm always
              interested in new opportunities. Whether it's design, development,
              or blending both, I'm looking to team up with people who want to
              create meaningful work.
            </p>
          </div>
        </article>
      </section>
      <div class="bg-white/80 py-12">
        <section class="py-12 mx-auto w-full flex flex-col lg:flex-row items-center gap-12 px-6">
          <iframe
            src="https://player.vimeo.com/video/1127338760"
            class="aspect-video max-w-5xl"
            allow="fullscreen"
          ></iframe>
          <article class="w-full dark:shadow-[0px_-16px_18px_-18px_rgba(255,255,255,0.8)] mx-auto max-w-xl lg:w-full rounded-3xl p-6 flex flex-col gap-3 bg-white/80 dark:bg-neutral-800 border border-black/10 dark:border-white/10">
            <Metric icon="/MA_26Logo.svg">Test1</Metric>
            <Metric icon="/MA_26Logo.svg">Test1</Metric>
            <p class="text-left text-black dark:text-white/50">Desc</p>
          </article>
        </section>
        <section class="px-6 max-w-7xl mx-auto">
          <article class="w-full flex justify-start">test</article>
          <div class="w-full flex justify-end"></div>
        </section>
      </div>
    </main>
  );
}

const Metric = ({ children, icon }: { children: string; icon: string }) => {
  return (
    <article class="flex items-center gap-3">
      <div class="border border-black/50 dark:border-white/50 p-2 rounded-lg opacity-20">
        <img src={icon} loading="eager" class="w-6 h-6 dark:invert" />
      </div>
      <H2>{children}</H2>
    </article>
  );
};
