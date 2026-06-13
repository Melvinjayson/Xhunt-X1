import Image from "next/image";
import Link from "next/link";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="X-hunt home">
      <Image
        src="/xhunt-logo.png"
        alt="X-hunt"
        width={420}
        height={180}
        priority
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
}
