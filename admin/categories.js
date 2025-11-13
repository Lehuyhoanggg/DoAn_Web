export const InitData = [
  {
    label: "Điện thoại",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "Laptop",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "Tai nghe",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "Đồng hồ",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "Tablet",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "SmartWatch",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "Màn hình",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "Bàn phím",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
  {
    label: "Chuột",
    createdAt: "00:00:00 01/11/2025",
    updatedAt: "00:00:00 01/11/2025",
    status: true,
  },
];

export function setCategoryList(mangsp) {
  localStorage.setItem("categories", JSON.stringify(mangsp));
}

export function initCategoryList() {
  if (!localStorage.getItem("categories")) {
    localStorage.setItem("categories", JSON.stringify(InitData));
  }
}
export function getCategoryList() {
  const data = JSON.parse(localStorage.getItem("categories"));
  return data || [];
}
