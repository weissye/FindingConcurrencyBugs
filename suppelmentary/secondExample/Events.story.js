/* @provengo summon selenium */

const URL = "http://localhost/"
//const URL = "https://magento2-demo.magebit.com/"
//const URL = "https://magento2-b2b.magebit.com/"

const users =    [{username: 'roni_cost@example.com', password: 'roni_cost3@example.com', expectedWelcome: 'Welcome, Veronica Costello!'}]
const products = [
    {category: 'Men', subCategory: 'Tops', subSubCategory: 'Hoodies & Sweatshirts', options: ['XL', 'Green'], product: 'Hero Hoodie', expected_image: 'mh07-green_main', price: "$54.00"},
    {category: 'Men', subCategory: 'Tops', subSubCategory: 'Tees', options: ['S', 'Green'], product: 'Atomic Endurance Running Tee (V-neck)', price: "$28.00"},
    {category: 'Men', subCategory: 'Bottoms', subSubCategory: 'Shorts', options: ['36', 'Green'], product: 'Meteor Workout Short', price: "$32.50"},
    {category: 'Women', subCategory: 'Tops', subSubCategory: 'Tees', options: ['M', 'Green'], product: 'Layla Tee', price: "$29.00"},
    {category: 'Women', subCategory: 'Tops', subSubCategory: 'Bras & Tanks', options: ['XS', 'Yellow'], product: 'Chloe Compete Tank', price: "$39.00"},
    {category: 'Women', subCategory: 'Tops', subSubCategory: 'Jackets', options: ['XS', 'Orange'], product: 'Inez Full Zip Jacket', price: "$59.00"}
]

function getRandomProduct() {
    return products[choose(Object.keys(products))]
}

/**********************************************************
 Second Version - Listing 4-5
 addToCart and CheckOut in two stories and inteleaving
 ***********************************************************/
const NUM_OF_SESSIONS = 2
const user = users[0]
for (let i = 0; i < NUM_OF_SESSIONS; i++) {
    story('Add to cart story #' + i, function () {
        with (new SeleniumSession().start(URL)) {
            login({user})
            let product = getRandomProduct()
            addToCart({product: product})
        }
    })
}

story('Checkout story', function () {
    with (new SeleniumSession().start(URL)) {
        login({user})
        checkOut({shippingMethod: 'Fixed'})
    }
})

//Try to bypass the '1st bug'
story('No checkout before adding to cart', function () {
    block(Any('Checkout'), function () {
        waitFor(Any('AddToCart'))

    })
})

