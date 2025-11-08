import data from "../../db.json";
import Collection, { PortfolioCollection } from "~/components/Collection";
import Panel3d from "~/components/Panel3d";
import { useSearchParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";

const collectionData: PortfolioCollection[] = data;

export default function ProjectPage() {
  const [tags, setTags] = createSignal<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  

  onMount(() => {
    if (searchParams.tags) {
      setTags((searchParams.tags as string).split(","));
    }

  });

  return (
    <main class="lg:pt-24">
      <Collection
        sortByTags={{ get: tags, set: setTags }}
        enableFull={true}
        data={collectionData}
        enableSearch={true}
      />
    </main>
  );
}
