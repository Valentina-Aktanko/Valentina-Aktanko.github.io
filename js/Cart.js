class Cart {
    constructor(source, container = '#drop-cart') {
        this.source = source;
        this.container = container;
        this.countGoods = 0;
        this.amount = 0;
        this.cartItems = [];
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
        let $totalPriceWrap = $(`<p class="drop-cart-total">Total<span class="total-price"></span></p>`);

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
            src: product.img,
            alt: product.alt,
            width: 72,
            height: 85
        });
        let $desc = $('<div/>', {
            class: "drop-cart-text"
        });
        let $name = $('<h3/>', {
            class: "drop-cart-heading",
            text: product.product_name
        });
        let $rating = $('<img/>', {
            src: "img/starsRating.png",
            class: "drop-cart-rating",
            width: 56,
            height: 12
        });
        let $delBtn = $('<a/>', {
            class: "del-button drop-cart__del-button",
            href: "#"
        });

        $img.appendTo($productLink);
        $productLink.appendTo($container);
        $name.appendTo($desc);
        $rating.appendTo($desc);
        $desc.append($(`
            <p class="drop-cart-quantity">${product.quantity}
                <span class="drop-cart-x">x</span>
                <span class="drop-cart-price">${product.price}</span>
            </p>`));
        $delBtn.append($('<i class="fas fa-times-circle"></i>'));
        $delBtn.appendTo($desc);
        $desc.appendTo($container);
        $container.appendTo($('.cart-items-wrap'));
    }
    _renderSum(){
        $('.total-price').text(this.amount);
        if (this.countGoods  > 0) {
            $('.cart-count').addClass('show').text(this.countGoods);
        }
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
                quantity: 1,
                img: $(element).data('img'),
                width: $(element).data('width'),
                height: $(element).data('height')
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