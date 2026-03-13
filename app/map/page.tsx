import Navigation from "@/components/Navigation";
import MapClient from "@/components/MapClient";
import { festivals } from "@/lib/festivals";

export default function MapPage() {
  return (
    <>
      <Navigation />
      <MapClient festivals={festivals} />
    </>
  );
}
