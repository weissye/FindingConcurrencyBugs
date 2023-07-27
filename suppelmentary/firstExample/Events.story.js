/* @provengo summon selenium */

const URL = "http://localhost/"
//const URL = "https://magento2-demo.magebit.com/"
//const URL = "https://magento2-b2b.magebit.com/"

const NUM_OF_PROD = 3
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
 First Version - Listing 3
 addToCart and CheckOut both in one story
 ***********************************************************/
users.forEach(user =>
    story('Story for ' + user.username, function () {
        with (new SeleniumSession().start(URL)) {
            login({user:user})
            let product = getRandomProduct()
            addToCart({product: product})
            checkOut({shippingMethod: 'Fixed'})
        }
    })
)

