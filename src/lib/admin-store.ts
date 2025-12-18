
let listings = [
  { id: "1", title: "آيفون 14 برو", price: 250, status: "PENDING" },
  { id: "2", title: "سيارة تويوتا", price: 3200, status: "ACTIVE" }
];

export function getPending() {
  return listings.filter(l => l.status === "PENDING");
}

export function approve(id) {
  listings = listings.map(l => l.id === id ? { ...l, status: "ACTIVE" } : l);
}

export function reject(id) {
  listings = listings.map(l => l.id === id ? { ...l, status: "REJECTED" } : l);
}
