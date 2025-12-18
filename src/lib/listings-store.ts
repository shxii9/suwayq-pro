
let listings = [
  {
    id: "1",
    title: "آيفون 14 برو",
    price: 250,
    description: "نظيف جدًا",
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "سيارة تويوتا",
    price: 3200,
    description: "استخدام شخصي",
    status: "PENDING",
  },
];

export function getListings() {
  return listings;
}

export function getListing(id) {
  return listings.find(l => l.id === id);
}

export function createListing(data) {
  const item = { id: Date.now().toString(), status: "PENDING", ...data };
  listings.push(item);
  return item;
}

export function deleteListing(id) {
  listings = listings.filter(l => l.id !== id);
}
