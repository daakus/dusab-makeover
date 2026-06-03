import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  name: string;
  description?: string | null;
  durationMinutes: number;
  priceGhs: string;
  href?: string;
  imageUrl?: string | null;
  className?: string;
}

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80";

export function ServiceCard({
  name,
  description,
  durationMinutes,
  priceGhs,
  href = "/booking",
  imageUrl = PLACEHOLDER,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-brand-border/80 hover:shadow-soft",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageUrl || PLACEHOLDER}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        {description ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{durationMinutes} min</span>
        <span className="ml-auto font-semibold text-brand-primary">
          GHS {priceGhs}
        </span>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-xl" asChild>
          <Link href={href}>Book this service</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
