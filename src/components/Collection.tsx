import { A } from "@solidjs/router";
import { For, JSXElement, onMount } from "solid-js";

interface Collection {
  uuid: string;
  id: number;
  author: string;
  title: string;
  cover: string;
  tags: string[];
  dateAdded: string;
  lastModified: string;
}

export interface PortfolioCollection extends Collection {
  clientName: string;
  clientLogo: string;
}

function CollectionRow(props: { children: JSXElement }) {
  return <div class="gap-x-1 flex justify-start w-full">{props.children}</div>;
}

function CollectionCell(props: { data: PortfolioCollection }) {
  onMount(() => {
    const cells = document.querySelectorAll(".cell-container");
    for (const cell of cells) {
      cell.addEventListener("mouseover", (event) => {
        const target = event.target as Element;
        if (target !== cell) {
          cells.forEach((cell) => {
            cell.classList.add("saturate-0");
          });
        }
        cell.classList.add("brightness-103");
        event.preventDefault();
      });
      cell.addEventListener("mouseout", (event) => {
        const target = event.target as Element;
        cells.forEach((cell) => {
          cell.classList.remove("saturate-0");
        });
        cell.classList.remove("brightness-103");
        event.preventDefault();
      });
    }
  });
  return (
    <article class="group cell-container w-72 h-96 xl:h-108 md:w-100 xl:w-xl relative overflow-hidden hover:brightness-115 hover:saturate-125 def__animate">
      <A href="" class="h-full w-full overflow-hidden">
        <img
          src={props.data.cover}
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </A>
      <A
        href=""
        class="z-1 top-0 rounded-xl def__animate px-1 w-12 h-12 flex justify-center items-center ml-6 mt-6 absolute backdrop-blur backdrop-brightness-150 hover:opacity-50"
      >
        <img src={props.data.clientLogo} class="invert aspect-auto max-h-6" />
      </A>
      <div class="absolute bottom-0 z-1 w-full lg:p-3 mx-auto">
        <header class="group-hover:opacity-100 lg:opacity-0 lg:rounded-3xl overflow-hidden def__animate group-hover:pb-12 backdrop-brightness-150 dark:backdrop-brightness-50 backdrop-blur-xl px-6 py-6 w-full info-container">
          <h6 class="text-xs text-black/50">{props.data.clientName}</h6>
          <h3 class="text-lg font-bold">{props.data.title}</h3>
        </header>
        <div class="group-hover:opacity-100 opacity-0 px-6 relative -mt-10 w-full def__animate">
          <div
            class="w-full h-full overflow-x-auto flex gap-1 pr-16 justify-start items-center pb-3 scroll-smooth"
            style="scrollbar-width: none;"
          >
            <For each={props.data.tags}>
              {(tag) => {
                return (
                  <A
                    href=""
                    class="def__animate w-fit text-xs px-3 py-1 rounded-full text-nowrap bg-white/50 dark:bg-white/5 border dark:border-white/20 border-black/25 dark:text-white/20 text-black/50 hover:opacity-50 text-center"
                  >
                    {tag}
                  </A>
                );
              }}
            </For>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Collection(props: { data: PortfolioCollection[] }) {
  let dataA = [],
    dataB = [];
  for (const item of props.data) {
    if (item.id % 2) {
      dataA.push(item);
    } else {
      dataB.push(item);
    }
  }
  return (
    <section class="z-1 py-12 mx-auto relative border-t border-b border-black/10 dark:border-white/10 bg-white dark:bg-black dark:shadow-[0px_-16px_18px_-18px_rgba(255,255,255,0.8)]">
      <div
        class="px-6 lg:px-12 gap-y-1 w-full grid overflow-x-auto scroll-smooth"
        style="scrollbarwidth: none;"
      >
        <CollectionRow>
          <For each={dataA}>{(itemA) => <CollectionCell data={itemA} />}</For>
        </CollectionRow>
        <CollectionRow>
          <For each={dataB}>{(itemB) => <CollectionCell data={itemB} />}</For>
        </CollectionRow>
      </div>
    </section>
  );
}
