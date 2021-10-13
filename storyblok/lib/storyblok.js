import StoryblokClient from "storyblok-js-client";
import { STORYBLOK_API_KEY } from "../../lib/constants";

const Storyblok = new StoryblokClient({
  accessToken: STORYBLOK_API_KEY,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export default Storyblok;
