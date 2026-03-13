import Navigation from "@/components/Navigation";
import CalendarClient from "@/components/CalendarClient";
import { festivals } from "@/lib/festivals";

export default function CalendarPage() {
  return (
    <>
      <Navigation />
      <CalendarClient festivals={festivals} />
    </>
  );
}
