import ParentResults from "./parent-results";
export default async function ParentPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ParentResults slug={slug} />; }
