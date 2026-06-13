import { ConsumerHome } from "@/components/consumer/consumer-home";
import { ConsumerShell } from "@/components/consumer/consumer-shell";

export default function HomePage() {
  return (
    <ConsumerShell title="Home" subtitle="Your missions, proof tasks, trust signals, and next best actions.">
      <ConsumerHome />
    </ConsumerShell>
  );
}
