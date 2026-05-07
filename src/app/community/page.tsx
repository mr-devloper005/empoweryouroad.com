import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";

export const revalidate = 3;
export const generateMetadata = () => buildTaskMetadata("social");

export default async function CommunityPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  return <TaskListPage task="social" category={resolvedParams?.category} />;
}
