import { redirect } from "next/navigation";

// The dedicated Book Now page has been removed. All booking flows now go
// directly to SevenRooms. Hitting /book-now redirects there immediately so
// any old links in the wild keep working.
export default function BookNowRedirect() {
  redirect(
    "https://www.sevenrooms.com/explore/truth/reservations/create/search/"
  );
}
