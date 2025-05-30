export interface CarouselProps {
  slides: { id: number; image: string; alt?: string }[];
  variant?: "full" | "center";
}
