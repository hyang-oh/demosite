import Navigation from "@/components/Navigation";
import ExploreClient from "@/components/ExploreClient";
import { festivals, categories } from "@/lib/festivals";

export default function ExplorePage() {
  return (
    <>
      <Navigation />
      <ExploreClient festivals={festivals} categories={categories} />
    </>
  );
}
