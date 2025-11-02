import {
  getListItem,
  setListItem,
  initialData,
} from "../user/assets/js/mang.js";
import {
  getCategoryList,
  initCategoryList,
  setCategoryList,
} from "./categories.js";
import { getStoreList, setStoreList, initStoreList } from "./store.js";

window.productPage = productPage;
window.userPage = userPage;
window.storePage = storePage;
window.categoryPage = categoryPage;
initialData();
initStoreList();
initCategoryList();
let mangsp = getListItem();
let StoreList = getStoreList();
let categories = getCategoryList();

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
    label: "Quản lí kho",
    icon: "fa-solid fa-warehouse",
    Page: "store",
  },
  { label: "Trang chủ", icon: "fa-solid fa-circle-left" },
  { label: "Nguyen Van Dat", icon: "fa-solid fa-user" },
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
  });
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
// Trang sản phẩm
function productPage() {
  const loadBtn = document.querySelector(".product-reload-btn");
  const createBtn = document.querySelector(".product-create-btn");

  if (!loadBtn || !createBtn) return;

  // Render filter
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
  loadFilter();

  // Render sản phẩm
  const mergeListProduct = mangsp.flatMap((product, pI) => {
    if (product.versions && product.versions.length > 0) {
      // Render các sản phẩm có versions
      return product.versions.flatMap((version, vI) =>
        version.colors.flatMap((c, cI) => ({
          name: product.name,
          brand: product.brand,
          category: product.category,
          originCategory: product.category,
          color: c.color,
          storage: version.storage,
          ram: version.ram,
          price: c.price,
          status: c.status,
          pI,
          vI: vI, // Giữ chỉ số version thực tế
          cI,
        }))
      );
    }
    if (product.colors && product.colors.length > 0) {
      // Render các sản phẩm không có versions (simple products)
      return product.colors.flatMap((c, cI) => ({
        name: product.name,
        brand: product.brand,
        category: product.category,
        originCategory: product.category,
        color: c.color,
        price: c.price,
        status: c.status,
        pI,
        vI: -1,
        cI,
      }));
    }
    return [];
  });

  const renderItem = () => {
    const productContent = document.querySelector(
      ".product-content table tbody"
    );

    productContent.innerHTML = mergeListProduct
      .map(
        (e) => `
              <tr>
                <td>${e.name}</td>
                <th>${e.brand}</th>
                <td>${e.category}</td>
                <td>${e.color}</td>
                <td>${e.vI === -1 ? "-" : e.storage || "-"}</td>
                <td>${e.vI === -1 ? "-" : e.ram || "-"}</td>
                <td>${e.price.toLocaleString("vi-VN")}</td>
                <td>
                    <label class="toggle-wrapper">
                      <input type="checkbox" ${e.status ? "checked" : ""} 
                      data-productIndex="${e.pI}" 
                      data-versionIndex="${e.vI}" 
                      data-colorIndex="${e.cI}">
                      <span class="slider"></span>
                    </label>
                </td>
                <td>
                  <button class="product-detail-btn" 
                    data-productIndex="${e.pI}" 
                    data-versionIndex="${e.vI}" 
                    data-colorIndex="${e.cI}">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </td>
                <td>
                  <button 
                    class="product-delete-btn" 
                    data-productIndex="${e.pI}" 
                    data-versionIndex="${e.vI}" 
                    data-colorIndex="${e.cI}">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
  `
      )
      .join("");
  };
  renderItem();

  // Reload btn
  loadBtn.addEventListener("click", () => {
    console.log("reload");
  });

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

    // Handle create product
    const handleSubmit = () => {
      const name = document.querySelector("[name='name']").value.trim();
      const brand = document.querySelector("[name='brand']").value.trim();
      const price = Number(
        document.querySelector("[name='price']").value.trim()
      );
      const color = document.querySelector("[name='color']").value.trim();
      const category = document.querySelector("[name='categories']").value;

      if (!name || !brand || !price || !color) {
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
        } else if (key === "storage" || key === "dung lượng") {
          storage = value;
        } else if (key === "stock" || key === "số lượng" || key === "tồn kho") {
          stock = Number(value) || 0;
        } else if (key === "sold" || key === "đã bán") {
          sold = Number(value) || 0;
        } else if (key === "rating" || key === "đánh giá") {
          rating = Number(value) || 0;
        } else {
          infoDetail[key] = value;
        }
      });

      let product = mangsp.find((p) => p.name === name);
      if (!product) {
        product = {
          name,
          brand,
          category,
          originCategory: category,
          status: true,
          versions: [],
          colors: [],
          infoDetail: {},
        };
        mangsp.push(product);
      }

      // Cập nhật infoDetail cho product
      product.infoDetail = { ...product.infoDetail, ...infoDetail };

      // Kiểm tra nếu có RAM hoặc Storage thì tạo version, nếu không thì tạo sản phẩm đơn giản
      if (ram || storage) {
        // Sản phẩm có version (điện thoại, laptop)
        let version = product.versions.find(
          (v) => (v.storage || "") === storage && (v.ram || "") === ram
        );
        if (!version) {
          version = { ram, storage, colors: [] };
          product.versions.push(version);
        }

        let colorCheck = version.colors.find(
          (c) => c.color.toLowerCase() === color.toLowerCase()
        );
        if (!colorCheck) {
          colorCheck = { color, price, stock, sold, rating, status: true };
          version.colors.push(colorCheck);
        } else {
          colorCheck.stock += stock;
          colorCheck.price = price;
          colorCheck.sold = sold;
          colorCheck.rating = rating;
        }
      } else {
        // Sản phẩm đơn giản (tai nghe, đồng hồ)
        let colorCheck = product.colors.find(
          (c) => c.color.toLowerCase() === color.toLowerCase()
        );
        if (!colorCheck) {
          colorCheck = { color, price, stock, sold, rating, status: true };
          product.colors.push(colorCheck);
        } else {
          colorCheck.stock += stock;
          colorCheck.price = price;
          colorCheck.sold = sold;
          colorCheck.rating = rating;
        }
      }
      setListItem(mangsp);

      modal.style.display = "none";
      productPage();
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
    const cI = Number(btn.getAttribute("data-colorIndex"));
    const product = mangsp[pI];
    if (!product) return; // Bảo vệ khỏi null product

    // Xử lý cả sản phẩm có versions và không có versions
    const isSimpleProduct = vI === -1;
    const version = isSimpleProduct
      ? null
      : product.versions && product.versions[vI];
    if (isSimpleProduct && (!product.colors || !product.colors[cI])) return;
    if (
      !isSimpleProduct &&
      (!version || !version.colors || !version.colors[cI])
    )
      return;

    const colorItem = isSimpleProduct ? product.colors[cI] : version.colors[cI];
    modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chi tiết sản phẩm</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="product-detail-modal-body">
            <img src=${product.img || ""} alt="img">
            <div class="product-detail-modal-info">
              <span><b>Tên sản phẩm: </b><input value="${product.name
      }" name="name"/> </span><br>

              <span><b>Hãng sản phẩm: </b><input value="${product.brand
      }" name="brand"/></span><br>

              <span><b>Màu sản phẩm: </b><input value="${colorItem.color
      }" name="color"/></span><br>

              <span><b>Dung lượng sản phẩm: </b><input value="${
                version ? version.storage || "" : ""
              }" name="storage" ${
      isSimpleProduct ? "readonly" : ""
    }/></span><br>

              <span><b>RAM  sản phẩm: </b><input value="${
                version ? version.ram || "" : ""
              }" name="ram" ${isSimpleProduct ? "readonly" : ""}/></span><br>

              <span><b>Giá sản phẩm: </b><input value="${
                colorItem.price
              }" name="price"/></span><br>

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
        values[input.name] = input.value;
      });

      product.name = values.name;
      product.brand = values.brand;
      product.category = categoryChange.value;

      // Chỉ cập nhật storage và ram nếu có version
      if (version) {
        version.storage = values.storage;
        version.ram = values.ram;
      }

      colorItem.color = values.color;
      colorItem.price = Number(values.price);
      colorItem.stock = Number(values.stock) || 0;
      colorItem.sold = Number(values.sold) || 0;
      colorItem.rating = Number(values.rating) || 0;

      const inputValue = modal.querySelectorAll(".value-input");
      const inputKey = modal.querySelectorAll(".key-input");
      const newInfoDetail = {};

      inputKey.forEach((keyInput, index) => {
        const key = keyInput.value.trim();
        const val = inputValue[index].value.trim();
        if (key) newInfoDetail[key] = val;
      });

      product.infoDetail = newInfoDetail;

      setListItem(mangsp);
      modal.style.display = "none";
      productPage();
    });
  });
  // Delete Btn
  const deleteBtn = document.querySelectorAll(".product-delete-btn");
  if (deleteBtn.length === 0) return; // Bảo vệ khỏi empty nodelist

  deleteBtn.forEach((e, index) =>
    e.addEventListener("click", () => {
      const pI = Number(e.getAttribute("data-productIndex"));
      const vI = Number(e.getAttribute("data-versionIndex"));
      const cI = Number(e.getAttribute("data-colorIndex"));
      if (confirm("Bạn có chắc chắn muốn xóa")) {
        const product = mangsp[pI];
        if (!product) return; // Bảo vệ khỏi null product

        if (vI === -1) {
          // Sản phẩm đơn giản (không có versions)
          if (product.colors && product.colors[cI]) {
            product.colors.splice(cI, 1);
          }
        } else {
          // Sản phẩm có versions
          if (
            product.versions &&
            product.versions[vI] &&
            product.versions[vI].colors &&
            product.versions[vI].colors[cI]
          ) {
            product.versions[vI].colors.splice(cI, 1);
          }
        }
        setListItem(mangsp);
        productPage();
      }
    })
  );
  // Status Btn
  const statusBtn = document.querySelectorAll(".toggle-wrapper input");
  if (statusBtn.length === 0) return; // Bảo vệ khỏi empty nodelist

  statusBtn.forEach((e, index) =>
    e.addEventListener("click", () => {
      const pI = Number(e.getAttribute("data-productIndex"));
      const vI = Number(e.getAttribute("data-versionIndex"));
      const cI = Number(e.getAttribute("data-colorIndex"));
      const product = mangsp[pI];
      if (!product) return; // Bảo vệ khỏi null product

      const colorItem =
        vI === -1
          ? product.colors && product.colors[cI]
          : product.versions &&
            product.versions[vI] &&
            product.versions[vI].colors &&
            product.versions[vI].colors[cI];

      if (!colorItem) return; // Bảo vệ khỏi null colorItem

      colorItem.status = !colorItem.status;
      setListItem(mangsp);
    })
  );
}
function userPage() {
  const modal = document.querySelector(".modal");
  if (!modal) return; // Bảo vệ khỏi null pointer

  let getListUser;
  try {
    const raw = localStorage.getItem("mangtaikhoan");
    getListUser = raw ? JSON.parse(raw) : [];
  } catch (err) {
    getListUser = [];
    localStorage.setItem("mangtaikhoan", JSON.stringify(getListUser));
  }
  const userTable = document.querySelector("#user-content tbody");
  if (!userTable) return; // Bảo vệ khỏi null pointer

  // Render users
  userTable.innerHTML = getListUser
    .map((user, index) => {
      if (index !== 0) {
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
      }
    })
    .join("");

  // Detail Button
  document
    .querySelectorAll("#user-content .product-detail-btn")
    .forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let getListUser =
          JSON.parse(localStorage.getItem("mangtaikhoan")) || [];
        const user = getListUser[index + 1];
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

            getListUser[index + 1] = { ...user, ...newData };
            localStorage.setItem("mangtaikhoan", JSON.stringify(getListUser));
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
          JSON.parse(localStorage.getItem("mangtaikhoan")) || [];
        if (confirm("Bạn có chắc chắn muốn xóa")) {
          getListUser.splice(index + 1, 1);
          localStorage.setItem("mangtaikhoan", JSON.stringify(getListUser));
          userPage();
        }
      });
    });

  document
    .querySelectorAll("#user-content .toggle-wrapper input")
    .forEach((ip, index) => {
      ip.addEventListener("change", () => {
        let getListUser =
          JSON.parse(localStorage.getItem("mangtaikhoan")) || [];
        const user = getListUser[index + 1];
        if (!user) return; // Bảo vệ khỏi null user
        user.status = !!ip.checked;
        localStorage.setItem("mangtaikhoan", JSON.stringify(getListUser));
        userPage();
      });
    });
}

function storePage() {
  // Reload StoreList từ localStorage để đảm bảo dữ liệu mới nhất
  StoreList = getStoreList();

  // load dữ liệu
  const storeTable = document.querySelector("#store-content tbody");
  if (!storeTable) return; // Bảo vệ khỏi null pointer

  storeTable.innerHTML = (StoreList || [])
    .map((e) => {
      if (!e || !e.products || !Array.isArray(e.products)) return "";
      const total = e.products.reduce(
        (acc, curr) => acc + (curr.priceProduct || 0) * (curr.stock || 0),
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

  // tạo phiếu nhập hàng
  const createStoreBtn = document.querySelector(
    ".store-wrapper .product-create-btn"
  );
  if (!createStoreBtn) return; // Bảo vệ khỏi null pointer

  const modal = document.querySelector(".modal");
  if (!modal) return; // Bảo vệ khỏi null pointer

  createStoreBtn.addEventListener("click", () => {
    let getListItem = JSON.parse(localStorage.getItem("mangsanpham")) || [];
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
              ${getListItem
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
      // Xóa event listener cũ nếu có
      const newNameSelect = nameSelect.cloneNode(true);
      nameSelect.parentNode.replaceChild(newNameSelect, nameSelect);

      newNameSelect.addEventListener("change", (e) => {
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

        const getListItem =
          JSON.parse(localStorage.getItem("mangsanpham")) || [];
        const itemProduct = getListItem.find((p) => p.name === value);

        if (!itemProduct) {
          console.error("Không tìm thấy sản phẩm:", value);
          return;
        }

        // Auto fill brand và category
        const brandInput = document.querySelector("input[name='brand']");
        const categoryInput = document.querySelector("input[name='category']");
        if (brandInput) brandInput.value = itemProduct.brand || "";
        if (categoryInput) categoryInput.value = itemProduct.category || "";

        const storageSelect = document.querySelector("select[name='storage']");
        const ramSelect = document.querySelector("select[name='ram']");
        const colorSelect = document.querySelector("select[name='color']");
        const priceInput = document.querySelector("input[name='price']");

        // Reset các select
        if (storageSelect) {
          storageSelect.innerHTML = `<option value="">-- Chọn dung lượng --</option>`;
          storageSelect.disabled = false;
          // Xóa event listener cũ
          const newStorageSelect = storageSelect.cloneNode(true);
          storageSelect.parentNode.replaceChild(
            newStorageSelect,
            storageSelect
          );
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
          // Xóa event listener cũ
          const newColorSelect = colorSelect.cloneNode(true);
          colorSelect.parentNode.replaceChild(newColorSelect, colorSelect);
        }
        if (priceInput) priceInput.value = "";

        // Kiểm tra sản phẩm có versions hay không
        const hasVersions =
          itemProduct.versions && itemProduct.versions.length > 0;
        const hasColors = itemProduct.colors && itemProduct.colors.length > 0;

        if (hasVersions) {
          // Sản phẩm có versions (điện thoại, laptop...)
          const uniqueStorage = [
            ...new Set(
              itemProduct.versions.map((v) => v.storage || "").filter(Boolean)
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
                (v) => (v.storage || "") === storageValue
              );

              const currentRamSelect =
                document.querySelector("select[name='ram']");
              if (currentRamSelect) {
                currentRamSelect.innerHTML = `<option value="">-- Chọn RAM --</option>`;
                const uniqueRam = [
                  ...new Set(
                    filteredVersions.map((v) => v.ram || "").filter(Boolean)
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
                const newRamSelect = currentRamSelect.cloneNode(true);
                currentRamSelect.parentNode.replaceChild(
                  newRamSelect,
                  currentRamSelect
                );

                newRamSelect.addEventListener("change", function (e) {
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
                  const version = filteredVersions.find(
                    (v) => (v.ram || "") === ramValue
                  );
                  if (!version || !version.colors) {
                    console.error("Không tìm thấy version hoặc colors");
                    return;
                  }

                  const currentColorSelect = document.querySelector(
                    "select[name='color']"
                  );
                  if (currentColorSelect) {
                    currentColorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
                    version.colors.forEach((colorObj) => {
                      const option = document.createElement("option");
                      option.value = colorObj.color;
                      option.textContent = colorObj.color;
                      currentColorSelect.appendChild(option);
                    });

                    // Event listener cho color
                    const newColorSelect = currentColorSelect.cloneNode(true);
                    currentColorSelect.parentNode.replaceChild(
                      newColorSelect,
                      currentColorSelect
                    );

                    newColorSelect.addEventListener("change", function (e) {
                      const colorValue = e.target.value;
                      if (!colorValue) {
                        if (priceInput) priceInput.value = "";
                        return;
                      }

                      const colorObj = version.colors.find(
                        (c) => c.color === colorValue
                      );
                      if (colorObj && priceInput) {
                        priceInput.value = (colorObj.price * 0.8).toFixed(0);
                      }
                    });
                  }
                });
              }
            });
          }
        } else if (hasColors) {
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
            itemProduct.colors.forEach((colorObj) => {
              const option = document.createElement("option");
              option.value = colorObj.color;
              option.textContent = colorObj.color;
              currentColorSelect.appendChild(option);
            });

            const newColorSelect = currentColorSelect.cloneNode(true);
            currentColorSelect.parentNode.replaceChild(
              newColorSelect,
              currentColorSelect
            );

            newColorSelect.addEventListener("change", function (e) {
              const colorValue = e.target.value;
              if (!colorValue) {
                if (priceInput) priceInput.value = "";
                return;
              }

              const colorObj = itemProduct.colors.find(
                (c) => c.color === colorValue
              );
              if (colorObj && priceInput) {
                priceInput.value = (colorObj.price * 0.8).toFixed(0);
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

    const closeBtn = document.querySelector(".createModal-close-btn");
    if (closeBtn) {
      // Xóa event listener cũ nếu có
      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
      newCloseBtn.addEventListener("click", () => closeModal());
    }

    // Xử lí submit khi tạo phiếu nhập hàng
    const acceptBtn = document.querySelector(".createModal-accept-btn");
    if (acceptBtn) {
      // Xóa event listener cũ nếu có
      const newAcceptBtn = acceptBtn.cloneNode(true);
      acceptBtn.parentNode.replaceChild(newAcceptBtn, acceptBtn);

      newAcceptBtn.addEventListener("click", () => {
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

        if (!stockInput || !stockInput.value || Number(stockInput.value) <= 0) {
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
        const priceProduct = Number(priceInput.value) || 0;
        const colorProduct = colorSelect.value;
        const stock = Number(stockInput.value) || 0;

        if (priceProduct <= 0) {
          alert("Giá sản phẩm phải lớn hơn 0!");
          return;
        }

        if (stock <= 0) {
          alert("Số lượng phải lớn hơn 0!");
          return;
        }

        // Tạo options từ sản phẩm gốc và thêm vào mangsanpham
        const getListItem =
          JSON.parse(localStorage.getItem("mangsanpham")) || [];
        const originalProductIndex = getListItem.findIndex(
          (p) => p.name === nameProduct
        );
        const originalProduct =
          originalProductIndex >= 0 ? getListItem[originalProductIndex] : null;

        let options = {
          ram: [],
          storage: [],
          listColor: [],
        };

        if (originalProduct) {
          // Kiểm tra sản phẩm có versions hay không
          if (originalProduct.versions && originalProduct.versions.length > 0) {
            // Sản phẩm có versions - lấy tất cả RAM và Storage
            const allRam = [
              ...new Set(
                originalProduct.versions.map((v) => v.ram).filter(Boolean)
              ),
            ];
            const allStorage = [
              ...new Set(
                originalProduct.versions.map((v) => v.storage).filter(Boolean)
              ),
            ];

            // Lấy tất cả colors từ tất cả versions
            const allColors = [];
            originalProduct.versions.forEach((version) => {
              if (version.colors && version.colors.length > 0) {
                version.colors.forEach((colorObj) => {
                  if (colorObj.color && !allColors.includes(colorObj.color)) {
                    allColors.push(colorObj.color);
                  }
                });
              }
            });

            options.ram = allRam;
            options.storage = allStorage;
            options.listColor = allColors;
          } else if (
            originalProduct.colors &&
            originalProduct.colors.length > 0
          ) {
            // Sản phẩm đơn giản - chỉ có colors
            options.ram = [];
            options.storage = [];
            options.listColor = originalProduct.colors
              .map((c) => c.color)
              .filter(Boolean);
          }

          // Cập nhật options vào sản phẩm trong mangsanpham
          getListItem[originalProductIndex].options = options;
          // Lưu lại mangsanpham vào localStorage bằng hàm setListItem
          setListItem(getListItem);
        }

        const now = new Date();
        const date = now.toLocaleDateString("vi-VN");

        const product = {
          nameProduct,
          ramProduct,
          storageProduct,
          stock: stock.toString(),
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
            isExist.stock = (Number(isExist.stock) + stock).toString();
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
  // Xử lí detail
  document
    .querySelectorAll(".store-wrapper .product-detail-btn")
    .forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const pI = index;
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
          e.stock || 0
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
        tbody
          .querySelectorAll("input[type='number'].stock")
          .forEach((input) => {
            input.addEventListener("change", (e) => {
              if (e.target.disabled) return; // Không cho phép thay đổi nếu đã disabled
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

        // Xử lý thay đổi status - enable/disable stock và delete button
        // Lưu ý: Khi đã checked thì không thể uncheck nữa
        tbody.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
          // Kiểm tra nếu đã checked thì disable checkbox luôn
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
              // Kiểm tra nếu đang cố uncheck một sản phẩm đã checked trước đó
              const currentStatus = StoreList[pI].products[productIndex].status;
              if (currentStatus && !e.target.checked) {
                // Không cho phép uncheck nếu đã checked
                e.target.checked = true;
                alert(
                  "Không thể tắt trạng thái xác nhận! Sản phẩm đã được xác nhận nhập hàng."
                );
                return;
              }

              const isChecked = e.target.checked;

              // Nếu đang check (từ false -> true), disable checkbox luôn để không thể uncheck
              if (isChecked) {
                checkbox.disabled = true;
              }

              StoreList[pI].products[productIndex].status = isChecked;

              // Lưu thay đổi vào localStorage
              setStoreList(StoreList);

              // Cập nhật lại StoreList từ localStorage để đảm bảo đồng bộ
              const updatedStoreList = getStoreList();
              StoreList.length = 0;
              StoreList.push(...updatedStoreList);

              // Tìm các element tương ứng
              const stockInput = tbody.querySelector(
                `input.stock[data-product-index="${productIndex}"]`
              );
              const deleteBtn = tbody.querySelector(
                `button.product-delete-btn[data-product-index="${productIndex}"]`
              );

              // Enable/disable stock input và delete button
              if (stockInput) {
                stockInput.disabled = isChecked;
              }
              if (deleteBtn) {
                deleteBtn.disabled = isChecked;
              }

              // Kiểm tra xem tất cả sản phẩm đã checked chưa và cập nhật lại bảng danh sách
              const allChecked =
                StoreList[pI] &&
                StoreList[pI].products.length > 0 &&
                StoreList[pI].products.every(
                  (product) => product.status === true
                );

              // Nếu tất cả sản phẩm đã checked, reload lại storePage để cập nhật trạng thái "Đã hoàn thành"
              if (allChecked) {
                setTimeout(() => {
                  storePage();
                  // Mở lại detail modal sau khi reload
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

          // Ngăn chặn click nếu đã disabled
          checkbox.addEventListener("click", (e) => {
            if (e.target.disabled) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          });
        });

        // Xử lý xóa sản phẩm trong chi tiết hóa đơn (chỉ khi chưa checked)
        tbody.querySelectorAll(".product-delete-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Ngăn event bubbling

            // Không cho phép xóa nếu button đã disabled
            if (btn.disabled) {
              alert("Không thể xóa sản phẩm đã được xác nhận!");
              return;
            }

            const productIndex = Number(btn.getAttribute("data-product-index"));
            if (
              confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi hóa đơn?")
            ) {
              if (
                StoreList[pI] &&
                StoreList[pI].products &&
                StoreList[pI].products[productIndex]
              ) {
                StoreList[pI].products.splice(productIndex, 1);

                // Nếu không còn sản phẩm nào, xóa luôn hóa đơn
                if (StoreList[pI].products.length === 0) {
                  StoreList.splice(pI, 1);
                  setStoreList(StoreList);
                  modal.style.display = "none";
                  storePage();
                  return;
                }

                setStoreList(StoreList);
                // Reload lại StoreList từ localStorage để đảm bảo đồng bộ
                const updatedStoreList = getStoreList();
                // Cập nhật lại StoreList trong memory
                StoreList.length = 0;
                StoreList.push(...updatedStoreList);
                // Reload lại detail modal bằng cách trigger lại detail button
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

        // Xử lý submit (lưu thay đổi)
        const acceptBtn = modal.querySelector(".createModal-accept-btn");
        if (acceptBtn) {
          acceptBtn.addEventListener("click", () => {
            setStoreList(StoreList);
            modal.style.display = "none";
            storePage();
          });
        }
      });
    });

  // Xử lí delete hóa đơn (phiếu nhập hàng)
  const deleteStoreBtns = document.querySelectorAll(
    ".store-wrapper .product-delete-btn"
  );
  deleteStoreBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
        if (StoreList && StoreList[index]) {
          StoreList.splice(index, 1);
          setStoreList(StoreList);
          storePage();
        }
      }
    });
  });
}

function categoryPage() {
  document.querySelector("#category-content tbody").innerHTML = categories
    .map(
      (e, i) => `
        <tr>
          <td>${e.label}</td>
          <td>
              <label class="toggle-wrapper">
                <input type="checkbox" ${e.status ? "checked" : ""} 
                ${i == 0 || i == categories.length - 1 ? "disabled" : ""}/>
                <span class="slider"></span>
              </label>
          </td>
          <td>${e.createdAt}</td>
          <td>${e.updatedAt}</td>
          <td>
            <button class="product-detail-btn" ${
              i == 0 || i == categories.length - 1 ? "disabled" : ""
            }>
              <i class="fa-solid fa-eye"></i>
            </button>
          </td>
          <td>
            <button class="product-delete-btn" ${
              i == 0 || i == categories.length - 1 ? "disabled" : ""
            }>
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
    `
    )
    .join("");

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
          setCategoryList(categories);
          categoryPage();
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
    });

  document
    .querySelectorAll(".category-wrapper .toggle-wrapper")
    .forEach((item, i) => {
      item.addEventListener("change", () => {
        categories[i].status = !categories[i].status;
        const otherCategoryLabel = categories[categories.length - 1].label; // "Khác"
        
        mangsp.map((product) => {
          if (
            !categories[i].status &&
            product.category === categories[i].label
          ) {
            product.category = otherCategoryLabel;
          }
          if (
            categories[i].status &&
            product.originCategory === categories[i].label &&
            product.category === otherCategoryLabel
          ) {
            product.category = product.originCategory;
          }
        });
        setListItem(mangsp);
        setCategoryList(categories);
        categoryPage();
        productPage();
      });
    });
}
