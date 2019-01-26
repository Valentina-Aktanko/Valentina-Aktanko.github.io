class Product {
    constructor(id, title, price, img = 'https://placehold.it/263x283', container = '.box-product', width = 72, height = 85) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.width = width;
        this.height = height;
        this.container = container;
        this._render();
    }

    _render() {
        let $wrapper = $('<div/>', {
            class: 'item-product'
        });
        let $productLink = $('<a/>', {
                href: "product.html",
                class: "product-link"
        });
        let $img = $('<img/>', {
            src: this.img
        });
        let $desc = $('<div/>', {
            class: 'product-text'
        });
        let $name = $('<p/>', {
            class: 'product-name',
            text: this.title
        });

        // let $price = $(`<p class='product-price beforePrice'>${this.price}</p>`);
        let $price = $('<p/>', {
            class: 'product-price beforePrice',
            text: this.price
        });

        let $btnWrap = $('<div/>', {
            class: 'parent-add'
        });

        let $buyBtn = $('<a/>', {
            class: 'add',
            text: 'Add to Cart',
            'data-id': this.id,
            'data-price': this.price,
            'data-name': this.title,
            'data-img': this.img,
            'data-width': this.width,
            'data-height': this.height

        });

        // Создание структуры
        $name.appendTo($desc);
        $price.appendTo($desc);
        $img.appendTo($productLink);
        $desc.appendTo($productLink);
        $buyBtn.appendTo($btnWrap);
        $productLink.appendTo($wrapper);
        $btnWrap.appendTo($wrapper);
        $(this.container).append($wrapper);
    }
}