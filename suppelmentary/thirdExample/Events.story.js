/* @provengo summon selenium */

const URL = "http://localhost/"
//const URL = "https://magento2-demo.magebit.com/"
//const URL = "https://magento2-b2b.magebit.com/"

const NUM_OF_SESSIONS = 2
const NUM_OF_PROD = 3

/**********************************************************
 First Version - Listing 6-9
 addToCart and CheckOut with context
 ***********************************************************/

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

ctx.story('the Checkout','User.All',function (user) {
    with (new SeleniumSession(  ).start(URL)) {

        //Bypass the '1st bug' - the cart is not empty
        waitFor(Any("EndOfAction").and(Any({eventName: 'AddToCart'})).and(Any({user: user}))   )

        login({user: user})
        checkOut({shippingMethod: 'Fixed', user: user})
    }
})
