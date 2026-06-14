import { ConsumerHome } from "@/components/consumer/consumer-home";
import { ConsumerShell } from "@/components/consumer/consumer-shell";

export default function HomePage() {
  return (
    <ConsumerShell title="Home" subtitle="Pick up where you left off.">
      <ConsumerHome />
    </ConsumerShell>
  );
}
