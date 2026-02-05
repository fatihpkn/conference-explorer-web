import { Container } from "@/shared/ui/container";
import { FilterableConferencesList } from "@/widgets/filterable-confrences-list/FilterableConferencesList";

export const metadata = {
  title: "Conferences",
  description: "List of conferences",
};

interface ConferencesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ConferencesPage({
  searchParams,
}: ConferencesPageProps) {
  return (
    <Container>
      <FilterableConferencesList searchParams={searchParams} />
    </Container>
  );
}
