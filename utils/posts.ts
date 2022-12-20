import type { Post } from "../types.d.ts";
import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts";

export async function loadPost(id: string): Promise<Post | null> {
  const raw = await Deno.readTextFile(`./content/posts/${id}.md`)
    .catch(() => null);

  if (!raw) return null;

  const { attrs, body } = extract(raw);

  const params = attrs as Record<string, string>;

  const port: Post = {
    id,
    title: params.title,
    body,
    date: new Date(params.date),
    excerpt: params.excerpt,
  };

  return port;
}

export async function listsPosts(): Promise<Post[]> {
  const promises = [];

  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    if (id) promises.push(loadPost(id));
  }

  const posts = await Promise.all(promises) as Post[];

  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return posts;
}

export async function listsPostsSequentially(): Promise<Post[]> {
  const posts: Post[] = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    const post = await loadPost(id);
    if (post) posts.push(post);
  }
  return posts;
}

// loadPost("hello-world");

// console.log(await loadPost("hello-world"));
