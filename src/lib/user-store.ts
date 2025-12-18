
let myListings = [
  { id: "1", title: "آيفون 13", price: 200, status: "ACTIVE" },
  { id: "2", title: "لابتوب HP", price: 150, status: "PENDING" },
];

let reports = [];

export function getMyListings() {
  return myListings;
}

export function report(listingId, reason) {
  reports.push({ listingId, reason });
}

export function getReports() {
  return reports;
}
