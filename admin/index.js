import {
  getListItem,
  setListItem,
  initialData,
} from "../user/assets/js/mang.js";
import { getStoreList, setStoreList, initStoreList } from "./store.js";

window.productPage = productPage;
window.userPage = userPage;
window.storePage = storePage;
initialData();
initStoreList();
let mangsp = getListItem();
let StoreList = getStoreList();

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
    Page: "chart",
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
const container = document.querySelector(".container");
// handle click sidebar item
sidebarItems.forEach((e, index) => {
  e.addEventListener("click", () => {
    if (!e.classList.contains("active")) {
      sidebarItems.forEach((e) => e.classList.remove("active"));
      sidebarItemsArrayy.map((e) => (e.active = false));
      e.classList.add("active");
      sidebarItemsArrayy[index].active = true;
      loadPage(sidebarItemsArrayy[index].Page);
    }
  });
});
// Handle đổi trang
function loadPage(page) {
  sidebarItemsArrayy.map((e) => {
    if (e.Page) {
      const element = document.querySelector(`.${e.Page}-wrapper`);
      if (element) element.style.display = "none";
    }
  });
  document.querySelector(`.${page}-wrapper`).style.display = "block";
  const fn = `${page}Page`;
  typeof window[fn] == "function" && window[fn]();
}

loadPage("home");
// Trang sản phẩm
function productPage() {
  const loadBtn = document.querySelector(".product-reload-btn");
  const createBtn = document.querySelector(".product-create-btn");

  const categories = [
    { label: "Tất cả" },
    { label: "Điện thoại" },
    { label: "Laptop" },
    { label: "Tai nghe" },
    { label: "Đồng hồ" },
    { label: "Tablet" },
    { label: "SmartWatch" },
    { label: "Màn hình" },
    { label: "Bàn phím" },
    { label: "Chuột" },
    { label: "Khác" },
  ];

  // Render filter
  const loadFilter = () => {
    const product_filter = document.querySelectorAll("#product-filter");
    product_filter.forEach((e) => {
      e.innerHTML = categories
        .map((e) => `<option value="${e.label}">${e.label}</option>`)
        .join("");
    });
  };
  loadFilter();

  // Render sản phẩm
  const mergeListProduct = mangsp.flatMap((product, pI) =>
    product.versions.flatMap((version, vI) =>
      version.colors.flatMap((c, cI) => ({
        name: product.name,
        brand: product.brand,
        category: product.category,
        color: c.color,
        storage: version.storage,
        ram: version.ram,
        price: c.price,
        stock: c.stock,
        sold: c.sold,
        rating: c.rating,
        status: c.status,
        pI,
        vI,
        cI,
      }))
    )
  );

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
                <td>${e.storage}</td>
                <td>${e.ram}</td>
                <td>${e.price.toLocaleString("vi-VN")}</td>
                <td>${e.sold}</td>
                <td>${e.rating}</td>
                <td>
                    <label class="toggle-wrapper">
                      <input type="checkbox" ${
                        e.status ? "checked" : ""
                      } data-productIndex=${e.pI} data-versionIndex=${
          e.vI
        } data-colorIndex=${e.cI}
        />
                      <span class="slider"></span>
                    </label>
                </td>
                <td><button class="product-detail-btn" data-productIndex=${
                  e.pI
                } data-versionIndex=${e.vI} data-colorIndex=${
          e.cI
        }><i class="fa-solid fa-eye"></i></button></td>
                <td><button class="product-delete-btn" data-productIndex=${
                  e.pI
                } data-versionIndex=${e.vI} data-colorIndex=${
          e.cI
        }><i class="fa-solid fa-trash"></i></button></td>
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

            <label for="store">Dung lượng sản phẩm</label>
            <input type="text" name="store" placeholder="Nhập dung lượng sản phẩm VD: 256GB" >

            <label for="ram">RAM sản phẩm</label>
            <input type="text" name="ram" placeholder="Nhập RAM sản phẩm VD: 12GB" >

            <label for="color">Màu sản phẩm</label>
            <input type="String" name="color" placeholder="Nhập màu sản phẩm VD: Cam Vũ Trụ" >

            <label for="sold">Đã bán</label>
            <input type="String" name="sold" placeholder="Nhập số đã bán VD: 4.3K" >

            <label for="rating">Nhập đánh giá</label>
            <input type="String" name="rating" placeholder="Nhập đánh giá VD: 4.9" >

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
      const storage = document.querySelector("[name='store']").value.trim();
      const color = document.querySelector("[name='color']").value.trim();
      const category = document.querySelector("[name='categories']").value;
      const rating = document.querySelector("[name='rating']").value;
      const sold = document.querySelector("[name='sold']").value;
      const ram = document.querySelector("[name='ram']").value;

      if (!name || !brand || !price || !stock || !color) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
      }

      let product = mangsp.find((p) => p.name === name);
      if (!product) {
        product = {
          name,
          brand,
          category,
          status: true,
          versions: [],
        };
        mangsp.push(product);
      }

      let version = product.versions.find(
        (v) =>
          (v.storage || "") === (storage || "") && (v.ram || "") === (ram || "")
      );
      if (!version) {
        version = { ram, storage, colors: [] };
        product.versions.push(version);
      }

      let colorCheck = version.colors.find(
        (c) => c.color.toLowerCase() === color.toLowerCase()
      );
      if (!colorCheck) {
        colorCheck = { color, price, rating, sold, status: true };
        version.colors.push(colorCheck);
      } else {
        colorCheck.stock += stock;
        colorCheck.price = price;
      }

      const keys = document.querySelectorAll(".key-input");
      const values = document.querySelectorAll(".value-input");
      const infoDetail = {};

      keys.forEach((keyInput, i) => {
        const key = keyInput.value.trim();
        const value = values[i].value.trim();
        if (key && value) infoDetail[key] = value;
      });

      product.infoDetail = infoDetail;
      setListItem(mangsp);

      modal.style.display = "none";
      productPage();
    };

    const submitBtn = document.querySelector(".createModal-accept-btn");
    submitBtn.addEventListener("click", handleSubmit);
  });

  const productTbody = document.querySelector(".product-content table tbody");
  productTbody.addEventListener("click", (evt) => {
    const btn = evt.target.closest(".product-detail-btn");
    if (!btn) return;
    const pI = Number(btn.getAttribute("data-productIndex"));
    const vI = Number(btn.getAttribute("data-versionIndex"));
    const cI = Number(btn.getAttribute("data-colorIndex"));
    const product = mangsp[pI];
    const version = product.versions[vI];
    const colorItem = version.colors[cI];
    modal.innerHTML = `
        <div class="createModal">
          <div class="createModal-header">
            <span class="createModal-title">Chi tiết sản phẩm</span>
            <button class="createModal-close-btn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="product-detail-modal-body">
            <img src=${product.img || ""} alt="img">
            <div class="product-detail-modal-info">
              <span><b>Tên sản phẩm: </b><input value="${
                product.name
              }" name="name"/> </span><br>

              <span><b>Hãng sản phẩm: </b><input value="${
                product.brand
              }" name="brand"/></span><br>

              <span><b>Màu sản phẩm: </b><input value="${
                colorItem.color
              }" name="color"/></span><br>

              <span><b>Dung lượng sản phẩm: </b><input value="${
                version.storage
              }" name="storage"/></span><br>

              <span><b>RAM  sản phẩm: </b><input value="${
                version.ram
              }" name="ram"/></span><br>

              <span><b>Giá sản phẩm: </b><input value="${
                colorItem.price
              }" name="price"/></span><br>
              <span><b>hàng tồn: </b><input value="${
                colorItem.stock
              }" name="stock"/></span><br>
              <span><b>Đã mua: </b><input value="${
                colorItem.sold
              }" name="sold"/></span><br>
              <span><b>Đánh giá sản phẩm: </b><input value="${
                colorItem.rating
              }" name="rating"/></span><br>
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
      version.storage = values.storage;
      version.ram = values.ram;
      colorItem.color = values.color;
      colorItem.price = Number(values.price);
      colorItem.stock = Number(values.stock);
      colorItem.sold = values.sold;
      colorItem.rating = values.rating;

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
  deleteBtn.forEach((e, index) =>
    e.addEventListener("click", () => {
      const pI = e.getAttribute("data-productindex");
      const vI = e.getAttribute("data-versionindex");
      const cI = e.getAttribute("data-colorindex");
      if (confirm("Bạn có chắc chắn muốn xóa")) {
        mangsp[pI].versions[vI].colors.splice(cI, 1);
        setListItem(mangsp);
        productPage();
      }
    })
  );
  // Status Btn
  const statusBtn = document.querySelectorAll(".toggle-wrapper input");
  statusBtn.forEach((e, index) =>
    e.addEventListener("click", () => {
      const pI = e.getAttribute("data-productIndex");
      const vI = e.getAttribute("data-versionIndex");
      const cI = e.getAttribute("data-colorIndex");
      const version = mangsp[pI].versions[vI].colors[cI];
      version.status = !version.status;
      setListItem(mangsp);
    })
  );
}
function userPage() {
  const modal = document.querySelector(".modal");

  let getListUser;
  try {
    const raw = localStorage.getItem("mangtaikhoan");
    getListUser = raw ? JSON.parse(raw) : [];
  } catch (err) {
    getListUser = [];
    localStorage.setItem("mangtaikhoan", JSON.stringify(getListUser));
  }
  const userTable = document.querySelector("#user-content tbody");

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

        modal
          .querySelector(".createModal-close-btn")
          .addEventListener("click", () => {
            modal.style.display = "none";
          });

        modal
          .querySelector(".createModal-accept-btn")
          .addEventListener("click", () => {
            const inputs = modal.querySelectorAll("input");
            const newData = {};
            inputs.forEach((ip) => (newData[ip.name] = ip.value));

            getListUser[index + 1] = { ...user, ...newData };
            localStorage.setItem("mangtaikhoan", JSON.stringify(getListUser));
            modal.style.display = "none";
            userPage();
          });
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
        user.status = !!ip.checked;
        localStorage.setItem("mangtaikhoan", JSON.stringify(getListUser));
        userPage();
      });
    });
}

function storePage() {
  // load dữ liệu
  const storeTable = document.querySelector("#store-content tbody");
  storeTable.innerHTML = StoreList.map((e) => {
    const total = e.products.reduce(
      (acc, curr) => acc + curr.priceProduct * curr.stock,
      0
    );
    return `
      <tr>
        <td>${e.date}</td>
        <td>${total.toLocaleString("vi-VN")}</td>
        <td>Chưa xác nhận</td>
        <td><button class="product-detail-btn"><i class="fa-solid fa-eye"></i></button></td>
        <td><button class="product-delete-btn"><i class="fa-solid fa-trash"></i></button></td>
      </tr>
    `;
  }).join("");

  // tạo phiếu nhập hàng
  document
    .querySelector(".store-wrapper .product-create-btn")
    .addEventListener("click", () => {
      let getListItem = JSON.parse(localStorage.getItem("mangsanpham"));
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
      document
        .querySelector("select[name='name']")
        .addEventListener("change", (e) => {
          const value = e.target.value;
          const getListItem =
            JSON.parse(localStorage.getItem("mangsanpham")) || [];
          let itemProduct = getListItem.find((p) => p.name === value);
          document.querySelector("input[name='brand']").value =
            itemProduct.brand;

          document.querySelector("input[name='category']").value =
            itemProduct.category;

          const uniqueStorage = [
            ...new Set(itemProduct.versions.map((p) => p.storage)),
          ];

          const storageSelect = document.querySelector(
            "select[name='storage']"
          );
          const ramSelect = document.querySelector("select[name='ram']");
          const colorSelect = document.querySelector("select[name='color']");

          storageSelect.innerHTML = `<option value="">-- Chọn dung lượng --</option>`;
          ramSelect.innerHTML = `<option value="">-- Chọn RAM --</option>`;
          colorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;

          storageSelect.innerHTML += uniqueStorage
            .map((v) => `<option value="${v}">${v}</option>`)
            .join("");

          storageSelect.onchange = (e) => {
            const storageValue = e.target.value;

            const versions = itemProduct.versions.filter(
              (v) => v.storage === storageValue
            );

            ramSelect.innerHTML = `<option value="">-- Chọn RAM --</option>`;
            colorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;

            const uniqueRam = [...new Set(versions.map((v) => v.ram))];
            ramSelect.innerHTML += uniqueRam
              .map((r) => `<option value="${r}">${r}</option>`)
              .join("");

            ramSelect.onchange = (e) => {
              const ramValue = e.target.value;
              const colorList = versions.find((v) => v.ram === ramValue);

              colorSelect.innerHTML = `<option value="">-- Chọn màu --</option>`;
              colorSelect.innerHTML += colorList.colors
                .map((c) => `<option value="${c.color}">${c.color}</option>`)
                .join("");

              colorSelect.onchange = (e) => {
                const colorValue = e.target.value;
                const price = document.querySelector("input[name='price']");
                const finalObj = colorList.colors.find(
                  (v) => v.color == colorValue
                );
                price.value = finalObj.price * 0.8;
              };
            };
          };
        });
// đóng modal
      const closeModal = () => {
        modal.style.display = "none";
      };

      document
        .querySelector(".createModal-close-btn")
        .addEventListener("click", () => closeModal());
// Xử lí submit khi tạo phiếu nhập hàng
      document
        .querySelector(".createModal-accept-btn")
        .addEventListener("click", () => {
          const nameProduct = document.querySelector(
            "select[name='name']"
          ).value;
          const ramProduct =
            document.querySelector("select[name='ram']").value || "";
          const storageProduct =
            document.querySelector("select[name='storage']").value || "";
          const priceProduct = document.querySelector(
            "input[name='price']"
          ).value;
          const colorProduct =
            document.querySelector("select[name='color']").value || "";
          const stock = document.querySelector("input[name='stock']").value;
          const now = new Date();
          const date = now.toLocaleDateString("vi-VN");
          const product = {
            nameProduct,
            ramProduct,
            storageProduct,
            stock,
            colorProduct,
            priceProduct,
          };
          const data = { date, products: [product] };
          const check = StoreList.find((p) => p.date == date);
          if (check) {
            const isExist = check.products.find(
              (p) =>
                p.nameProduct == nameProduct &&
                p.ramProduct == ramProduct &&
                p.storageProduct == storageProduct &&
                p.stock == stock &&
                p.colorProduct == colorProduct &&
                p.priceProduct == priceProduct
            );
            if (isExist) {
              Number(isExist.stock) += Number(products.stock);
              return;
            }

            check.products.push(product);
          } else {
            StoreList.push(data);
          }
          closeModal();
          storePage();
          setStoreList(StoreList);
        });
    });
    // Xử lí detail
document.querySelectorAll(".store-wrapper .product-detail-btn").forEach((btn, index) => {
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

    document.querySelector(".createModal-close-btn")
      .addEventListener("click", () => modal.style.display = "none");

    const tbody = document.querySelector(".detail-store-table tbody");
    tbody.innerHTML = StoreList[index].products.map(e => `
      <tr>
        <td>
          ${e.nameProduct} 
          ${e.ramProduct ? " - " + e.ramProduct : ''} 
          ${e.storageProduct ? " - " + e.storageProduct : ''} 
          ${e.colorProduct ? " - " + e.colorProduct : ''}
        </td>
        <td><input type="number" value="${e.stock}" class="stock"/></td>
        <td>
          <label class="toggle-wrapper">
            <input type="checkbox" ${e.status ? "checked" : ""}/>
            <span class="slider"></span>
          </label>
        </td>
        <td><button class="product-delete-btn"><i class="fa-solid fa-trash"></i></button></td>
      </tr>
    `).join("");
    modal.querySelector(".createModal-accept-btn").addEventListener("click", () => {
        document.querySelectorAll(".detail-store-table input[type='checkbox']").forEach((e, index) => {
          e.addEventListener("change", () => {
            const element = StoreList[pI].products[index];
            element.status = e.checked;
          })
          const inputValue = document.querySelector("input[name='stock']").value;
          StoreList[pI].products[index].stock = inputValue;
          setStoreList(StoreList);
        })
    })
    document.querySelectorAll(".detail-store-table .product-delete-btn").forEach((e, index) => {
      e.addEventListener("click", () => {

      })
    })
  });
});

    // Xử lí delete
    document.querySelectorAll(".store-wrapper .product-delete-btn")
}
