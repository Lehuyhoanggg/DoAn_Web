import {
  getListSanPham,
  setListSanPham,
  initialSanPham,
  initialTaiKhoan,
  getListTaiKhoan,
} from "../user/assets/js/database.js";
import {
  getCategoryList,
  initCategoryList,
  setCategoryList,
} from "./db/categories.js";
import { getOrderList, initOrderList, setOrderList } from "./db/order.js";
import { getProfitList, initProfitList, setProfitList } from "./db/profit.js";
import { getStoreList, setStoreList, initStoreList } from "./db/store.js";

window.productPage = productPage;
window.userPage = userPage;
window.storePage = storePage;
window.categoryPage = categoryPage;
window.orderPage = orderPage;
window.profitPage = profitPage;
window.stockPage = stockPage;
window.homePage = homePage;
initialSanPham();
initStoreList();
initCategoryList();
initOrderList();
initProfitList();
let mangsp = getListSanPham();
let StoreList = getStoreList();
let categories = getCategoryList();
let orderList = getOrderList();
let profitList = getProfitList();

// đăng nhâp
if (localStorage.getItem("statusAdmin") !== "true") {
  window.location.href = "login.html";
}

const sidebarItemsArrayy = [
  {
    label: "Trang tổng quan",
    icon: "fa-solid fa-house",
    Page: "home",
  },
  {
    label: "Quản lí sản phẩm",
    icon: "fa-solid fa-shop",
    Page: "product",
  },
  {
    label: "Quản lí khách hàng",
    icon: "fa-solid fa-users",
    Page: "user",
  },
  {
    label: "Quản lí đơn hàng",
    icon: "fa-solid fa-cart-shopping",
    Page: "order",
  },
  {
    label: "Quản lý danh mục",
    icon: "fa-solid fa-chart-simple",
    Page: "category",
  },
  {
    label: "Quản lí nhập kho",
    icon: "fa-solid fa-warehouse",
    Page: "store",
  },
  {
    label: "Quản lí lợi nhuận",
    icon: "fa-solid fa-warehouse",
    Page: "profit",
  },
  {
    label: "Quản lí Kho",
    icon: "fa-solid fa-warehouse",
    Page: "stock",
  },
  { label: "Trang chủ", icon: "fa-solid fa-circle-left" },
  { label: "Đăng xuất", icon: "fa-solid fa-arrow-right-from-bracket" },
];
// render sidebar
const sidebar = document.querySelector(".sidebar-list-item");
const modal = document.querySelector(".modal");

sidebar.innerHTML = sidebarItemsArrayy
  .map(
    (item, index) =>
      `
        <li class="sidebar-item ${index == 0 ? "active" : ""}" key=${index}>
            <a href="#">
                <i class="${item.icon}"></i>
                <span class="title">${item.label}</span>
            </a>
        </li>
    `
  )
  .join("");

const sidebarItems = document.querySelectorAll(".sidebar-item");
// handle click sidebar item
sidebarItems.forEach((e, index) => {
  e.addEventListener("click", () => {
    if (!e.classList.contains("active")) {
      sidebarItems.forEach((e) => e.classList.remove("active"));
      sidebarItemsArrayy.map((e) => (e.active = false));
      e.classList.add("active");
      sidebarItemsArrayy[index].active = true;
      const targetPage = sidebarItemsArrayy[index].Page;
      if (targetPage) {
        loadPage(targetPage);
      }
    }
    // Đóng sidebar trên mobile khi click vào item
    closeMobileSidebar();
  });
});

const homeBtn = document.querySelector(".sidebar-item[key='8']");
const logOutBtn = document.querySelector(".sidebar-item[key='9']");
homeBtn.addEventListener("click", () => (window.location.href = "/"));
logOutBtn.addEventListener("click", () => {
  window.location.href = "/admin/login.html";
  localStorage.setItem("statusAdmin", JSON.stringify(false));
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const sidebarContainer = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openMobileSidebar() {
  if (sidebarContainer) sidebarContainer.classList.add("active");
  if (sidebarOverlay) sidebarOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileSidebar() {
  if (sidebarContainer) sidebarContainer.classList.remove("active");
  if (sidebarOverlay) sidebarOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    if (sidebarContainer && sidebarContainer.classList.contains("active")) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeMobileSidebar);
}

// Đóng sidebar khi resize về desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    closeMobileSidebar();
  }
});
// Handle đổi trang
function loadPage(page) {
  if (!page) return;

  sidebarItemsArrayy.forEach((e) => {
    if (e.Page) {
      const element = document.querySelector(`.${e.Page}-wrapper`);
      if (element) element.style.display = "none";
    }
  });

  const targetElement = document.querySelector(`.${page}-wrapper`);
  if (targetElement) {
    targetElement.style.display = "block";
    const fn = `${page}Page`;
    if (typeof window[fn] === "function") {
      window[fn]();
    }
  }
}

loadPage("home");
// đóng modal
const closeModal = () =>
  modal
    .querySelector(".createModal-close-btn")
    .addEventListener("click", () => (modal.style.display = "none"));
// filter categories
const loadFilter = () => {
  const product_filter = document.querySelectorAll("#product-filter");
  product_filter.forEach((e) => {
    e.innerHTML = categories
      .map((e) => {
        if (e.status) {
          return `<option value="${e.label}">${e.label}</option>`;
        }
      })
      .join("");
  });
};
// Render filter
loadFilter();
// Đồng bộ dữ liệu
const findCategory = (c) => {
  const checkCategory = profitList.find((e) => e.category === c);
  if (checkCategory) {
    return [checkCategory.profit, checkCategory.discount];
  }
  return [0, 0];
};
const mergeProduct = () => {
  const newMangSP = mangsp.map((e) => {
    if (e.versions?.length > 0) {
      e.versions.forEach((v) => {
        let profit = e.profit;
        let discount = e.discount;
        if (!profit || !discount) {
          [profit, discount] = findCategory(e.category);
        }
        v.price = Math.round(
          v.priceBase * (1 + profit / 100) * (1 - discount / 100)
        );
      });
    }
    return e;
  });

  setListSanPham(newMangSP);
};
mergeProduct();

function homePage() {
  const money = orderList.reduce((acc, curr) => acc + curr.thanhtien, 0);
  const user = getListTaiKhoan().length;
  const order = orderList.length;
  document.querySelector(
    ".home-info-list .numberMoney"
  ).innerHTML = `${money.toLocaleString("vi-VN")}đ`;
  document.querySelector(".home-info-list .numberUser").innerHTML = user;
  document.querySelector(".home-info-list .numberOrder").innerHTML = order;
}

function productPage() {
  const loadBtn = document.querySelector(".product-reload-btn");
  const createBtn = document.querySelector(".product-create-btn");
  mergeProduct();

  if (!loadBtn || !createBtn) return;

  // Biến lưu search term
  let currentSearchTerm = "";
  // Biến lưu category filter - lấy từ category "Tất cả"
  const categoryList = getCategoryList();
  const allCategory = categoryList.find((cat) => cat.label === "Tất cả");
  let currentCategoryFilter = allCategory ? allCategory.label : "all";

  // Hàm tạo danh sách sản phẩm đã merge
  const createMergeListProduct = () => {
    return mangsp.flatMap((product, pI) => {
      if (product.versions) {
        return product.versions.flatMap((version, vI) => {
          const baseItem = {
            id: pI + 1,
            name: product.name,
            brand: product.brand,
            category: product.category,
            color: version.color,
            price: version.price,
            priceBase: version.priceBase,
            status: version.status,
            pI,
            vI,
          };

          if (version.version && version.version.length === 2) {
            return {
              ...baseItem,
              ram: version.version[0],
              storage: version.version[1],
            };
          }
          return baseItem;
        });
      }
      return [];
    });
  };

  // Hàm lọc sản phẩm theo search term và category
  const filterProducts = (productList) => {
    let filtered = productList;

    // Lọc theo category
    const allCategoryLabel = allCategory ? allCategory.label : "all";
    if (currentCategoryFilter && currentCategoryFilter !== allCategoryLabel) {
      filtered = filtered.filter((product) => {
        return (
          product.category?.toLowerCase() ===
          currentCategoryFilter.toLowerCase()
        );
      });
    }

    // Lọc theo search term
    if (currentSearchTerm.trim()) {
      const searchLower = currentSearchTerm.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.brand?.toLowerCase().includes(searchLower) ||
          product.category?.toLowerCase().includes(searchLower) ||
          product.color?.toLowerCase().includes(searchLower)
        );
      });
    }

    return filtered;
  };

  // Hàm render sản phẩm
  const renderItem = () => {
    const productContent = document.querySelector(
      ".product-content table tbody"
    );
    if (!productContent) return;

    // Tạo danh sách sản phẩm
    const mergeListProduct = createMergeListProduct();

    // Lọc theo search term
    const filteredProducts = filterProducts(mergeListProduct);

    productContent.innerHTML = filteredProducts
      .map(
        (e) => `
              <tr>
                <td>${e.name}</td>
                <th>${e.brand}</th>
                <td>${e.category}</td>
                <td>${e.color}</td>
                <td>${e.vI === -1 ? "-" : e.storage || "-"}</td>
                <td>${e.vI === -1 ? "-" : e.ram || "-"}</td>
                <td>${
                  e.priceBase ? e.priceBase.toLocaleString("vi-VN") : "-"
                }</td>
                <td>${e.price ? e.price.toLocaleString("vi-VN") : "-"}</td>
                <td>
                    <label class="toggle-wrapper">
                      <input type="checkbox" ${e.status ? "checked" : ""} 
                      data-productIndex="${e.pI}" 
                      data-versionIndex="${e.vI}" 
                      >
                      <span class="slider"></span>
                    </label>
                </td>
                <td>
                  <button class="product-detail-btn" 
                    data-productIndex="${e.pI}" 
                    data-versionIndex="${e.vI}" 
                    >
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </td>
                <td>
                  <button 
                    class="product-delete-btn" 
                    data-productIndex="${e.pI}" 
                    data-versionIndex="${e.vI}" 
                    >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
  `
      )
      .join("");

    // Gắn lại event listener cho các button sau khi render
    attachProductEventListeners();
  };

  // Hàm gắn event listener cho các button
  const attachProductEventListeners = () => {
    // Delete Btn
    const deleteBtn = document.querySelectorAll(".product-delete-btn");
    deleteBtn.forEach((e) => {
      // Xóa event listener cũ nếu có
      const newBtn = e.cloneNode(true);
      e.parentNode.replaceChild(newBtn, e);

      newBtn.addEventListener("click", () => {
        const pI = Number(newBtn.getAttribute("data-productIndex"));
        const vI = Number(newBtn.getAttribute("data-versionIndex"));
        if (confirm("Bạn có chắc chắn muốn xóa")) {
          const product = mangsp[pI];
          product.versions.splice(vI, 1);
          setListSanPham(mangsp);
          renderItem();
        }
      });
    });

    // Status Btn
    const statusBtn = document.querySelectorAll(".toggle-wrapper input");
    statusBtn.forEach((e) => {
      e.addEventListener("click", () => {
        const pI = Number(e.getAttribute("data-productIndex"));
        const vI = Number(e.getAttribute("data-versionIndex"));
        const product = mangsp[pI];
        product.versions[vI].status = !product.versions[vI].status;
        setListSanPham(mangsp);
      });
    });
  };

  // Lấy các element search
  const searchInput = document.querySelector(
    ".product-wrapper .product-search-input"
  );
  const searchBtn = document.querySelector(
    ".product-wrapper .product-search-btn"
  );
  const categoryFilter = document.querySelector("#product-filter");

  // Populate category dropdown
  const populateCategoryFilter = () => {
    if (!categoryFilter) return;

    const categoryList = getCategoryList();
    categoryFilter.innerHTML = "";

    // Thêm category "Tất cả" đầu tiên
    const allCategoryOption = document.createElement("option");
    allCategoryOption.value = allCategory ? allCategory.label : "all";
    allCategoryOption.textContent = allCategory ? allCategory.label : "Tất cả";
    categoryFilter.appendChild(allCategoryOption);

    // Thêm các category khác
    categoryList.forEach((category) => {
      if (category.status && category.label !== "Tất cả") {
        const option = document.createElement("option");
        option.value = category.label;
        option.textContent = category.label;
        categoryFilter.appendChild(option);
      }
    });
  };

  // Event listener cho category filter
  if (categoryFilter) {
    categoryFilter.addEventListener("change", (e) => {
      currentCategoryFilter = e.target.value;
      renderItem();
    });
  }

  // Populate và render
  populateCategoryFilter();
  renderItem();

  // Reload btn
  loadBtn.addEventListener("click", () => {
    // Reset search term
    currentSearchTerm = "";
    if (searchInput) {
      searchInput.value = "";
    }
    // Reset category filter
    currentCategoryFilter = allCategory ? allCategory.label : "all";
    if (categoryFilter) {
      categoryFilter.value = currentCategoryFilter;
    }
    renderItem();
  });
  let oldID = 164;

  // Create Btn
  createBtn.addEventListener("click", () => {
    modal.innerHTML = `
    <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Tạo sản phẩm</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">
            <label for="name">Tên sản phẩm</label>
            <input type="text" name="name" placeholder="Nhập tên sản phẩm VD: iPhone 17 Pro Max" >

            <label for="brand">Hãng sản phẩm</label>
            <input type="text" name="brand" placeholder="Nhập hãng sản phẩm VD: Apple" >

            <label for="price">Giá sản phẩm</label>
            <input type="text" name="price" placeholder="Nhập giá sản phẩm VD: 30000000" >

            <label for="color">Màu sản phẩm</label>
            <input type="String" name="color" placeholder="Nhập màu sản phẩm VD: Cam Vũ Trụ" >

            <label for="categories">Danh mục sản phẩm</label>
            <select name="categories" id="product-filter"></select>

            <label for="img">Danh mục sản phẩm</label>
            <input type="file" name="img" >

            <img src="" class="preview" style="width: 200px "/>

            <div class="dynamic-form">
              <label>Thông tin chi tiết sản phẩm</label>
              <div id="info-container">
                <div class="info-row">
                  <input type="text" class="key-input" placeholder="Tên thuộc tính (VD: RAM)">
                  <input type="text" class="value-input" placeholder="Giá trị (VD: 12GB)">
                  <button type="button" class="remove-btn">−</button>
                </div>
            </div>

              <button type="button" id="add-btn">+ Thêm dòng</button>
            </div>

          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
    `;
    loadFilter();
    modal.style.display = "block";
    const closeBtn = document.querySelector(".createModal-close-btn");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    // Xử lí fill động
    document.getElementById("add-btn").addEventListener("click", () => {
      const infoContainer = document.getElementById("info-container");
      const newRow = document.createElement("div");
      newRow.classList.add("info-row");
      newRow.innerHTML = `
          <input type="text" class="key-input" placeholder="Tên thuộc tính (VD: RAM)">
          <input type="text" class="value-input" placeholder="Giá trị (VD: 12GB)">
          <button type="button" class="remove-btn">−</button>
        `;
      infoContainer.appendChild(newRow);
    });

    document.getElementById("info-container").addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        e.target.parentElement.remove();
      }
    });
    // Xử lí hình ảnh
    const inputImg = modal.querySelector("input[type='file']");
    const preview = modal.querySelector("img");
    inputImg.addEventListener("change", () => {
      const file = inputImg.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target.result;
        preview.src = base64;
        localStorage.setItem("myImg", base64);
      };
      reader.readAsDataURL(file);
    });

    // Handle create product
    const handleSubmit = () => {
      const name = document.querySelector("[name='name']").value.trim();
      const brand = document.querySelector("[name='brand']").value.trim();
      const priceBase = Number(
        document.querySelector("[name='price']").value.trim()
      );
      const color = document.querySelector("[name='color']").value.trim();
      const category =
        document.querySelector("[name='categories']").value || "";
      const thumbnail = localStorage.getItem("myImg");

      if (!name || !brand || !priceBase || !color) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
      }

      // Lấy thông tin từ dynamic form
      const keys = document.querySelectorAll(".key-input");
      const values = document.querySelectorAll(".value-input");
      const infoDetail = {};
      let ram = "";
      let storage = "";
      let stock = 0;
      let sold = 0;
      let rating = 0;

      keys.forEach((keyInput, i) => {
        const key = keyInput.value.trim().toLowerCase();
        const value = values[i].value.trim();
        if (!key || !value) return;

        // Lấy các giá trị đặc biệt từ dynamic form
        if (key === "ram") {
          ram = value;
        } else if (key === "storage") {
          storage = value;
        } else if (key === "stock") {
          stock = value;
        } else if (key === "sold") {
          sold = Number(value) || 0;
        } else if (key === "rating") {
          rating = Number(value) || 0;
        } else {
          infoDetail[key] = value;
        }
      });

      let product = mangsp.find((p) => p.name === name);
      if (!product) {
        product = {
          id: (++oldID).toString(),
          name,
          brand,
          thumbnail,
          salebefore: parseInt(priceBase * 1.1),
          baseprice: priceBase,
          price: priceBase,
          category,
          status: true,
          versions: [],
          infoDetail: {},
          imgDetail: [thumbnail],
        };
        mangsp.push(product);
      }

      // Cập nhật infoDetail cho product
      product.infoDetail = { ...product.infoDetail, ...infoDetail };

      // Kiểm tra nếu có RAM hoặc Storage thì tạo version, nếu không thì tạo sản phẩm đơn giản
      if (ram || storage) {
        // Sản phẩm có version (điện thoại, laptop)
        let ramCheck = product.versions.find(
          (v) => (v.version[0] || "") === ram
        );
        let storageCheck = product.versions.find(
          (v) => (v.version[1] || "") === storage
        );
        let colorCheck = product.versions.find(
          (c) => c.color.toLowerCase() === color.toLowerCase()
        );
        if (!ramCheck || !storageCheck || !colorCheck) {
          const data = {
            id: `${oldID}-${color}-${ram.slice(0, -2)}-${storage.slice(0, -2)}`,
            color,
            priceBase,
            price: priceBase,
            stock: 0,
            status: true,
            version: [ram, storage],
          };
          product.versions.push(data);
        }
      } else {
        // Sản phẩm đơn giản (tai nghe, đồng hồ)
        let colorCheck = product.versions.find(
          (v) => v.color.toLowerCase() === color.toLowerCase()
        );
        if (!colorCheck) {
          colorCheck = {
            id: `${oldID}-${color.trim().replace(/\s+/g, "")}`,
            color,
            priceBase,
            price: priceBase,
            stock: 0,
            status: true,
            version: [],
          };
          product.versions.push(colorCheck);
        } else {
          alert("Sản phẩm này đã tồn tại !");
          return;
        }
      }
      setListSanPham(mangsp);

      modal.style.display = "none";
      renderItem();
      mergeProduct();
    };

    const submitBtn = document.querySelector(".createModal-accept-btn");
    submitBtn.addEventListener("click", handleSubmit);
  });

  const productTbody = document.querySelector(".product-content table tbody");
  if (!productTbody) return; // Bảo vệ khỏi null pointer

  productTbody.addEventListener("click", (evt) => {
    const btn = evt.target.closest(".product-detail-btn");
    if (!btn) return;
    const pI = Number(btn.getAttribute("data-productIndex"));
    const vI = Number(btn.getAttribute("data-versionIndex"));
    const product = mangsp[pI];
    if (!product) return; // Bảo vệ khỏi null product

    // Xử lý cả sản phẩm có versions và không có versions
    const isSimpleProduct = vI === -1;
    const version = isSimpleProduct
      ? null
      : product.versions && product.versions[vI];
    modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chi tiết sản phẩm</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="product-detail-modal-body">
            <img src=${product.thumbnail || ""} alt="img">
            <div class="product-detail-modal-info">
              <span><b>Tên sản phẩm: </b><input value="${
                product.name
              }" name="name"/> </span><br>

              <span><b>Hãng sản phẩm: </b><input value="${
                product.brand
              }" name="brand"/></span><br>

              <span><b>Màu sản phẩm: </b><input value="${
                version.color
              }" name="color"/></span><br>

              <span><b>Dung lượng sản phẩm: </b><input value="${
                version ? version.version[1] || "" : ""
              }" name="storage" ${
      isSimpleProduct ? "readOnly" : ""
    }/></span><br>

              <span><b>RAM  sản phẩm: </b><input value="${
                version ? version.version[0] || "" : ""
              }" name="ram" ${isSimpleProduct ? "readOnly" : ""}/></span><br>

              <span><b>Giá gốc sản phẩm: </b><input value="${
                version.priceBase
              }" name="priceBase"/></span><br>

              <span><b>Danh mục sản phẩm: </b><select name="categories" id="product-filter"></select></span><br>

            <div class="dynamic-form">
              <label>Thông tin chi tiết sản phẩm</label>
                  <div id="info-container">
                    ${Object.entries(mangsp[pI].infoDetail || {})
                      .map(
                        ([key, value]) => `
                          <div class="info-row">
                            <input type="text" class="key-input" value="${key}">
                            <input type="text" class="value-input" value="${value}">
                            <button type="button" class="remove-btn">−</button>
                          </div>
                        `
                      )
                      .join("")}
                  </div>
              <button type="button" id="add-btn">+ Thêm dòng</button>
            </div>

              <div class="product-detail-modal-btn">
                <button class="product-detail-modal-save-btn">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
    `;
    loadFilter();
    modal.style.display = "block";
    const closeBtn = document.querySelector(".createModal-close-btn");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const categorySelect = modal.querySelector("select");
    categorySelect.value = product.category;

    modal.querySelector("#add-btn").addEventListener("click", () => {
      const infoContainer = modal.querySelector("#info-container");
      const newRow = document.createElement("div");
      newRow.classList.add("info-row");
      newRow.innerHTML = `
        <input type="text" class="key-input" placeholder="Tên thuộc tính (VD: RAM)">
        <input type="text" class="value-input" placeholder="Giá trị (VD: 12GB)">
        <button type="button" class="remove-btn">−</button>
      `;
      infoContainer.appendChild(newRow);
    });

    modal.querySelector("#info-container").addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        e.target.parentElement.remove();
      }
    });

    const saveBtn = modal.querySelector(".product-detail-modal-save-btn");
    saveBtn.addEventListener("click", () => {
      const inputs = modal.querySelectorAll("input");
      const categoryChange = modal.querySelector("select");
      const values = {};

      inputs.forEach((input) => {
        if (input.name == "color" || input.name == "priceBase") {
          product.versions[vI].color = input.value;
          product.versions[vI].priceBase = Number(input.value);
        } else {
          values[input.name] = input.value;
        }
      });

      product.name = values.name;
      product.brand = values.brand;
      product.category = categoryChange.value;

      // Chỉ cập nhật storage và ram nếu có version
      if (version) {
        version.version[1] = values.storage;
        version.version[0] = values.ram;
      }

      const inputValue = modal.querySelectorAll(".value-input");
      const inputKey = modal.querySelectorAll(".key-input");
      const newInfoDetail = {};

      inputKey.forEach((keyInput, index) => {
        const key = keyInput.value.trim();
        const val = inputValue[index].value.trim();
        if (key) newInfoDetail[key] = val;
      });

      product.infoDetail = newInfoDetail;

      setListSanPham(mangsp);
      modal.style.display = "none";
      renderItem();
    });
  });

  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (searchInput) {
      currentSearchTerm = searchInput.value;
      renderItem();
    }
  };

  if (searchInput) {
    // Tìm kiếm khi nhấn Enter
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });

    // Tìm kiếm khi thay đổi (real-time search)
    searchInput.addEventListener("input", () => {
      handleSearch();
    });
  }

  if (searchBtn) {
    // Tìm kiếm khi click nút
    searchBtn.addEventListener("click", () => {
      handleSearch();
    });
  }
}
function userPage() {
  initialTaiKhoan();
  const modal = document.querySelector(".modal");
  if (!modal) return;

  // Lấy danh sách user từ localStorage
  let getListUser;
  try {
    const raw = localStorage.getItem("listTaiKhoan");
    getListUser = raw ? JSON.parse(raw) : [];
  } catch (err) {
    getListUser = [];
    localStorage.setItem("listTaiKhoan", JSON.stringify(getListUser));
  }
  const userTable = document.querySelector("#user-content tbody");
  if (!userTable) return; // Bảo vệ khỏi null pointer

  // Render users
  userTable.innerHTML = getListUser
    .map((user, index) => {
      // if (index !== 0) {hh
      return `
          <tr>
            <td>${user.hoten}</td>
            <td>${user.gmail}</td>
            <td>${user.sdt}</td>
            <td>
              <label class="toggle-wrapper">
                <input type="checkbox" ${user.status ? "checked" : ""} />
                <span class="slider"></span>
              </label>
            </td>
            <td>${user.createdAt || ""}</td>
            <td><button class="product-detail-btn"><i class="fa-solid fa-eye"></i></button></td>
            <td><button class="product-delete-btn"><i class="fa-solid fa-trash"></i></button></td>
          </tr>
        `;
    })
    .join("");

  // Detail Button
  document
    .querySelectorAll("#user-content .product-detail-btn")
    .forEach((btn, index) => {
      let getListUser = JSON.parse(localStorage.getItem("listTaiKhoan")) || [];
      btn.addEventListener("click", () => {
        const user = getListUser[index];
        if (!user) return; // Bảo vệ khỏi null user

        modal.style.display = "block";
        modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Thông tin khách hàng</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div class="createModal-body">
            <label>Họ và tên</label>
            <input type="text" name="hoten" value="${user.hoten || ""}">

            <label>Email</label>
            <input type="email" name="gmail" value="${user.gmail || ""}">

            <label>Số điện thoại</label>
            <input type="text" name="sdt" value="${user.sdt || ""}">

            <label>Mật khẩu</label>
            <input type="password" name="mk" value="${user.mk || ""}">

            <label>Địa chỉ</label>
            <input type="text" name="diachi" value="${user.diachi || ""}">
          </div>

          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
      `;

        const closeBtn = modal.querySelector(".createModal-close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
          });
        }

        const acceptBtn = modal.querySelector(".createModal-accept-btn");
        if (acceptBtn) {
          acceptBtn.addEventListener("click", () => {
            const inputs = modal.querySelectorAll("input");
            const newData = {};
            inputs.forEach((ip) => (newData[ip.name] = ip.value));

            getListUser[index] = { ...user, ...newData };
            localStorage.setItem("listTaiKhoan", JSON.stringify(getListUser));
            modal.style.display = "none";
            userPage();
          });
        }
      });
    });

  // Delete Btn
  document
    .querySelectorAll("#user-content .product-delete-btn")
    .forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let getListUser =
          JSON.parse(localStorage.getItem("listTaiKhoan")) || [];
        if (confirm("Bạn có chắc chắn muốn xóa")) {
          getListUser.splice(index + 1, 1);
          localStorage.setItem("listTaiKhoan", JSON.stringify(getListUser));
          userPage();
        }
      });
    });

  document
    .querySelectorAll("#user-content .toggle-wrapper input")
    .forEach((ip, index) => {
      ip.addEventListener("change", () => {
        let getListUser =
          JSON.parse(localStorage.getItem("listTaiKhoan")) || [];
        const user = getListUser[index];
        if (!user) return;
        user.status = !!ip.checked;
        localStorage.setItem("listTaiKhoan", JSON.stringify(getListUser));
        userPage();
      });
    });
}
function storePage() {
  StoreList = getStoreList();
  const storeTable = document.querySelector("#store-content tbody");

  // Hàm render danh sách phiếu nhập hàng
  const renderStoreList = (storeListToRender) => {
    storeTable.innerHTML = (storeListToRender || [])
      .map((e) => {
        if (!e || !e.products || !Array.isArray(e.products)) return "";
        const total = e.products.reduce(
          (acc, curr) => acc + (curr.priceProduct || 0) * curr.stock,
          0
        );

        // Kiểm tra xem tất cả sản phẩm đã checked chưa
        const allChecked =
          e.products.length > 0 &&
          e.products.every((product) => product.status === true);
        const status = allChecked ? "Đã hoàn thành" : "Chưa xác nhận";
        return `
        <tr>
          <td>${e.date}</td>
          <td>${total.toLocaleString("vi-VN")}</td>
          <td>${status}</td>
          <td><button class="product-detail-btn"><i class="fa-solid fa-eye"></i></button></td>
          <td><button class="product-delete-btn"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
      `;
      })
      .join("");

    // Gắn lại event listener cho các button sau khi render
    attachStoreEventListeners();
  };

  // Hàm gắn event listener cho các button
  const attachStoreEventListeners = () => {
    // Xử lí detail
    document
      .querySelectorAll(".store-wrapper .product-detail-btn")
      .forEach((btn, index) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", () => {
          showStoreDetailModal(index);
        });
      });

    // Xử lí delete
    document
      .querySelectorAll(".store-wrapper .product-delete-btn")
      .forEach((btn, index) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", () => {
          if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
            if (StoreList && StoreList[index]) {
              StoreList.splice(index, 1);
              setStoreList(StoreList);
              storePage();
            }
          }
        });
      });
  };

  // Hàm hiển thị modal chi tiết
  const showStoreDetailModal = (index) => {
    const pI = index;
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="createModal">
        <div class="createModal-header">
          <span class="createModal-title">Thông tin khách hàng</span>
          <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="createModal-body">
          <table class="detail-store-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="product-tbody"></tbody>
          </table>
        </div>

        <div class="createModal-footer">
          <button class="createModal-accept-btn">Xác nhận</button>
        </div>
      </div>
    `;

    document
      .querySelector(".createModal-close-btn")
      .addEventListener("click", () => (modal.style.display = "none"));

    const tbody = document.querySelector(".detail-store-table tbody");
    if (!tbody || !StoreList[index] || !StoreList[index].products) return;

    tbody.innerHTML = StoreList[index].products
      .map(
        (e, productIndex) => `
      <tr>
        <td>
          ${e.nameProduct || ""} 
          ${e.ramProduct ? " - " + e.ramProduct : ""} 
          ${e.storageProduct ? " - " + e.storageProduct : ""} 
          ${e.colorProduct ? " - " + e.colorProduct : ""}
        </td>
        <td><input type="number" value="${
          e.stock
        }" class="stock" data-product-index="${productIndex}" ${
          e.status ? "disabled" : ""
        }/></td>
        <td>
          <label class="toggle-wrapper">
            <input type="checkbox" ${
              e.status ? "checked disabled" : ""
            } data-product-index="${productIndex}"/>
            <span class="slider"></span>
          </label>
        </td>
        <td><button class="product-delete-btn" data-product-index="${productIndex}" ${
          e.status ? "disabled" : ""
        }><i class="fa-solid fa-trash"></i></button></td>
      </tr>
    `
      )
      .join("");

    // Xử lý thay đổi stock (chỉ khi chưa checked)
    tbody.querySelectorAll("input[type='number'].stock").forEach((input) => {
      input.addEventListener("change", (e) => {
        if (e.target.disabled) return;
        const productIndex = Number(
          e.target.getAttribute("data-product-index")
        );
        if (
          StoreList[pI] &&
          StoreList[pI].products &&
          StoreList[pI].products[productIndex]
        ) {
          StoreList[pI].products[productIndex].stock =
            Number(e.target.value) || 0;
        }
      });
    });

    // Xử lý thay đổi status
    tbody.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.disabled = true;
      }

      checkbox.addEventListener("change", (e) => {
        const productIndex = Number(
          e.target.getAttribute("data-product-index")
        );
        if (
          StoreList[pI] &&
          StoreList[pI].products &&
          StoreList[pI].products[productIndex]
        ) {
          const currentStatus = StoreList[pI].products[productIndex].status;
          if (currentStatus && !e.target.checked) {
            e.target.checked = true;
            alert(
              "Không thể tắt trạng thái xác nhận! Sản phẩm đã được xác nhận nhập hàng."
            );
            return;
          }

          const isChecked = e.target.checked;

          if (isChecked) {
            checkbox.disabled = true;

            const storeProduct = StoreList[pI].products[productIndex];
            const stockToAdd = storeProduct.stock;

            const productInMangsp = mangsp.find(
              (p) => p.name === storeProduct.nameProduct
            );

            if (productInMangsp && productInMangsp.versions) {
              const matchingVersion = productInMangsp.versions.find(
                (version) => {
                  const colorMatch =
                    version.color === storeProduct.colorProduct;

                  if (version.version && version.version.length === 2) {
                    const ramMatch =
                      !storeProduct.ramProduct ||
                      version.version[0] === storeProduct.ramProduct;
                    const storageMatch =
                      !storeProduct.storageProduct ||
                      version.version[1] === storeProduct.storageProduct;
                    return colorMatch && ramMatch && storageMatch;
                  } else {
                    return colorMatch;
                  }
                }
              );

              if (matchingVersion) {
                matchingVersion.stock =
                  (matchingVersion.stock || 0) + stockToAdd;
                setListSanPham(mangsp);
              }
            }
          }

          StoreList[pI].products[productIndex].status = isChecked;
          setStoreList(StoreList);

          const updatedStoreList = getStoreList();
          StoreList.length = 0;
          StoreList.push(...updatedStoreList);

          const stockInput = tbody.querySelector(
            `input.stock[data-product-index="${productIndex}"]`
          );
          const deleteBtn = tbody.querySelector(
            `button.product-delete-btn[data-product-index="${productIndex}"]`
          );

          if (stockInput) {
            stockInput.disabled = isChecked;
          }
          if (deleteBtn) {
            deleteBtn.disabled = isChecked;
          }

          const allChecked =
            StoreList[pI] &&
            StoreList[pI].products.length > 0 &&
            StoreList[pI].products.every((product) => product.status === true);

          if (allChecked) {
            setTimeout(() => {
              storePage();
              setTimeout(() => {
                const detailBtns = document.querySelectorAll(
                  ".store-wrapper .product-detail-btn"
                );
                if (detailBtns[pI]) {
                  detailBtns[pI].click();
                }
              }, 50);
            }, 100);
          }
        }
      });

      checkbox.addEventListener("click", (e) => {
        if (e.target.disabled) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
    });

    // Xử lý xóa sản phẩm
    tbody.querySelectorAll(".product-delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (btn.disabled) {
          alert("Không thể xóa sản phẩm đã được xác nhận!");
          return;
        }

        const productIndex = Number(btn.getAttribute("data-product-index"));
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi hóa đơn?")) {
          if (
            StoreList[pI] &&
            StoreList[pI].products &&
            StoreList[pI].products[productIndex]
          ) {
            StoreList[pI].products.splice(productIndex, 1);

            if (StoreList[pI].products.length === 0) {
              StoreList.splice(pI, 1);
              setStoreList(StoreList);
              modal.style.display = "none";
              storePage();
              return;
            }

            setStoreList(StoreList);
            const updatedStoreList = getStoreList();
            StoreList.length = 0;
            StoreList.push(...updatedStoreList);
            setTimeout(() => {
              const detailBtns = document.querySelectorAll(
                ".store-wrapper .product-detail-btn"
              );
              if (detailBtns[pI]) {
                detailBtns[pI].click();
              }
            }, 100);
          }
        }
      });
    });

    // Xử lý submit
    const acceptBtn = modal.querySelector(".createModal-accept-btn");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        setStoreList(StoreList);
        modal.style.display = "none";
        storePage();
      });
    }
  };

  // Render lần đầu
  renderStoreList(StoreList);

  // tạo phiếu nhập hàng
  const createStoreBtn = document.querySelector(
    ".store-wrapper .product-create-btn"
  );

  const modal = document.querySelector(".modal");

  createStoreBtn.addEventListener("click", () => {
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Tạo sản phẩm</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">
            <label for="name">Tên sản phẩm</label>
            <select name="name">
              <option>-- Chọn sản phẩm --</option>
              ${mangsp
                .map(
                  (p, index) => `<option value="${p.name}">${p.name}</option>`
                )
                .join("")}
            </select>

            <label for="brand">Hãng sản phẩm</label>
            <input type="text" name="brand"/>
            
            <label for="storage">Dung lượng sản phẩm</label>
            <select name="storage">
              <option>-- Chọn dung lượng --</option>
            </select>


            <label for="ram">RAM sản phẩm</label>
            <select name="ram">
              <option>-- Chọn RAM --</option>
            </select>
            
            <label for="color">Màu sản phẩm</label>
            <select name="color">
              <option>-- Chọn màu --</option>
            </select>

            <label for="price">Giá sản phẩm</label>
            <input type="text" name="price"/>


            <label for="category">Danh mục sản phẩm</label>
            <input type="text" name="category"/>

            <label for="stock">Số lượng</label>
            <input type="number" name="stock"/>

          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
      `;
    // auto điền thông tin
    const nameSelect = document.querySelector("select[name='name']");
    if (nameSelect) {
      nameSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        if (!value || value === "-- Chọn sản phẩm --") {
          // Reset form nếu không chọn gì
          const storageSelect = document.querySelector(
            "select[name='storage']"
          );
          const ramSelect = document.querySelector("select[name='ram']");
          const colorSelect = document.querySelector("select[name='color']");
          const priceInput = document.querySelector("input[name='price']");
          const brandInput = document.querySelector("input[name='brand']");
          const categoryInput = document.querySelector(
            "input[name='category']"
          );

          if (storageSelect) {
            storageSelect.innerHTML = `<option value="">-- Chọn dung lượng --</option>`;
            storageSelect.disabled = false;
          }
          if (ramSelect) {
            ramSelect.innerHTML = `<option value="">-- Chọn RAM --</option>`;
            ramSelect.disabled = false;
          }
          if (colorSelect)
            colorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
          if (priceInput) priceInput.value = "";
          if (brandInput) brandInput.value = "";
          if (categoryInput) categoryInput.value = "";
          return;
        }

        const itemProduct = mangsp.find((p) => p.name === value);

        // Auto fill brand và category
        const brandInput = document.querySelector("input[name='brand']");
        const categoryInput = document.querySelector("input[name='category']");
        if (brandInput) brandInput.value = itemProduct.brand || "";
        if (categoryInput) categoryInput.value = itemProduct.category || "";

        const storageSelect = document.querySelector("select[name='storage']");
        const ramSelect = document.querySelector("select[name='ram']");
        const colorSelect = document.querySelector("select[name='color']");
        const priceInput = document.querySelector("input[name='price']");

        if (itemProduct.versions[0].version.length == 2) {
          // Reset các select
          if (storageSelect) {
            storageSelect.innerHTML = `<option value="">-- Chọn dung lượng --</option>`;
            storageSelect.disabled = false;
            // Xóa event listener cũ
          }
          if (ramSelect) {
            ramSelect.innerHTML = `<option value="">-- Chọn RAM --</option>`;
            ramSelect.disabled = false;
            // Xóa event listener cũ
            const newRamSelect = ramSelect.cloneNode(true);
            ramSelect.parentNode.replaceChild(newRamSelect, ramSelect);
          }
          if (colorSelect) {
            colorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
          }
          if (priceInput) priceInput.value = "";

          // Sản phẩm (điện thoại, laptop...)
          const uniqueStorage = [
            ...new Set(
              itemProduct.versions
                .map((v) => v.version[1] || "")
                .filter(Boolean)
            ),
          ];

          const currentStorageSelect = document.querySelector(
            "select[name='storage']"
          );
          if (currentStorageSelect && uniqueStorage.length > 0) {
            // Thêm các option storage
            uniqueStorage.forEach((storage) => {
              const option = document.createElement("option");
              option.value = storage;
              option.textContent = storage;
              currentStorageSelect.appendChild(option);
            });

            // Event listener cho storage
            currentStorageSelect.addEventListener("change", function (e) {
              const storageValue = e.target.value;
              if (!storageValue) {
                // Reset RAM và Color
                const currentRamSelect =
                  document.querySelector("select[name='ram']");
                const currentColorSelect = document.querySelector(
                  "select[name='color']"
                );
                if (currentRamSelect)
                  currentRamSelect.innerHTML = `<option value="">-- Chọn RAM --</option>`;
                if (currentColorSelect)
                  currentColorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
                if (priceInput) priceInput.value = "";
                return;
              }

              // Lọc versions theo storage
              const filteredVersions = itemProduct.versions.filter(
                (v) => (v.version[1] || "") === storageValue
              );

              const currentRamSelect =
                document.querySelector("select[name='ram']");
              if (currentRamSelect) {
                currentRamSelect.innerHTML = `<option value="">-- Chọn RAM --</option>`;
                const uniqueRam = [
                  ...new Set(
                    filteredVersions
                      .map((v) => v.version[0] || "")
                      .filter(Boolean)
                  ),
                ];

                if (uniqueRam.length > 0) {
                  uniqueRam.forEach((ram) => {
                    const option = document.createElement("option");
                    option.value = ram;
                    option.textContent = ram;
                    currentRamSelect.appendChild(option);
                  });
                }

                // Reset color khi thay đổi storage
                const currentColorSelect = document.querySelector(
                  "select[name='color']"
                );
                if (currentColorSelect)
                  currentColorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
                if (priceInput) priceInput.value = "";

                // Event listener cho RAM

                currentRamSelect.addEventListener("change", function (e) {
                  const ramValue = e.target.value;
                  if (!ramValue) {
                    const currentColorSelect = document.querySelector(
                      "select[name='color']"
                    );
                    if (currentColorSelect)
                      currentColorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
                    if (priceInput) priceInput.value = "";
                    return;
                  }

                  // Tìm version có storage và RAM tương ứng
                  const version = filteredVersions.filter(
                    (v) => (v.version[0] || "") === ramValue
                  );

                  const currentColorSelect = document.querySelector(
                    "select[name='color']"
                  );
                  if (currentColorSelect) {
                    currentColorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
                    version.forEach((v) => {
                      const option = document.createElement("option");
                      option.value = v.color;
                      option.textContent = v.color;
                      currentColorSelect.appendChild(option);
                    });

                    currentColorSelect.addEventListener("change", function (e) {
                      const colorValue = e.target.value;
                      if (!colorValue) {
                        if (priceInput) priceInput.value = "";
                        return;
                      }
                      const colorObj = version.find(
                        (v) => v.color === colorValue
                      );
                      if (colorObj && priceInput) {
                        priceInput.value = colorObj.price;
                      }
                    });
                  }
                });
              }
            });
          }
        } else {
          // Sản phẩm đơn giản (không có versions - tai nghe, đồng hồ...)
          const currentStorageSelect = document.querySelector(
            "select[name='storage']"
          );
          const currentRamSelect = document.querySelector("select[name='ram']");
          const currentColorSelect = document.querySelector(
            "select[name='color']"
          );

          if (currentStorageSelect) {
            currentStorageSelect.innerHTML = `<option value="">-- Không có --</option>`;
            currentStorageSelect.disabled = true;
          }
          if (currentRamSelect) {
            currentRamSelect.innerHTML = `<option value="">-- Không có --</option>`;
            currentRamSelect.disabled = true;
          }

          // Load trực tiếp colors
          if (currentColorSelect) {
            currentColorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
            itemProduct.versions.forEach((v) => {
              const option = document.createElement("option");
              option.value = v.color;
              option.textContent = v.color;
              currentColorSelect.appendChild(option);
            });

            currentColorSelect.addEventListener("change", function (e) {
              const colorValue = e.target.value;
              if (!colorValue) {
                if (priceInput) priceInput.value = "";
                return;
              }

              const colorObj = itemProduct.versions.find(
                (v) => v.color === colorValue
              );
              if (colorObj && priceInput) {
                priceInput.value = colorObj.price;
              }
            });
          }
        }
      });
    }
    // đóng modal
    const closeModal = () => {
      modal.style.display = "none";
    };

    document
      .querySelector(".createModal-close-btn")
      .addEventListener("click", () => closeModal());

    // Xử lí submit khi tạo phiếu nhập hàng
    const acceptBtn = document.querySelector(".createModal-accept-btn");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        // Reload StoreList từ localStorage để đảm bảo dữ liệu mới nhất
        StoreList = getStoreList();

        const nameSelect = document.querySelector("select[name='name']");
        const ramSelect = document.querySelector("select[name='ram']");
        const storageSelect = document.querySelector("select[name='storage']");
        const priceInput = document.querySelector("input[name='price']");
        const colorSelect = document.querySelector("select[name='color']");
        const stockInput = document.querySelector("input[name='stock']");

        // Validation
        if (
          !nameSelect ||
          !nameSelect.value ||
          nameSelect.value === "-- Chọn sản phẩm --"
        ) {
          alert("Vui lòng chọn sản phẩm!");
          return;
        }

        if (
          !colorSelect ||
          !colorSelect.value ||
          colorSelect.value === "-- Chọn màu --"
        ) {
          alert("Vui lòng chọn màu sản phẩm!");
          return;
        }

        if (!priceInput || !priceInput.value) {
          alert("Vui lòng nhập giá sản phẩm!");
          return;
        }

        if (!stockInput || !stockInput.value || stockInput.value <= 0) {
          alert("Vui lòng nhập số lượng hợp lệ!");
          return;
        }

        const nameProduct = nameSelect.value;
        const ramProduct =
          ramSelect && !ramSelect.disabled && ramSelect.value
            ? ramSelect.value
            : "";
        const storageProduct =
          storageSelect && !storageSelect.disabled && storageSelect.value
            ? storageSelect.value
            : "";
        const priceProduct = Number(priceInput.value);
        const colorProduct = colorSelect.value;
        const stock = stockInput.value;

        if (priceProduct <= 0) {
          alert("Giá sản phẩm phải lớn hơn 0!");
          return;
        }

        if (stock <= 0) {
          alert("Số lượng phải lớn hơn 0!");
          return;
        }

        // Tạo options từ sản phẩm gốc và thêm vào mangsanpham
        const addListToProduct = () => {
          const originalProductIndex = mangsp.findIndex(
            (p) => p.name === nameProduct
          );

          // Kiểm tra sản phẩm có tồn tại không
          if (originalProductIndex < 0) {
            console.warn(
              `Sản phẩm "${nameProduct}" không tìm thấy trong mangsanpham`
            );
            return;
          }

          const originalProduct = mangsp[originalProductIndex];

          // Kiểm tra sản phẩm có versions không
          if (
            !originalProduct.versions ||
            originalProduct.versions.length === 0
          ) {
            console.warn(`Sản phẩm "${nameProduct}" không có versions`);
            return;
          }

          let options = {
            ram: [],
            storage: [],
            listColor: [],
          };
          let listColors = [];
          let listVersions = [];

          // Kiểm tra version đầu tiên có đủ 2 phần tử không (RAM và Storage)
          const firstVersion = originalProduct.versions[0];
          if (
            firstVersion &&
            firstVersion.version &&
            firstVersion.version.length === 2
          ) {
            // Sản phẩm có versions với RAM và Storage - lấy tất cả RAM và Storage
            const allRam = [
              ...new Set(
                originalProduct.versions
                  .map((v) => v.version && v.version[0])
                  .filter(Boolean)
              ),
            ];
            const allStorage = [
              ...new Set(
                originalProduct.versions
                  .map((v) => v.version && v.version[1])
                  .filter(Boolean)
              ),
            ];

            // Lấy tất cả colors từ tất cả versions
            const allColors = [];
            originalProduct.versions.forEach((version) => {
              if (version.color && !allColors.includes(version.color)) {
                allColors.push(version.color);
              }
            });

            options.ram = allRam;
            options.storage = allStorage;
            options.listColor = allColors;
            const listVersionProduct = [
              { name: "ram", option: options.ram },
              { name: "dung lượng", option: options.storage },
            ];
            const listColorProduct = options.listColor;
            listColors = listColorProduct;
            listVersions = listVersionProduct;
          } else {
            // Sản phẩm đơn giản - chỉ có colors
            listColors = originalProduct.versions
              .map((v) => v.color)
              .filter(Boolean);
          }

          // Cập nhật options vào sản phẩm trong mangsanpham
          mangsp[originalProductIndex].listColors = listColors;
          mangsp[originalProductIndex].listVersions = listVersions;

          // Lưu lại mangsanpham vào localStorage
          setListSanPham(mangsp);
        };

        addListToProduct();

        const now = new Date();
        const date = now.toLocaleDateString("vi-VN");

        const product = {
          nameProduct,
          ramProduct,
          storageProduct,
          stock: Number(stock),
          colorProduct,
          priceProduct: priceProduct.toString(),
          status: false, // Mặc định chưa xác nhận
        };

        const data = { date, products: [product] };
        const check = StoreList.find((p) => p.date === date);

        if (check) {
          const isExist = check.products.find(
            (p) =>
              p.nameProduct === nameProduct &&
              p.ramProduct === ramProduct &&
              p.storageProduct === storageProduct &&
              p.colorProduct === colorProduct &&
              p.priceProduct === priceProduct.toString()
          );

          if (isExist) {
            isExist.stock = (isExist.stock + stock).toString();
            setStoreList(StoreList);
            closeModal();
            storePage();
            return;
          }

          check.products.push(product);
        } else {
          StoreList.push(data);
        }

        setStoreList(StoreList);
        closeModal();
        storePage();
      });
    }
  });

  // Hàm parse date từ format "dd/mm/yyyy" sang "yyyy-mm-dd" để so sánh
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    // Nếu đã ở định dạng "yyyy-mm-dd" thì trả về luôn
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateStr;
    }
    // Nếu ở định dạng "dd/mm/yyyy" thì chuyển đổi
    if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [d, m, y] = dateStr.split("/");
      return `${y}-${m}-${d}`;
    }
    return null;
  };

  // Hàm kiểm tra date có trong khoảng thời gian không
  const isDateInRange = (storeDate, fromDate, toDate) => {
    if (!storeDate) return false;
    const parsedStoreDate = parseDate(storeDate);
    if (!parsedStoreDate) return false;

    if (fromDate && parsedStoreDate < fromDate) return false;
    if (toDate && parsedStoreDate > toDate) return false;
    return true;
  };

  // Biến lưu filter hiện tại
  let currentStatusFilter = "all";
  let currentFromDate = null;
  let currentToDate = null;

  // Hàm áp dụng tất cả filter
  const applyAllFilters = () => {
    let filtered = StoreList;

    // Filter theo trạng thái
    if (currentStatusFilter !== "all") {
      filtered = filtered.filter((store) => {
        if (currentStatusFilter === "true") {
          return (
            store.products &&
            store.products.length > 0 &&
            store.products.every((product) => product.status === true)
          );
        } else {
          return (
            !store.products ||
            store.products.length === 0 ||
            store.products.some((product) => product.status === false)
          );
        }
      });
    }

    // Filter theo ngày
    if (currentFromDate || currentToDate) {
      filtered = filtered.filter((store) =>
        isDateInRange(store.date, currentFromDate, currentToDate)
      );
    }

    renderStoreList(filtered);
  };

  // Xử lí lọc trạng thái
  const statusSelect = document.querySelector(".store-wrapper #user-status");
  if (statusSelect) {
    statusSelect.addEventListener("change", (e) => {
      currentStatusFilter = e.target.value;
      applyAllFilters();
    });
  }

  // Xử lí lọc theo ngày
  const fromDateInput = document.querySelector(
    ".store-wrapper input[name='fromDate']"
  );
  const toDateInput = document.querySelector(
    ".store-wrapper input[name='toDate']"
  );
  const filterDateBtn = document.querySelector(
    ".store-wrapper .product-filter-btn"
  );

  if (filterDateBtn) {
    filterDateBtn.addEventListener("click", () => {
      currentFromDate = fromDateInput?.value || null;
      currentToDate = toDateInput?.value || null;
      applyAllFilters();
    });
  }

  // Xử lí nút reload
  const reloadBtn = document.querySelector(
    ".store-wrapper .product-reload-btn"
  );
  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
      // Reload lại StoreList từ localStorage
      StoreList = getStoreList();
      currentStatusFilter = "all";
      currentFromDate = null;
      currentToDate = null;
      if (statusSelect) statusSelect.value = "all";
      if (fromDateInput) fromDateInput.value = "";
      if (toDateInput) toDateInput.value = "";
      renderStoreList(StoreList);
    });
  }
}
function categoryPage() {
  const render = (categories) => {
    document.querySelector("#category-content tbody").innerHTML = categories
      .map(
        (e, i) => `
        <tr>
          <td>${e.label}</td>
          <td>
              <label class="toggle-wrapper">
                <input type="checkbox" ${e.status ? "checked" : ""} 
                />
                <span class="slider"></span>
              </label>
          </td>
          <td>${e.createdAt}</td>
          <td>${e.updatedAt}</td>
          <td>
            <button class="product-detail-btn" >
              <i class="fa-solid fa-eye"></i>
            </button>
          </td>
          <td>
            <button class="product-delete-btn" >
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
    `
      )
      .join("");
  };
  render(categories);
  // Xử lí lọc
  const filter = {
    all: () => true,
    true: (e) => e.status == true,
    false: (e) => e.status == false,
  };
  document
    .querySelector(".category-wrapper #user-status")
    .addEventListener("change", (e) => {
      render(categories.filter(filter[e.target.value]));
    });
  const closeModal = () =>
    modal
      .querySelector(".createModal-close-btn")
      .addEventListener("click", () => (modal.style.display = "none"));

  const saveModal = (index) => {
    modal
      .querySelector(".createModal-accept-btn")
      .addEventListener("click", () => {
        const inputs = modal.querySelectorAll("input");
        if (index !== undefined) {
          inputs.forEach((input) => {
            categories[index][input.name] = input.value.trim();
          });
          categories[index].updatedAt = new Date().toLocaleString("vi-VN");
        } else {
          const data = {};
          inputs.forEach((input) => {
            data[input.name] = input.value;
          });
          data.updatedAt = new Date().toLocaleString("vi-VN");
          data.createdAt = new Date().toLocaleString("vi-VN");
          data.status = true;
          categories.splice(categories.length - 1, 0, data);
        }
        setCategoryList(categories);
        categoryPage();
        modal.style.display = "none";
      });
  };

  document
    .querySelectorAll(".category-table .product-detail-btn")
    .forEach((item, index) => {
      item.addEventListener("click", () => {
        modal.style.display = "block";
        modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chỉnh sửa danh mục</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">
            <label for="label">Danh mục sản phẩm</label>
            <input type="text" name="label" value="${categories[index].label}"/>
          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
        `;
        closeModal();
        saveModal(index);
      });
    });

  document
    .querySelectorAll(".category-table .product-delete-btn")
    .forEach((item, index) => {
      item.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
          categories.splice(index, 1);
          if (categories[i].label === product.category) {
            product.status = !product.status;
            product.versions.map((e) => (e.status = !e.status));
          }
          setListSanPham(mangsp);
          setCategoryList(categories);
          categoryPage();
          productPage();
        }
      });
    });

  document
    .querySelector(".category-wrapper .product-create-btn")
    .addEventListener("click", () => {
      modal.style.display = "block";
      modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Thêm danh mục</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">
            <label for="label">Danh mục sản phẩm</label>
            <input type="text" name="label"
          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
    `;
      saveModal();
      closeModal();
    });

  document
    .querySelectorAll(".category-wrapper .toggle-wrapper")
    .forEach((item, i) => {
      item.addEventListener("change", () => {
        categories[i].status = !categories[i].status;

        mangsp.map((product) => {
          if (categories[i].label === product.category) {
            product.status = !product.status;
            product.versions.map((e) => (e.status = !e.status));
          }
        });
        setListSanPham(mangsp);
        setCategoryList(categories);
        categoryPage();
        productPage();
      });
    });
}
function orderPage() {
  // Lấy lại orderList mới nhất từ localStorage
  orderList = getOrderList();

  const renderOrders = (ordersToRender) => {
    const tbody = document.querySelector(".order-table tbody");
    if (!tbody) return;

    tbody.innerHTML = ordersToRender
      .map((e, pI) => {
        return `
      <tr>
        <td>${e.tenNguoiNhan || ""}</td>
        <td>${e.thoiGianGiao || ""}</td>
        <td>${e.trangThai || ""}</td>
        <td>
          <button class="product-detail-btn" data-order-index="${pI}">
            <i class="fa-solid fa-eye"></i>
          </button>
        </td>
        <td>
          <button class="product-delete-btn" data-order-index="${pI}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
      })
      .join("");
  };

  renderOrders(orderList);

  // Function hiển thị modal chi tiết đơn hàng
  const showOrderDetailModal = (orderIndex) => {
    const order = orderList[orderIndex];

    modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chi tiết đơn hàng</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">

            <label for="date">Ngày đặt hàng</label>
            <input type="text" name="date" value="${
              order.thoiGianGiao || ""
            }" readOnly>

            <label for="label">Tên người nhận</label>
            <input type="text" name="label" value="${
              order.tenNguoiNhan || ""
            }" readOnly>

            <label for="label">Số điện thoại</label>
            <input type="text" name="label" value="${
              order.sdtNguoiNhan || ""
            }" readOnly>

            <label for="label">Địa chỉ</label>
            <input type="text" name="label" value="${
              order.diaChi || ""
            }" readOnly>

            <label for="items">Mặt hàng</label>
            <table name="items" class="orderItemTable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Phiên bản</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>

              <tbody>
              ${orderList[orderIndex].sanpham.sanpham
                .map((e, itemIndex) => {
                  const product = mangsp.find((p) => p.id === e.id);
                  const productName = product ? product.name : `ID: ${e.id}`;

                  let versionText = "";
                  if (
                    e.listphienban &&
                    Array.isArray(e.listphienban) &&
                    e.listphienban.length > 0
                  ) {
                    versionText = e.listphienban.join(" / ");
                    if (e.mau) {
                      versionText += ` / ${e.mau}`;
                    }
                  } else if (e.mau) {
                    versionText = e.mau;
                  }

                  return `
                    <tr>
                      <td>${itemIndex + 1}</td>
                      <td>${productName}</td>
                      <td>${versionText}</td>
                      <td>${e.soLuong || 0}</td>
                      <td>${e.thanhtien.toLocaleString("vi-VN")}</td>
                      <td>${(e.thanhtien || 0).toLocaleString("vi-VN")}</td>
                    </tr>
                    `;
                })
                .join("")}
              </tbody>
            </table>

            <label for="label">Tổng tiền</label>
            <input type="text" name="label" value="${(
              order.thanhtien || 0
            ).toLocaleString("vi-VN")}" readOnly/>

            <label for="status">Trạng thái</label>
            <select name="status" id="status">
              <option ${
                order.trangThai == "mới đặt" && "selected"
              } value="mới đặt">Mới đặt</option>
              <option ${
                order.trangThai == "đã xử lí" && "selected"
              } value="đã xử lí">Đã xử lí</option>
              <option ${
                order.trangThai == "đã giao" && "selected"
              } value="đã giao">Đã giao</option>
              <option ${
                order.trangThai == "hủy" && "selected"
              } value="hủy">Hủy</option>
            </select>
          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
        `;
    modal.style.display = "block";
    closeModal();
    saveModal(orderIndex);
  };

  document
    .querySelectorAll(".order-table .product-detail-btn")
    .forEach((item, index) => {
      item.addEventListener("click", () => {
        showOrderDetailModal(index);
      });
    });

  document
    .querySelectorAll(".order-table .product-delete-btn")
    .forEach((item, index) => {
      item.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
          orderList.splice(index, 1);
          setOrderList(orderList);
          orderPage();
        }
      });
    });

  // Xử lí lọc theo trạng thái
  const filer = {
    all: () => true,
    "mới đặt": (e) => e.trangThai === "mới đặt",
    "đã xử lí": (e) => e.trangThai === "đã xử lí",
    "đã giao": (e) => e.trangThai === "đã giao",
    hủy: (e) => e.trangThai === "hủy",
  };
  let filtered = orderList.filter(filer["all"]);

  document
    .querySelector(".order-wrapper #user-status")
    .addEventListener("change", (e) => {
      filtered = orderList.filter(filer[e.target.value]);
      renderOrders(orderList.filter(filer[e.target.value]));
    });
  const fromDate = document.querySelector(
    ".order-wrapper input[name='fromDate']"
  );
  const toDate = document.querySelector(".order-wrapper input[name='toDate']");
  document
    .querySelector(".order-wrapper .product-create-btn")
    .addEventListener("click", () => {
      if (!fromDate.value || !toDate.value) return;
      renderOrders(
        filtered.filter(
          (e) =>
            e.thoiGianGiao >= fromDate.value && e.thoiGianGiao <= toDate.value
        )
      );
    });

  // Nút khôi phuc
  document
    .querySelector(".order-wrapper .product-reload-btn")
    .addEventListener("click", () => {
      orderPage();
    });

  const saveModal = (index) => {
    // Xóa event listener cũ nếu có để tránh duplicate
    const acceptBtn = modal.querySelector(".createModal-accept-btn");
    const newAcceptBtn = acceptBtn.cloneNode(true);
    acceptBtn.parentNode.replaceChild(newAcceptBtn, acceptBtn);

    newAcceptBtn.addEventListener("click", () => {
      const value = modal.querySelector("select[name='status']").value;
      // Không cần JSON.parse vì value đã là string
      orderList[index].trangThai = value;
      modal.style.display = "none";
      if (value === "đã giao") {
        orderList[index].sanpham.sanpham.map((p) => {
          const product = mangsp.find((product) => product.id == p.id);
          product.versions.find(
            (op) =>
              op.version[0] === p.listphienban[0] &&
              op.version[1] === p.listphienban[1]
          ).stock -= p.soLuong;
        });
      }
      setOrderList(orderList);
      setListSanPham(mangsp);
      orderPage();
    });
  };
}
function profitPage() {
  mergeProduct();

  // render danh mục
  const renderProfitTable = (dataToRender, isProductList = false) => {
    const tbody = document.querySelector(".profit-wrapper .profit-table tbody");
    if (!tbody) return;

    if (isProductList) {
      // Render danh sách sản phẩm (mảng phẳng các products)
      tbody.innerHTML = dataToRender
        .map((product) => {
          // Tìm lại cI và pI từ profitList gốc
          let cI = -1;
          let pI = -1;

          for (let i = 0; i < profitList.length; i++) {
            const category = profitList[i];
            const productIndex = category.products?.findIndex(
              (p) => p.name === product.name && p.category === product.category
            );
            if (productIndex !== undefined && productIndex !== -1) {
              cI = i;
              pI = productIndex;
              break;
            }
          }

          return `
            <tr>
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td>${product.profit}</td>
              <td>${product.discount}</td>
              <td>
                <button class="product-detail-btn" data-cI="${cI}" data-pI="${pI}">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </td>
              <td>
                <button class="product-delete-btn" data-cI="${cI}" data-pI="${pI}">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          `;
        })
        .join("");
    } else {
      // Render danh sách category (mảng các category objects)
      tbody.innerHTML = dataToRender
        .map((item) => {
          // Tìm lại cI từ profitList gốc
          const cI = profitList.findIndex(
            (cat) => cat.category === item.category
          );

          let html = `
        <tr>
          <td>--</td>
          <td>${item.category}</td>
          <td>${item.profit}</td>
          <td>${item.discount}</td>
          <td>
            <button class="product-detail-btn" data-cI="${cI}">
              <i class="fa-solid fa-eye"></i>
            </button>
          </td>
          <td>
            <button class="product-delete-btn" data-cI="${cI}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;

          if (item.products?.length > 0 && cI >= 0) {
            html += item.products
              .map((p) => {
                // Tìm lại pI từ profitList gốc
                const pI = profitList[cI].products?.findIndex(
                  (product) =>
                    product.name === p.name && product.category === p.category
                );

                const validPI = pI !== undefined && pI !== -1 ? pI : null;
                return `
              <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.profit}</td>
                <td>${p.discount}</td>
                <td>
                  <button class="product-detail-btn" data-cI="${cI}" ${
                  validPI !== null ? `data-pI="${validPI}"` : ""
                }>
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </td>
                <td>
                  <button class="product-delete-btn" data-cI="${cI}" ${
                  validPI !== null ? `data-pI="${validPI}"` : ""
                }>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            `;
              })
              .join("");
          }

          return html;
        })
        .join("");
    }
  };

  // Biến lưu filter hiện tại
  let currentFilter = "all";
  // Biến lưu search term hiện tại
  let currentSearchTerm = "";

  // Hàm lọc dữ liệu theo search term
  const filterBySearch = (data, isProductList = false) => {
    if (!currentSearchTerm.trim()) {
      return data;
    }

    const searchLower = currentSearchTerm.toLowerCase().trim();

    if (isProductList) {
      // Lọc danh sách products
      return data.filter((product) => {
        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.category?.toLowerCase().includes(searchLower)
        );
      });
    } else {
      // Lọc danh sách categories
      return data
        .map((cat) => {
          // Kiểm tra category name
          const categoryMatch = cat.category
            ?.toLowerCase()
            .includes(searchLower);

          // Lọc products trong category
          const filteredProducts =
            cat.products?.filter((product) => {
              return (
                product.name?.toLowerCase().includes(searchLower) ||
                product.category?.toLowerCase().includes(searchLower)
              );
            }) || [];

          // Nếu category match hoặc có products match, giữ lại category
          if (categoryMatch || filteredProducts.length > 0) {
            return {
              ...cat,
              products: filteredProducts,
            };
          }
          return null;
        })
        .filter((cat) => cat !== null);
    }
  };

  // Hàm render lại với filter hiện tại
  const renderWithCurrentFilter = () => {
    let dataToRender;
    let isProductList = false;

    if (currentFilter === "all") {
      dataToRender = profitList;
      isProductList = false;
    } else if (currentFilter === "category") {
      dataToRender = profitList.map((cat) => ({
        ...cat,
        products: [],
      }));
      isProductList = false;
    } else if (currentFilter === "product") {
      dataToRender = profitList
        .map((cat) => cat.products || [])
        .flat()
        .filter((p) => p);
      isProductList = true;
    }

    // Áp dụng search filter
    dataToRender = filterBySearch(dataToRender, isProductList);

    renderProfitTable(dataToRender, isProductList);
    // Gắn lại event listener sau khi render
    attachEventListeners();
  };

  // Hàm gắn event listener cho các button
  const attachEventListeners = () => {
    // Xử lí nút detail
    document
      .querySelectorAll(".profit-wrapper .product-detail-btn")
      .forEach((e) => {
        // Xóa event listener cũ nếu có
        const newBtn = e.cloneNode(true);
        e.parentNode.replaceChild(newBtn, e);

        newBtn.addEventListener("click", () => {
          const cI = newBtn.getAttribute("data-cI");
          const pI = newBtn.getAttribute("data-pI");
          const element = pI ? profitList[cI].products[pI] : profitList[cI];
          modal.style.display = "block";
          modal.innerHTML = `
      <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chỉnh sửa danh mục</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">
            <label for="id">Danh mục</label>
            <input type="text" name="id" value="${element.category}"/ readOnly>

            <label for="profit">% lợi nhuận</label>
            <input type="number" name="profit" value="${element.profit}"/>

            <label for="discount">% giảm giá</label>
            <input type="number" name="discount" value="${element.discount}"/>

          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
      `;
          modal
            .querySelector(".createModal-accept-btn")
            .addEventListener("click", () => {
              const profitValue = modal.querySelector(
                "input[name='profit']"
              ).value;
              const discountValue = modal.querySelector(
                "input[name='discount']"
              ).value;
              const element = pI ? profitList[cI].products[pI] : profitList[cI];
              if (pI) {
                const findProduct = mangsp.find((e) => {
                  return (
                    e.category == element.category && e.name == element.name
                  );
                });
                findProduct.profit = profitValue;
                findProduct.discount = discountValue;
                setListSanPham(mangsp);
              }
              element.profit = profitValue;
              element.discount = discountValue;
              modal.style.display = "none";
              setProfitList(profitList);
              mergeProduct();
              renderWithCurrentFilter();
              attachEventListeners();
            });
          closeModal();
        });
      });

    // Xử lí nút delete
    document
      .querySelectorAll(".profit-wrapper .product-delete-btn")
      .forEach((e) => {
        // Xóa event listener cũ nếu có
        const newBtn = e.cloneNode(true);
        e.parentNode.replaceChild(newBtn, e);

        newBtn.addEventListener("click", () => {
          const cI = newBtn.getAttribute("data-cI");
          const pI = newBtn.getAttribute("data-pI");

          if (confirm("Bạn có chắc chắn muốn xóa phần tử này?")) {
            if (pI !== null && pI !== undefined && pI !== "") {
              // Xóa sản phẩm
              const element = profitList[cI].products[pI];
              profitList[cI].products.splice(pI, 1);
              setProfitList(profitList);

              // Xóa profit và discount khỏi mangsp
              const obj = mangsp.find((e) => {
                return e.category == element.category && e.name == element.name;
              });
              if (obj) {
                delete obj.discount;
                delete obj.profit;
                setListSanPham(mangsp);
              }
            } else {
              // Không cho phép xóa category
              alert("Không thể xóa lợi nhuận danh mục");
              return;
            }
          }
          renderWithCurrentFilter();
        });
      });
  };

  // Khi cần render, chỉ gọi:
  renderProfitTable(profitList, false);
  attachEventListeners();

  // thêm loại
  document
    .querySelector(".profit-wrapper .product-create-btn")
    .addEventListener("click", () => {
      modal.style.display = "block";
      modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chỉnh sửa danh mục</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body">
          <select name="categories" id="product-filter"></select>
          <label for="profit">% Lợi nhuận</label>
          <input name="profit" placeholder="Nhập % lợi nhuân VD: 10 (10%)"/>
          <label for="discount">% Giảm giá</label>
          <input name="discount" placeholder="Nhập % giảm giá VD: 10 (10%)"/>

          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Xác nhận</button>
          </div>
        </div>
        `;
      closeModal();
      loadFilter();
      modal
        .querySelector(".createModal-accept-btn")
        .addEventListener("click", () => {
          const selectValue = document.querySelector(
            "select[name='categories']"
          ).value;
          const profitValue = document.querySelector(
            "input[name='profit']"
          ).value;
          const discountValue = document.querySelector(
            "input[name='discount']"
          ).value;
          const check = profitList.find((e) => e.category === selectValue);
          if (!check) {
            const data = {
              discount: discountValue,
              profit: profitValue,
              type: "category",
            };
            data.category = selectValue;
            profitList.push(data);
            setProfitList(profitList);
            modal.style.display = "none";
          } else {
            alert("Đã thêm lợi nhuận cho loại sản phẩm này!");
            return;
          }
        });
    });

  // thêm sản phẩm
  document
    .querySelector(".profit-wrapper .product-reload-btn")
    .addEventListener("click", () => {
      modal.style.display = "block";
      modal.innerHTML = `
          <div class="createModal">
            <div class="createModal-header">
              <span class="createModal-title">Chỉnh sửa danh mục</span>
              <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="createModal-body">
              <select name="categories" id="product-filter">
              <option>-- Chọn sản phẩm</option>
              </select>
              <label for="profit">% Lợi nhuận</label>
              <input name="profit" placeholder="Nhập % lợi nhuân VD: 10 (10%)"/>
              <label for="discount">% Giảm giá</label>
              <input name="discount" placeholder="Nhập % giảm giá VD: 10 (10%)"/>
            </div>
            <div class="createModal-footer" >
              <button class="createModal-accept-btn">Xác nhận</button>
            </div>
          </div>
          `;
      document.querySelector("select[name='categories']").innerHTML += mangsp
        .map(
          (p) =>
            `<option value="${p.name}" data-c="${p.category}">${p.name}</option>`
        )
        .join("");
      closeModal();
      modal
        .querySelector(".createModal-accept-btn")
        .addEventListener("click", () => {
          const selectValue = document.querySelector(
            "select[name='categories']"
          ).value;
          const selectedCategory = document.querySelector(
            "select[name='categories'] option:checked"
          );
          const profitValue = document.querySelector(
            "input[name='profit']"
          ).value;
          const discountValue = document.querySelector(
            "input[name='discount']"
          ).value;
          // Lấy category của product
          const c = selectedCategory.getAttribute("data-c");
          // Tìm sản phẩm trong ListItem để thêm profity và discount
          const listItem = mangsp.filter((e) => e.name === selectValue);
          listItem.map((item) => {
            item.profit = Number(profitValue);
            item.discount = Number(discountValue);
          });
          //  Tìm category trong profitList
          const categoryInprofitList = profitList.find((e) => e.category == c);
          // Kiểm tra xem đã set profit và discount cho sản phẩm đó chưa
          const checkProduct = categoryInprofitList.products.find(
            (p) => p.name === selectValue
          );
          if (checkProduct) {
            alert("Sản phẩm này đã có profit và discount");
            return;
          } else {
            const data = {
              name: selectValue,
              profit: profitValue,
              discount: discountValue,
              category: c,
              type: "product",
            };
            categoryInprofitList.products.push(data);
          }
          setProfitList(profitList);
          setListSanPham(mangsp);
          mergeProduct();
          renderWithCurrentFilter();
          modal.style.display = "none";
        });
    });

  // Lọc sản phẩm hoặc loại
  const profitStatusSelect = document.querySelector("#profit-status");
  if (profitStatusSelect) {
    // Xóa event listener cũ nếu có
    const newSelect = profitStatusSelect.cloneNode(true);
    profitStatusSelect.parentNode.replaceChild(newSelect, profitStatusSelect);

    newSelect.addEventListener("change", (e) => {
      const value = e.target.value;
      currentFilter = value;
      renderWithCurrentFilter();
    });
  }

  // Xử lý tìm kiếm
  const searchInput = document.querySelector(
    ".profit-wrapper .product-search-input"
  );
  const searchBtn = document.querySelector(
    ".profit-wrapper .product-search-btn"
  );

  const handleSearch = () => {
    if (searchInput) {
      currentSearchTerm = searchInput.value;
      renderWithCurrentFilter();
    }
  };

  if (searchInput) {
    // Tìm kiếm khi nhấn Enter
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });

    // Tìm kiếm khi thay đổi (real-time search)
    searchInput.addEventListener("input", () => {
      handleSearch();
    });
  }

  if (searchBtn) {
    // Tìm kiếm khi click nút
    searchBtn.addEventListener("click", () => {
      handleSearch();
    });
  }
}
function stockPage() {
  // Reload dữ liệu
  mangsp = getListSanPham();
  StoreList = getStoreList();
  orderList = getOrderList();

  // Ngưỡng cảnh báo hết hàng
  const LOW_STOCK_THRESHOLD = 10;

  // Hàm tính nhập-xuất-tồn cho một sản phẩm
  const calculateStockMovement = (
    product,
    version,
    fromDate = null,
    toDate = null
  ) => {
    let nhap = 0;
    let xuat = 0;
    let ton = version.stock;

    // Nếu có filter thời gian: chỉ tính nhập-xuất trong kỳ và tồn đến toDate
    if (fromDate || toDate) {
      // Tính nhập trong kỳ (từ fromDate đến toDate)
      StoreList.forEach((store) => {
        const storeDate = store.date;
        if (
          storeDate &&
          (!fromDate || storeDate >= fromDate) &&
          (!toDate || storeDate <= toDate)
        ) {
          store.products?.forEach((storeProduct) => {
            if (storeProduct.status === true) {
              const matchName = storeProduct.nameProduct === product.name;
              const matchColor = storeProduct.colorProduct === version.color;
              let matchVersion = true;

              if (version.version && version.version.length === 2) {
                matchVersion =
                  storeProduct.ramProduct === version.version[0] &&
                  storeProduct.storageProduct === version.version[1];
              } else {
                matchVersion =
                  !storeProduct.ramProduct && !storeProduct.storageProduct;
              }

              if (matchName && matchColor && matchVersion) {
                nhap += Number(storeProduct.stock);
              }
            }
          });
        }
      });

      // Tính xuất trong kỳ (từ fromDate đến toDate)
      orderList.forEach((order) => {
        if (order.trangThai === "đã giao") {
          const orderDate = order.thoiGianGiao;
          if (
            orderDate &&
            (!fromDate || orderDate >= fromDate) &&
            (!toDate || orderDate <= toDate)
          ) {
            order.sanpham.sanpham?.forEach((item) => {
              const matchID = item.id === product.id;
              const matchColor = item.mau === version.color;
              let matchVersion = true;

              if (version.version && version.version.length === 2) {
                matchVersion =
                  item.listphienban[0] === version.version[0] &&
                  item.listphienban[1] === version.version[1];
              } else {
                matchVersion = !item.listphienban[0] && !item.listphienban[1];
              }

              if (matchID && matchColor && matchVersion) {
                xuat += Number(item.soLuong) || 0;
              }
            });
          }
        }
      });

      // Tính tồn từ đầu đến toDate
      let nhapDenDauKy = 0;
      let xuatDenDauKy = 0;

      // Tính nhập từ đầu đến đầu kỳ (trước fromDate)
      if (fromDate) {
        StoreList.forEach((store) => {
          const storeDate = store.date;
          if (storeDate && storeDate < fromDate) {
            store.products?.forEach((storeProduct) => {
              if (storeProduct.status === true) {
                const matchName = storeProduct.nameProduct === product.name;
                const matchColor = storeProduct.colorProduct === version.color;
                let matchVersion = true;

                if (version.version && version.version.length === 2) {
                  matchVersion =
                    storeProduct.ramProduct === version.version[0] &&
                    storeProduct.storageProduct === version.version[1];
                } else {
                  matchVersion =
                    !storeProduct.ramProduct && !storeProduct.storageProduct;
                }

                if (matchName && matchColor && matchVersion) {
                  nhapDenDauKy += Number(storeProduct.stock);
                }
              }
            });
          }
        });

        orderList.forEach((order) => {
          if (order.trangThai === "đã giao") {
            const orderDate = order.thoiGianGiao;
            if (orderDate && orderDate < fromDate) {
              order.sanpham.sanpham?.forEach((item) => {
                const matchID = item.id === product.id;
                const matchColor = item.mau === version.color;
                let matchVersion = true;

                if (version.version && version.version.length === 2) {
                  matchVersion =
                    item.listphienban[0] === version.version[0] &&
                    item.listphienban[1] === version.version[1];
                } else {
                  matchVersion = !item.listphienban[0] && !item.listphienban[1];
                }

                if (matchID && matchColor && matchVersion) {
                  xuatDenDauKy += Number(item.soLuong) || 0;
                }
              });
            }
          }
        });
      }

      let nhapDenToDate = 0;
      let xuatDenToDate = 0;

      StoreList.forEach((store) => {
        const storeDate = store.date;
        if (storeDate && (!toDate || storeDate <= toDate)) {
          store.products?.forEach((storeProduct) => {
            if (storeProduct.status === true) {
              const matchName = storeProduct.nameProduct === product.name;
              const matchColor = storeProduct.colorProduct === version.color;
              let matchVersion = true;

              if (version.version && version.version.length === 2) {
                matchVersion =
                  storeProduct.ramProduct === version.version[0] &&
                  storeProduct.storageProduct === version.version[1];
              } else {
                matchVersion =
                  !storeProduct.ramProduct && !storeProduct.storageProduct;
              }

              if (matchName && matchColor && matchVersion) {
                nhapDenToDate += Number(storeProduct.stock);
              }
            }
          });
        }
      });

      orderList.forEach((order) => {
        if (order.trangThai === "đã giao") {
          const orderDate = order.thoiGianGiao;
          if (orderDate && (!toDate || orderDate <= toDate)) {
            order.sanpham.sanpham?.forEach((item) => {
              const matchID = item.id === product.id;
              const matchColor = item.mau === version.color;
              let matchVersion = true;

              if (version.version && version.version.length === 2) {
                matchVersion =
                  item.listphienban[0] === version.version[0] &&
                  item.listphienban[1] === version.version[1];
              } else {
                matchVersion = !item.listphienban[0] && !item.listphienban[1];
              }

              if (matchID && matchColor && matchVersion) {
                xuatDenToDate += Number(item.soLuong) || 0;
              }
            });
          }
        }
      });

      // Tính nhập và xuất từ đầu đến hiện tại (tất cả dữ liệu)
      let nhapDenHienTai = 0;
      let xuatDenHienTai = 0;

      StoreList.forEach((store) => {
        store.products?.forEach((storeProduct) => {
          if (storeProduct.status === true) {
            const matchName = storeProduct.nameProduct === product.name;
            const matchColor = storeProduct.colorProduct === version.color;
            let matchVersion = true;

            if (version.version && version.version.length === 2) {
              matchVersion =
                storeProduct.ramProduct === version.version[0] &&
                storeProduct.storageProduct === version.version[1];
            } else {
              matchVersion =
                !storeProduct.ramProduct && !storeProduct.storageProduct;
            }

            if (matchName && matchColor && matchVersion) {
              nhapDenHienTai += Number(storeProduct.stock);
            }
          }
        });
      });

      orderList.forEach((order) => {
        if (order.trangThai === "đã giao") {
          order.sanpham.sanpham?.forEach((item) => {
            const matchID = item.id === product.id;
            const matchColor = item.mau === version.color;
            let matchVersion = true;

            if (version.version && version.version.length === 2) {
              matchVersion =
                item.listphienban[0] === version.version[0] &&
                item.listphienban[1] === version.version[1];
            } else {
              matchVersion = !item.listphienban[0] && !item.listphienban[1];
            }

            if (matchID && matchColor && matchVersion) {
              xuatDenHienTai += Number(item.soLuong) || 0;
            }
          });
        }
      });

      const tonDau = version.stock - nhapDenHienTai + xuatDenHienTai;

      ton = tonDau + nhapDenToDate - xuatDenToDate;
    } else {
      StoreList.forEach((store) => {
        store.products?.forEach((storeProduct) => {
          if (storeProduct.status === true) {
            const matchName = storeProduct.nameProduct === product.name;
            const matchColor = storeProduct.colorProduct === version.color;
            let matchVersion = true;

            if (version.version && version.version.length === 2) {
              matchVersion =
                storeProduct.ramProduct === version.version[0] &&
                storeProduct.storageProduct === version.version[1];
            } else {
              matchVersion =
                !storeProduct.ramProduct && !storeProduct.storageProduct;
            }

            if (matchName && matchColor && matchVersion) {
              nhap += Number(storeProduct.stock);
            }
          }
        });
      });

      orderList.forEach((order) => {
        if (order.trangThai === "đã giao") {
          order.sanpham.sanpham?.forEach((item) => {
            const matchID = item.id === product.id;
            const matchColor = item.mau === version.color;
            let matchVersion = true;

            if (version.version && version.version.length === 2) {
              matchVersion =
                item.listphienban[0] === version.version[0] &&
                item.listphienban[1] === version.version[1];
            } else {
              matchVersion = !item.ram && !item.storage;
            }

            if (matchID && matchColor && matchVersion) {
              xuat += Number(item.soLuong) || 0;
            }
          });
        }
      });
    }

    return { nhap, xuat, ton };
  };

  // Hàm tạo danh sách sản phẩm với thông tin stock
  const createStockList = (fromDate = null, toDate = null) => {
    return mangsp.flatMap((product, pI) => {
      return product.versions.map((version, vI) => {
        const movement = calculateStockMovement(
          product,
          version,
          fromDate,
          toDate
        );
        const isLowStock = movement.ton < LOW_STOCK_THRESHOLD;

        return {
          pI,
          vI,
          name: product.name,
          brand: product.brand,
          category: product.category,
          color: version.color,
          ram: version.version?.[0] || "",
          storage: version.version?.[1] || "",
          nhap: movement.nhap,
          xuat: movement.xuat,
          ton: movement.ton,
          isLowStock,
        };
      });
    });
  };

  // Biến lưu filter và search
  let currentFilter = "all";
  let currentSearchTerm = "";
  let fromDate = null;
  let toDate = null;

  // Hàm lọc sản phẩm
  const filterStockList = (stockList) => {
    let filtered = stockList;

    if (currentSearchTerm.trim()) {
      const searchLower = currentSearchTerm.toLowerCase().trim();
      filtered = filtered.filter((item) => {
        return (
          item.name?.toLowerCase().includes(searchLower) ||
          item.brand?.toLowerCase().includes(searchLower) ||
          item.category?.toLowerCase().includes(searchLower) ||
          item.color?.toLowerCase().includes(searchLower)
        );
      });
    }

    if (currentFilter === "lowStock") {
      filtered = filtered.filter((item) => item.isLowStock);
    } else if (currentFilter === "category") {
      const categoryMap = {};
      filtered.forEach((item) => {
        if (!categoryMap[item.category]) {
          categoryMap[item.category] = {
            category: item.category,
            totalStock: 0,
            lowStockCount: 0,
          };
        }
        categoryMap[item.category].totalStock += item.ton;
        if (item.isLowStock) {
          categoryMap[item.category].lowStockCount++;
        }
      });
      return Object.values(categoryMap);
    }

    return filtered;
  };

  // Hàm render bảng
  const renderStockTable = (stockList) => {
    const tbody = document.querySelector(".stock-wrapper .stock-table tbody");
    if (!tbody) return;

    if (currentFilter === "category") {
      tbody.innerHTML = stockList
        .map(
          (cat) => `
        <tr>
          <td>--</td>
          <td>--</td>
          <td>${cat.category}</td>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>${cat.totalStock}</td>
          <td>${
            cat.lowStockCount > 0
              ? `<span style="color: red;">⚠ ${cat.lowStockCount} sản phẩm sắp hết</span>`
              : "Bình thường"
          }</td>
          <td>--</td>
        </tr>
      `
        )
        .join("");
    } else {
      tbody.innerHTML = stockList
        .map(
          (item) => `
        <tr ${item.isLowStock ? 'style="background-color: #ffe6e6;"' : ""}>
          <td>${item.name}</td>
          <td>${item.brand}</td>
          <td>${item.category}</td>
          <td>${item.color} ${item.ram ? `- ${item.ram}` : ""} ${
            item.storage ? `- ${item.storage}` : ""
          }</td>
          <td>${item.nhap}</td>
          <td>${item.xuat}</td>
          <td ${
            item.isLowStock ? 'style="color: red; font-weight: bold;"' : ""
          }>${item.ton}</td>
          <td>${
            item.isLowStock
              ? '<span style="color: red;">⚠ Sắp hết hàng</span>'
              : "Bình thường"
          }</td>
          <td>
            <button class="product-detail-btn" data-pI="${item.pI}" data-vI="${
            item.vI
          }">
              <i class="fa-solid fa-eye"></i>
            </button>
          </td>
        </tr>
      `
        )
        .join("");
    }

    attachDetailListeners();
  };

  // Hàm gắn event listener cho detail button
  const attachDetailListeners = () => {
    document
      .querySelectorAll(".stock-wrapper .product-detail-btn")
      .forEach((btn) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener("click", () => {
          const pI = Number(newBtn.getAttribute("data-pI"));
          const vI = Number(newBtn.getAttribute("data-vI"));
          const product = mangsp[pI];
          const version = product.versions[vI];
          const movement = calculateStockMovement(
            product,
            version,
            fromDate,
            toDate
          );

          modal.style.display = "block";
          modal.innerHTML = `
        <div class="createModal" style="max-width: 600px;">
          <div class="createModal-header">
            <span class="createModal-title">Chi tiết tồn kho</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="createModal-body" style="padding: 24px;">
            <div style="margin-bottom: 20px;">
              <h3 style="margin: 0 0 16px 0; color: var(--primary-color);">Thông tin sản phẩm</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600; width: 40%;">Tên sản phẩm:</td>
                  <td style="padding: 10px;">${product.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600;">Hãng:</td>
                  <td style="padding: 10px;">${product.brand}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600;">Danh mục:</td>
                  <td style="padding: 10px;">${product.category}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600;">Màu sắc:</td>
                  <td style="padding: 10px;">${version.color}</td>
                </tr>
                ${
                  version.version && version.version.length === 2
                    ? `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600;">RAM:</td>
                  <td style="padding: 10px;">${version.version[0]}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600;">Dung lượng:</td>
                  <td style="padding: 10px;">${version.version[1]}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>
            
            <div style="margin-top: 24px;">
              <h3 style="margin: 0 0 16px 0; color: var(--primary-color);">Thống kê tồn kho</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600; width: 40%;">Số lượng nhập:</td>
                  <td style="padding: 10px; font-size: 18px; color: #28a745; font-weight: 600;">+${
                    movement.nhap
                  }</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px; font-weight: 600;">Số lượng xuất:</td>
                  <td style="padding: 10px; font-size: 18px; color: #dc3545; font-weight: 600;">-${
                    movement.xuat
                  }</td>
                </tr>
                <tr style="border-bottom: 2px solid var(--primary-color); background-color: #f8f9fa;">
                  <td style="padding: 12px; font-weight: 700; font-size: 16px;">Số lượng tồn:</td>
                  <td style="padding: 12px; font-size: 20px; font-weight: 700; color: ${
                    movement.ton < LOW_STOCK_THRESHOLD
                      ? "#dc3545"
                      : "var(--primary-color)"
                  };">${movement.ton}</td>
                </tr>
              </table>
            </div>
            
            ${
              movement.ton < LOW_STOCK_THRESHOLD
                ? `
            <div style="margin-top: 20px; padding: 16px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-exclamation-triangle" style="color: #ffc107; font-size: 24px;"></i>
                <div>
                  <strong style="color: #856404; font-size: 16px;">⚠ Cảnh báo: Sản phẩm sắp hết hàng!</strong>
                  <p style="margin: 5px 0 0 0; color: #856404;">Số lượng tồn hiện tại (${movement.ton}) dưới ngưỡng cảnh báo (${LOW_STOCK_THRESHOLD}). Vui lòng nhập thêm hàng.</p>
                </div>
              </div>
            </div>
            `
                : `
            <div style="margin-top: 20px; padding: 16px; background-color: #d4edda; border-left: 4px solid #28a745; border-radius: 4px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-check-circle" style="color: #28a745; font-size: 24px;"></i>
                <strong style="color: #155724; font-size: 16px;">✓ Trạng thái tồn kho: Bình thường</strong>
              </div>
            </div>
            `
            }
          </div>
          <div class="createModal-footer">
            <button class="createModal-accept-btn">Đóng</button>
          </div>
        </div>
      `;

          document
            .querySelector(".createModal-close-btn")
            .addEventListener("click", () => {
              modal.style.display = "none";
            });

          document
            .querySelector(".createModal-accept-btn")
            .addEventListener("click", () => {
              modal.style.display = "none";
            });
        });
      });
  };

  // Hàm render với filter hiện tại
  const renderWithCurrentFilter = () => {
    const stockList = createStockList(fromDate, toDate);
    const filtered = filterStockList(stockList);
    renderStockTable(filtered);
  };

  // Render lần đầu
  renderWithCurrentFilter();

  // Xử lý filter
  const filterSelect = document.querySelector(
    ".stock-wrapper select[name='status']"
  );
  if (filterSelect) {
    const newSelect = filterSelect.cloneNode(true);
    filterSelect.parentNode.replaceChild(newSelect, filterSelect);

    newSelect.addEventListener("change", (e) => {
      currentFilter = e.target.value;
      renderWithCurrentFilter();
    });
  }

  // Xử lý search
  const searchInput = document.querySelector(
    ".stock-wrapper .product-search-input"
  );
  const searchBtn = document.querySelector(
    ".stock-wrapper .product-search-btn"
  );

  const handleSearch = () => {
    if (searchInput) {
      currentSearchTerm = searchInput.value;
      renderWithCurrentFilter();
    }
  };

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
    searchInput.addEventListener("input", () => {
      handleSearch();
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      handleSearch();
    });
  }

  // Xử lý filter theo thời gian
  const fromDateInput = document.querySelector(
    ".stock-wrapper input[name='fromDate']"
  );
  const toDateInput = document.querySelector(
    ".stock-wrapper input[name='toDate']"
  );
  const filterDateBtn = document.querySelector(
    ".stock-wrapper .product-create-btn"
  );

  if (filterDateBtn) {
    filterDateBtn.addEventListener("click", () => {
      fromDate = fromDateInput.value || null;
      toDate = toDateInput.value || null;
      renderWithCurrentFilter();
    });
  }

  // Xử lý reload button
  const reloadBtn = document.querySelector(
    ".stock-wrapper .product-reload-btn"
  );
  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
      currentSearchTerm = "";
      fromDate = null;
      toDate = null;
      currentFilter = "all";
      if (searchInput) searchInput.value = "";
      if (fromDateInput) fromDateInput.value = "";
      if (toDateInput) toDateInput.value = "";
      if (filterSelect) filterSelect.value = "all";
      renderWithCurrentFilter();
    });
  }
}
