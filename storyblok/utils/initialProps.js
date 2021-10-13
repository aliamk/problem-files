import Storyblok from "../lib/storyblok";

const checkStoryblokPreview = (url) => {
  const regex = /\/(.*?)\?/;
  const result = url.match(regex);
  return result ? result[1] : url;
};

export async function getPageProps(context) {
  const slug =
    context.resolvedUrl === "/"
      ? "home"
      : checkStoryblokPreview(context.resolvedUrl);

  const params = {
    version: "draft", // or 'published'
    resolve_relations: "global_reference.reference",
  };

  const { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

  return {
    props: {
      story: data ? data.story : false,
    },
  };
}
