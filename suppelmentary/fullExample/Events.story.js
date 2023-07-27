/* @provengo summon selenium */

const URL = "http://localhost/"
//const URL = "https://magento2-demo.magebit.com/"
//const URL = "https://magento2-b2b.magebit.com/"

const NUM_OF_SESSIONS = 2
const NUM_OF_PROD = 3

for (let i = 0; i < NUM_OF_SESSIONS; i++) {
    ctx.story('Add to cart'+i, 'User.All', function (user) {
        with (new SeleniumSession().start(URL)) {
            login({user: user})
            for (let j = 0; j < NUM_OF_PROD; j++) {
                let product = getRandomProduct()
                addToCart({product: product, user: user})
            }
        }
    })
}

story('Admin activities',function () {
    with (new SeleniumSession().start(URL+'admin')) {
        ctx.story('Change product price by admin','User.Admin',function (user) {
            adminLogin({user: user})
            changeProductPrice({product: {options: ['XS', 'Yellow'], product: 'Chloe Compete Tank', newPrice: 52}})
        })
        ctx.story('Add product by admin','User.Admin',function (user) {
            adminLogin({user: user})
            addProduct({product:
                    {category: "Men", subCategory: "Tops", subSubCategory: "Tees",
                        options: ['XS', 'Yellow'], name: 'Tee shirt', sku: 'test-men-top-tee-XS-Yellow', price: 27, qty: 50}})
        })
    }
})
ctx.story('Check price', 'User.All', function (user) {
    with (new SeleniumSession().start(URL)) {
        login({user: user})
        for (let j = 0; j < NUM_OF_PROD; j++) {
            let product = getRandomProduct()
            checkPrice({product: product})
        }
    }
})

ctx.story('the Checkout','User.All',function (user) {
    with (new SeleniumSession(  ).start(URL)) {

        waitFor(Any("EndOfAction").and(Any({eventName: 'AddToCart'})).and(Any({user: user}))   )
        // waitFor(Any('AddToCart'))
        // bp.log.info("//checkout "+user.username)
        login({user: user})
        checkOut({shippingMethod: 'Fixed', user: user})
    }
})


