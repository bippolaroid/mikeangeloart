import { PortfolioCollection } from "~/types";
import { createAsync, useSearchParams, cache } from "@solidjs/router";
import { createMemo, Show } from "solid-js";
import SEO from "~/components/SEO";
import CollectionGrid from "~/components/Collection";

const fetchPortfolio = cache(async (): Promise<PortfolioCollection[]> => {
  "use server";
  const res = await fetch("https://cdn.mikeangelo.art/db.json");
  return (await res.json()) as PortfolioCollection[];
}, "portfolio-projects");

export default function ProjectPage() {
  const portfolioCollection = createAsync(() => fetchPortfolio());
  const [searchParams, setSearchParams] = useSearchParams();

  // Make tags a memo that directly reads from searchParams.tags
  const tags = createMemo(() => {
    if (searchParams.tags) {
      return (searchParams.tags as string).split(",");
    }
    return [];
  });

  // Make clients a memo that directly reads from searchParams.client
  const clients = createMemo(() => {
    if (searchParams.client) {
      return (searchParams.client as string).split(",");
    }
    return [];
  });

  return (
    <>
      <SEO
        title="Creative Portfolio of Mike Angelo | Creative Technologist in New Jersey and New York | Brand Design, Video Editing and Motion Design, and Web Design"
        description="Explore Mike Angelo's portfolio of art direction, web development, and advertising campaigns for clients big and small in New Jersey and New York."
        canonical="https://mikeangelo.art/projects"
        ogImage="https://cdn.mikeangelo.art/og-default.png"
        breadcrumbs={[
          { name: "Home", url: "https://mikeangelo.art" },
          { name: "Projects", url: "https://mikeangelo.art/projects" },
        ]}
        localBusiness={true}
        organization={true}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfolio Projects",
          description:
            "A collection of art direction, web design, and advertising campaign projects by Mike Angelo.",
          url: "https://mikeangelo.art/projects",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: portfolioCollection()?.length,
            itemListElement: portfolioCollection()?.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.title,
              description: project.projectObjective,
              url: `https://mikeangelo.art/projects/${project.slug}`,
            })),
          },
        }}
      />
      <main>
        <Show when={portfolioCollection()}>
          <CollectionGrid
            sortByTags={{
              get: tags,
              set: (newTags) =>
                setSearchParams({ tags: (newTags as string[]).join() }),
            }}
            sortByClients={{
              get: clients,
              set: (newClients) =>
                setSearchParams({ client: (newClients as string[]).join() }),
            }}
            enableFull={true}
            data={portfolioCollection() as PortfolioCollection[]}
            enableSearch={true}
          />
        </Show>
      </main>
    </>
  );
}
