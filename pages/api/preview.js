// import { getPreviewPostBySlug } from '@/lib/api';
import { STORYBLOK_API_KEY } from "../../lib/constants";

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  console.log(req.query);
  //
  //
  if (
    req.query.secret !== STORYBLOK_API_KEY ||
    typeof req.query.slug === "undefined"
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  //   // Fetch the headless CMS to check if the provided `slug` exists
  //   const post = await getPreviewPostBySlug(req.query.slug);

  //   // If the slug doesn't exist prevent preview mode from being enabled
  //   if (!post) {
  //     return res.status(401).json({ message: 'Invalid slug' });
  //   }
  //

  const location =
    req.query.slug === "" ? "/" : `/${req.query.slug.toString()}`;

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Set cookie to None, so it can be read in the Storyblok iframe
  const cookies = res.getHeader("Set-Cookie");
  res.setHeader(
    "Set-Cookie",
    cookies.map((cookie) =>
      cookie.replace("SameSite=Lax", "SameSite=None;Secure")
    )
  );

  //   // Redirect to the path from the fetched post
  //   // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(location);
  //   res.end();
}
