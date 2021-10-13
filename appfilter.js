// SELECT ELEMENTS
const filterBtns = document.querySelectorAll(".filter-btn");
const productContainer = document.querySelector(".grid");

// UI
class UI {
  displayProducts(products) {
    let displayMenuItems = products.map((product) => {
      return ` <article class="product">
            <div class="img-container">
                <img src=${product.image} alt="sleeves and hoodies">
                <div class="button-container">
                    <button class="product-btn" data-id=${product.category}>
                        add to cart
                    </button>
                    <h3>${product.title}</h3>
                    <h4>$${product.price}</h4>
                </div>
            </div>
        </article>`;
    });
    displayMenuItems = displayMenuItems.join("");
    productContainer.innerHTML = displayMenuItems;
  }
  // BUTTON FUNCTIONALITY
  getButtons(params) {
    filterBtns.forEach((btns) => {
      btns.addEventListener("click", (e) => {
        let category = e.currentTarget.dataset.id;
        let products = params.filter((item) => {
          if (item.category === category) {
            return item;
          }
        });
        if (category === "all") {
          this.displayProducts(params);
        } else {
          this.displayProducts(products);
        }
      });
    });
  }
}
// FETCH PRODUCT JSON
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}
// INITIAL DOCUMENT LOAD
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then((products) => {
    ui.displayProducts(products);
    ui.getButtons(products);
  });
});
