const openGioHang = document.querySelector('.open_giohang');
giohangoverlay = document.querySelector('.overlay');

openGioHang.addEventListener('click',function(){
    let giohangModel = document.querySelector(".giohang");

    if(giohangModel === null){
        fetch('user/pages/giohang.html')
            .then(res => res.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);//them vao cuoi body

                requestAnimationFrame(() => {
                    giohangModel = document.querySelector('.giohang');
                    //nut dong 
                    const closeButton = giohangModel.querySelector(".giohang_top_huy");
                    closeButton.addEventListener('click', () => {
                        giohangModel.style.display = 'none';
                        giohangoverlay.style.display = 'none';
                        enableScroll();
                    });

                    disableScroll();
                    giohangoverlay.style.display = 'block';
                });
            }).catch(err => { });
    }
    else {
        giohangModel.style.display = 'block';
        giohangoverlay.style.display = 'block';
        disableScroll();
    }
});