import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="tone-ink flex min-h-svh items-center">
      <Container className="py-32">
        <MonoLabel className="text-accent">404 — Not found</MonoLabel>
        <h1 className="headline mt-5 max-w-[14ch] text-5xl md:text-7xl">
          This page didn&apos;t survive the reduction pass.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg text-mute">
          Whatever was here either moved or never earned its place. The studio, however, is very much
          alive.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to the studio</Button>
          <Button href="/products" variant="ghost">
            See our products
          </Button>
        </div>
      </Container>
    </div>
  );
}
