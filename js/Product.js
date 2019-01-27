class Product {
    constructor(id, title, price, img = 'https://placehold.it/263x283', container = '.box-product') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.container = container;
        this._render();
    }

    _render() {
        let $wrapper = $('<div/>', {
            class: "item-product"
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

        let $price = $('<p/>', {
            class: 'product-price beforePrice',
            text: this.price
        });

        let $btnWrap = $('<div/>', {
            class: 'parent-add'
        });

        let $buyBtn = $('<a/>', {
            href: "#",
            class: "add",
            text: "Add to Cart",
            'data-id': this.id,
            'data-name': this.title,
            'data-price': this.price,
            'data-img': this.img,
            'data-width': this.width, // убрать отсюда и захардкодить в кнопке
            'data-height': this.height // убрать отсюда и захардкодить в кнопке

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