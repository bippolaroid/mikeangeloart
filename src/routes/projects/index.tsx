import data from "../../db.json";
import Collection, { PortfolioCollection } from "~/components/Collection";
import Panel3d from "~/components/Panel3d";
import { useSearchParams } from "@solidjs/router";
import { createEffect, createSignal, onMount } from "solid-js";

const collectionData: PortfolioCollection[] = data;

export default function ProjectPage() {
  const [tags, setTags] = createSignal<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  createEffect(() => {
    if (searchParams.tags) {
      console.log("s");
      setTags((searchParams.tags as string).split(","));
    }
  });

  onMount(() => {
    if (searchParams.tags) {
      setTags((searchParams.tags as string).split(","));
    }
    if (tags()) {
      setSearchParams({ tags: tags().join() });
    }
  });
  return (
    <main class="lg:pt-24">
      <Panel3d data="/MA_3DLogo.glb" headline="Testing" paragraph="Testing" />
      <Collection
        sortByTags={{ get: tags, set: setTags }}
        enableFull={true}
        data={collectionData}
        enableSearch={true}
      />
    </main>
  );
}
