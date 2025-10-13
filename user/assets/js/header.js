let vtCuon = 0;
let cuon = true;
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