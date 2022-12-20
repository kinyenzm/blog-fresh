import { loadPost } from "./posts.ts";
import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("loadPost() returns null if the post does not exist", async () => {
  const post = await loadPost("non-existent-post");
  if (post === null) throw new Error("Post is null");
  assertEquals(post, null); // assert(post === null);
});

Deno.test("loadPost() returns null if the post does not exist", async () => {
  const post = await loadPost("non-existent-post");
  if (post === null) throw new Error("Post is null");
  assertEquals(post?.id, "hello-world");
});
