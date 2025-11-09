export const InitData = [
  {
    type: "category",
    category: "Điện thoại",
    profit: 15,
    discount: 10,
    products: [],
  },
  {
    type: "category",
    category: "Laptop",
    profit: 15,
    discount: 8,
    products: [],
  },
  {
    type: "category",
    category: "Tai nghe",
    profit: 15,
    discount: 8,
    products: [],
  },
  {
    type: "category",
    category: "Khác",
    profit: 10,
    discount: 0,
    products: [],
  },
];

export function setProfitList(mangsp) {
  localStorage.setItem("profit", JSON.stringify(mangsp));
}

export function initProfitList() {
  if (!localStorage.getItem("profit")) {
    localStorage.setItem("profit", JSON.stringify(InitData));
  }
}
export function getProfitList() {
  const data = JSON.parse(localStorage.getItem("profit"));
  return data || [];
}
