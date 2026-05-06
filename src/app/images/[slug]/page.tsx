import { redirect } from "next/navigation";
import { TaskDetailPage } from "@/components/tasks/task-detail-page";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("image", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  // Try to find as image first, then as article
  let post = await fetchTaskPostBySlug("image", resolvedParams.slug);
  if (!post) {
    post = await fetchTaskPostBySlug("article", resolvedParams.slug);
  }
  return post ? await buildPostMetadata("image", post) : await buildTaskMetadata("image");
}

export default async function ImageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Try to find post as image first
  let post = await fetchTaskPostBySlug("image", slug);
  
  // If not found as image, try as article
  if (!post) {
    post = await fetchTaskPostBySlug("article", slug);
    if (post) {
      // Redirect to article page if it's an article post
      redirect(`/articles/${slug}`);
    }
  }
  
  return <TaskDetailPage task="image" slug={slug} />;
}
