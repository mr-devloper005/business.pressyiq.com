import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  mediaDistribution: true,
  classified: false,
  sbm: false,
  profile: false,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Media distribution insights, PR guides, announcement explainers, and visibility articles",
  mediaDistribution: "Press releases, newsroom updates, company announcements, media coverage, and distribution posts",
  classified: "Distribution offers, publishing notices, outlet opportunities, and campaign-related classifieds",
  sbm: "Curated PR tools, publisher resources, media references, and distribution bookmarks",
  profile: "Brand, agency, publisher, contributor, and reputation profile pages",
  pdf: "Sample reports, release briefs, campaign documents, media kits, and downloadable PDFs",
  listing: "Publisher, agency, business, outlet, and service directory listings",
  image: "Campaign visuals, launch images, event coverage, brand assets, and media galleries",
} satisfies Record<TaskKey, string>;
