class Cart {
    constructor(source, container = '#drop-cart') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее количество товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.cartItems = []; // Все товары
        this._init();
    }

    _init() {
        this._render();
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum();
            })
    }

    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: "cart-items-wrap"
        });
        let $totalPriceWrap = $('<div/>', {
            class: "drop-cart-total"
        });
        let $totalText = $('<p/>', {
            class: "total-test",
            text: "Total"
        });
        let $totalPrice = $('<p/>', {
            class: "total-price",
        });
        let $checkoutLink = $('<a/>', {
            href: "checkout.html",
            class: "button button_black drop-cart__button",
            text: "Checkout"

        });
        let $shoppingCartLink = $('<a/>', {
            href: "checkout.html",
            class: "button button_black drop-cart__button",
            text: "Go to cart"
        });
        $totalText.appendTo($totalPriceWrap);
        $totalPrice.appendTo($totalPriceWrap);
        $cartItemsDiv.appendTo($(this.container));
        $totalPriceWrap.appendTo($(this.container));
        $checkoutLink.appendTo($(this.container));
        $shoppingCartLink.appendTo($(this.container));
    }
    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'drop-cart-item',
            'data-product': product.id_product
        });
        let $productLink = $('<a/>', {
            href: "product.html"
        });
        let $img = $('<img>', {
            src: product.product_img,
            alt: product.product_alt
        });
        let $desc = $('<div/>', {
            class: "drop-cart-text"
        });
        let $name = $('<h3/>', {
            class: "drop-cart-heading",
            text: product.product_name
        });
        let $rating = $('<p/>', {
            class: "gold-stars gold-stars_drop-cart header__gold-stars"
        });
        let $fullStar = $('<i/>', {
            class: "fas fa-star"
        });
        let $halfStar = $('<i/>', {
            class: "fas fa-star-half-alt"
        });
        let $delBtn = $('<a/>', {
            class: "del-button drop-cart__del-button",
            href: "#"
        });

        $img.appendTo($productLink);
        $productLink.appendTo($container);
        $name.appendTo($desc);
        // rating
        for (let i=1; i<5; i++) {
            // $fullStar.appendTo($rating);
            $rating.append($fullStar);
        }
        $halfStar.appendTo($rating);
        $rating.appendTo($desc);
        $desc.append($(`
            <p class="drop-cart-count">${product.quantity}
                <span class="drop-cart-count-x">x</span>
                <span class="beforePrice">${product.price}</span>
            </p>`));
        $delBtn.append($('<i class="fas fa-times-circle"></i>'));
        $delBtn.appendTo($desc);
        $desc.appendTo($container);
        $container.appendTo($('.cart-items-wrap'));
    }
    _renderSum(){
        $('.total-price').text(this.amount);
    }
    _updateCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.total-price').text($(product.quantity*product.price));
    }
    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount+= find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                quantity: 1
            };
            this.cartItems.push(product);
            this._renderItem(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
        }
        this._renderSum();
    }
    _remove(id) {
        // TODO: Удаление товара
    }
}