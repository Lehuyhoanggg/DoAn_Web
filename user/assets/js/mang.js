export let mangsp = JSON.parse(localStorage.getItem("mangsanpham")) || [];

export function setListItem() {
    localStorage.setItem("mangsanpham", JSON.stringify(mangsp));
}

export function getListItem() {
  const data = JSON.parse(localStorage.getItem("mangsanpham"));
  return data || [];
}
