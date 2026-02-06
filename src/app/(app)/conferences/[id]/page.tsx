import { Container } from "@/shared/ui/container";
import ConferenceDetail from "@/widgets/conference-detail/ConferenceDetail";

interface ConferenceDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function ConferenceDetailPage({
  params,
}: ConferenceDetailPageProps) {
  const { id } = await params;
  const conferenceId = parseInt(id, 10);

  if (isNaN(conferenceId)) {
    return (
      <Container>
        <div className="text-center py-12 text-gray-500">
          Geçersiz konferans ID
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <ConferenceDetail conferenceId={conferenceId} />
    </Container>
  );
}
