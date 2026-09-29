import type { CollectionEntry } from "astro:content";
import config from "@/config";

/**
 * Determines whether a note is eligible to be listed/rendered.
 * The notes collection follows the same immediate-publish switch as posts.
 */
export function noteFilter({ data }: CollectionEntry<"notes">) {
  const publishDate = data.pubDatetime ?? data.sourceDate;
  const isPublishTimePassed = publishDate
    ? Date.now() >
      new Date(publishDate).getTime() - config.posts.scheduledPostMargin
    : true;

  return (
    !data.draft &&
    (import.meta.env.DEV ||
      config.posts.publishScheduledPosts ||
      isPublishTimePassed)
  );
}
