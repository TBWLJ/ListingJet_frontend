import { DashboardShell } from "@/components/layout/DashboardShell";
import { ListingForm } from "@/components/forms/ListingForm";

export default function CreateListingPage() {
  return (
    <DashboardShell>
      <h1 className="mb-6 text-2xl font-bold text-navy">Create listing</h1>
      <ListingForm />
    </DashboardShell>
  );
}
