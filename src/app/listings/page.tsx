import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("listing", {
    title: taskPageMetadata.listing.title,
    description: taskPageMetadata.listing.description,
  });

export default async function ListingsPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  return <TaskListPage task="listing" category={resolvedParams?.category} />;
}
