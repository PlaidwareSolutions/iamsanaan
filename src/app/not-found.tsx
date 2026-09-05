import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { SiteChrome } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <div className="tone-paper flex min-h-svh items-center">
        <Container narrow className="py-32 text-center">
          <Eyebrow>404 — Not found</Eyebrow>
          <h1 className="headline mx-auto mt-3 max-w-[14ch] text-[44px] md:text-[72px]">
            This page didn’t survive the reduction pass.
          </h1>
          <p className="mx-auto mt-6 max-w-[44ch] text-[19px] leading-[1.4] text-mute md:text-[21px]">
            Whatever was here either moved or never earned its place. The studio, however, is very
            much alive.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Button href="/" size="lg">
              Back to the studio
            </Button>
            <Button href="/products" variant="text" size="lg">
              See our products
            </Button>
          </div>
        </Container>
      </div>
    </SiteChrome>
  );
}
