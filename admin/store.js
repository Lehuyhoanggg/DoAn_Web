export const InitData = [
  {
    date: "30/10/2025",
    products: [
      {
        nameProduct: "iPhone 17 Pro Max",
        ramProduct: "12GB",
        storageProduct: "256GB",
        stock: 10,
        colorProduct: "Cam Vũ Trụ",
        priceProduct: 30000000,
        status: false,
      },
    ],
  },
];

export function setStoreList(mangsp) {
  localStorage.setItem("store", JSON.stringify(mangsp));
}

export function initStoreList() {
  if (!localStorage.getItem("store")) {
    localStorage.setItem("store", JSON.stringify(InitData));
  }
}
export function getStoreList() {
  const data = JSON.parse(localStorage.getItem("store"));
  return data || [];
}
