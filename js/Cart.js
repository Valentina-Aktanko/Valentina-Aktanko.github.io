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
            class: 'cart-items-wrap'
        });
        let $totalPrice = $('<div/>', {
            class: 'drop-cart-total'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
    }
    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'drop-cart-item',
            'data-product': product.id_product
        });
        let $productLink = $('<a/>', {
            href: "product.html"
        });
        let $img = $('<img/>', {
            src: product.product_img,
            alt: product.product_alt,
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
        let $fullStar = $('')
        $img.appendTo($productLink);
        $name.appendTo($desc);

        $productLink.appendTo($container);
        $desc.appendTo($container);
        $container.appendTo($('.cart-items-wrap'));

        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб.</p>`));
    }
    _renderSum(){
        $('.sum-goods').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Общая сумма: ${this.amount} руб.`);
    }
    _updateCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
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