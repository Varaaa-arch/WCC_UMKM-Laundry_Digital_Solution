export type Service = {
  id: string;
  name: string;
  slug: string; // generated client-side from name
  description: string | null;
  price_per_kg: number;
  image_url: string | null;
};
