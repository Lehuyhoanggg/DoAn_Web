let vtCuon = 0;
let cuon = true;

export function tatCuon() {
    cuon = false;
    setTimeout(function () {
        cuon = true;
    }, 300);
}

// cuộn xuổng để mở danh mục sản phẩm trên menu và ngược lại
window.addEventListener("scroll", () => {
    if (cuon) {
        let vtCuonMoi = window.scrollY;
        const header_bottom = document.querySelector(".header_bottom");
        const header = document.querySelector(".header");
        if (vtCuonMoi > vtCuon) {
            header.classList.add("colai");
            header_bottom.classList.add("bienmat");
        }
        else {

            header.classList.remove("colai");
            setTimeout(() => {
                header_bottom.classList.remove("bienmat");
            }, 300);

        }
        vtCuon = vtCuonMoi;
    }
});

// tới gần mục sản phẩm thì hiện menu , ngăn co lại
window.addEventListener("scroll", () => {
    if (window.scrollY >= 410 && window.scrollY <= 1000) {
        const header_bottom = document.querySelector(".header_bottom");
        const header = document.querySelector(".header");
        cuon = false;
        header.classList.remove("colai");
        header_bottom.classList.remove("bienmat");
    } else {
        cuon = true;
    }
});



