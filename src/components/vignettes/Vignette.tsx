import { VignetteOps } from "./VignetteOps";
import { VignetteFitness } from "./VignetteFitness";
import { VignetteCommerce } from "./VignetteCommerce";

export function Vignette({ id, className }: { id: "ops" | "fitness" | "commerce"; className?: string }) {
  switch (id) {
    case "ops":
      return <VignetteOps className={className} />;
    case "fitness":
      return <VignetteFitness className={className} />;
    case "commerce":
      return <VignetteCommerce className={className} />;
  }
}
