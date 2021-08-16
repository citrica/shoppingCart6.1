const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

const products = [{
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

var container = document.getElementById("shopping-cart"); // Obtener elemento div que tenemos en el HTML

var productDescription = product => {
    var productDescription = document.createElement("h3");
    productDescription.innerText = product.description + " - " + product.price + "€/ud. ";
    container.appendChild(productDescription); // Hijo del id shopping-cart, para visualizar la descripción de cada producto
    return productDescription;
}
var productData = product => {
    var units = document.createElement("input");
    var description = productDescription(product);
    units.setAttribute("class", "product-unit");
    units.setAttribute("type", "number");
    units.setAttribute("min", 0);
    units.setAttribute("max", product.stock);
    units.setAttribute("value", product.units);
    units.addEventListener("change", event => product.units = event.target.valueAsNumber);
    description.appendChild(units); // Hijo de cada producto, de cada h3. Input para las unidades de cada producto
    return units;
};

var showProducts = productList => {
    for (var product of productList) {
        productData(product);
    }
    disableButton(productList);
};

var productPrice = product => { // Precio total de un producto
    return product.price * product.units;
};

var productTax = product => { // Iva total de un producto
    return productPrice(product) * (product.tax / 100);
};

var calculateSubtotal = productList => { // Precio total sin iva de una lista de productos
    var subtotal = 0;
    for (var product of productList) {
        subtotal += productPrice(product);
    }
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    return subtotal;
};

var calculateTotalTax = productList => { // Iva total de una lista de productos
    var totalTax = 0;
    for (var product of productList) {
        totalTax += productTax(product);
    }
    document.getElementById("tax").innerText = totalTax.toFixed(2);
    return totalTax;
};

var calculateTotal = productList => {
    var total = 0;
    total = calculateSubtotal(productList) + calculateTotalTax(productList);
    document.getElementById("total").innerText = total.toFixed(2);
    return total;
};

var disableButton = productList => {
    var btn = document.getElementById("calculate");
    btn.disabled = true
    for (var product of productList) {
        if (product.units !== 0) {
            btn.disabled = false;
        }
    }
};

//Eventos
showProducts(products); // Mostrar lista de productos
document.getElementById("shopping-cart").addEventListener("click", () => disableButton(products));
document.getElementById("calculate").addEventListener("click", () => calculateTotal(products));