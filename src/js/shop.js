const headphones = [
    {
        img: "../img/src/shop/byz.png",
        title: "Apple BYZ S852I",
        price: 2927,
        rate: 4.7
    },
    {
        img: "../img/src/shop/earpods.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    },
    {
        img: "../img/src/shop/podswcase.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    },
    {
        img: "../img/src/shop/byz.png",
        title: "Apple BYZ S852I",
        price: 2927,
        rate: 4.7
    },
    {
        img: "../img/src/shop/earpods.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    },
    {
        img: "../img/src/shop/podswcase.png",
        title: "Apple EarPods",
        price: 2327,
        rate: 4.5
    },
];

const wireless = [
    {
        img: "../img/src/shop/airpods.png",
        title: "Apple AirPods",
        price: 9527,
        rate: 4.7
    },
    {
        img: "../img/src/shop/gerlax.png",
        title: "GERLAX GH-04",
        price: 6527,
        rate: 4.7
    },
    {
        img: "../img/src/shop/borofone.png",
        title: "BOROFONE BO4",
        price: 7527,
        rate: 4.7
    }
];

const headphonesParent = document.querySelector('.headphones');
const wirelessParent = document.querySelector('.wireless');
let i = 1;

headphones.forEach(item => {
    headphonesParent.innerHTML += `
    <div class="headphones_item" data-id="${i}">
        <div class="headphones_item_img">
            <img class="product-img" src="${item.img}" alt="">
        </div>
        <div class="headphones_item_descr">
            <div class="descr_block">
                <h3 class="name">${item.name}</h3>
                <div class="rating">
                    <div class="rating_star">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="rating_num">${item.rate}</div>
                </div>
            </div>
            <div class="descr_block">
                <div class="price">${item.price} ₽</div>
                <div class="buy">
                    <button data-cart>Купить</button>
                </div>
            </div>
        </div>
    </div>
    `;
    i++;
});

wireless.forEach(item => {
    wirelessParent.innerHTML += `
    <div class="headphones_item" data-id="${i}">
        <div class="headphones_item_img">
            <img class="product-img" src="${item.img}" alt="">
        </div>
        <div class="headphones_item_descr">
            <div class="descr_block">
                <h3 class="name">${item.name}</h3>
                <div class="rating">
                    <div class="rating_star">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="rating_num">${item.rate}</div>
                </div>
            </div>
            <div class="descr_block">
                <div class="price">${item.price} ₽</div>
                <div class="buy">
                    <button data-cart>Купить</button>
                </div>
            </div>
        </div>
    </div>
    `;
    i++;
});

const initialStorage = () => {

};

const updateStorage = () => {
    let parent = document.querySelector(".cart_items");
    let html = parent.innerHTML;
    console.log(html);
};

const cartItems = document.querySelector(".cart_items");

document.addEventListener("click", (event) => {
    if (event.target.hasAttribute('data-cart')){
        
        const card = event.target.closest('.headphones_item');

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector(".product-img").getAttribute('src'),
            title: card.querySelector(".name").innerText,
            price: card.querySelector(".price").innerText,
            rate: card.querySelector(".rating_num").innerText
        };

        /* const cartItemsHtml = `
        <div class="cart_item">
            <div class="cart_item_block">
                <div class="item_img">
                    <img src=${productInfo.imgSrc} alt="">
                </div>
                <div class="counter">
                    <button class="counter_btn_minus fa-solid fa-circle-minus" data-action="minus">
                    </button>
                    <div class="counter_item" data-counter>1</div>
                    <button class="counter_btn_plus fa-solid fa-circle-plus" data-action="plus">
                    </button>
                </div>
            </div>
            <div class="cart_item_block">
                <div class="name">${productInfo.title}</div>
                <div class="price">${productInfo.price}</div>
            </div>
            <div class="cart_item_block">
                <div class="delete">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
                <div class="price price_black">${productInfo.price}</div>
            </div>
            
        </div>
        `; */

        /* cartItems.insertAdjacentHTML('beforeend', cartItemsHtml); */

        updateStorage();
    }
});