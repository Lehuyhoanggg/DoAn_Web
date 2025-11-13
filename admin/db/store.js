export const InitData = [
  {
    date: "2025-10-30",
    products: [
      {
        nameProduct: "IPhone 17 Pro Max",
        ramProduct: "12GB",
        storageProduct: "256GB",
        stock: 10,
        colorProduct: "Cam Vũ Trụ",
        priceProduct: 30000000,
        status: false,
      },
      {
        nameProduct: "IPhone 17 Pro Max",
        ramProduct: "12GB",
        storageProduct: "512GB",
        stock: 10,
        colorProduct: "Xanh Đậm",
        priceProduct: 30000000,
        status: false,
      },
    ],
  },
  {
    date: "2025-10-31",
    products: [
      {
        nameProduct: "IPhone 17 Pro Max",
        ramProduct: "12GB",
        storageProduct: "256GB",
        stock: 10,
        colorProduct: "Cam Vũ Trụ",
        priceProduct: 30000000,
        status: false,
      },
    ],
  },
  {
    date: "2025-11-01",
    products: [
      {
        nameProduct: "IPhone 17 Pro Max",
        ramProduct: "12GB",
        storageProduct: "256GB",
        stock: 10,
        colorProduct: "Cam Vũ Trụ",
        priceProduct: 30000000,
        status: false,
      },
    ],
  },
  {
    date: "2025-11-02",
    products: [
      {
        nameProduct: "IPhone 17 Pro Max",
        ramProduct: "12GB",
        storageProduct: "256GB",
        stock: 10,
        colorProduct: "Cam Vũ Trụ",
        priceProduct: 30000000,
        status: false,
      },
    ],
  },
  {
    date: "2025-11-03",
    products: [
      {
        nameProduct: "IPhone 17 Pro Max",
        ramProduct: "12GB",
        storageProduct: "256GB",
        stock: 10,
        colorProduct: "Cam Vũ Trụ",
        priceProduct: 30000000,
        status: false,
      },
    ],
  },
  {
    date: "2025-11-04",
    products: [
      {
        nameProduct: "IPhone 17 Pro Max",
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
