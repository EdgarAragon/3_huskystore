import Stripe from "stripe";
import '../../../envConfig.js'

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY)

export async function GET() {
    try {
      const allProducts = [];
      const allPrices = [];
  
      // Paginate through all products
      let hasMoreProducts = true;
      let lastProductId = null;
  
      while (hasMoreProducts) {
        const response = await stripe.products.list({
          limit: 100,
          active: true,
          starting_after: lastProductId || undefined,
        });
  
        allProducts.push(...response.data);
        hasMoreProducts = response.has_more;
        if (hasMoreProducts) {
          lastProductId = response.data[response.data.length - 1].id;
        }
      }
  
      // Paginate through all prices
      let hasMorePrices = true;
      let lastPriceId = null;
  
      while (hasMorePrices) {
        const response = await stripe.prices.list({
          limit: 100,
          active: true,
          starting_after: lastPriceId || undefined,
        });
  
        allPrices.push(...response.data);
        hasMorePrices = response.has_more;
        if (hasMorePrices) {
          lastPriceId = response.data[response.data.length - 1].id;
        }
      }

      //
  
      // Combine products with their corresponding prices
      const combinedData = allProducts.map((product) => {
        const productPrices = allPrices.filter((price) => price.product === product.id);
  
        return {
          ...product,
          prices: productPrices.map((price) => ({
            id: price.id,
            unit_amount: price.unit_amount,
            currency: price.currency,
            recurring: price.recurring,
            // quantity: parseInt(product.metadata?.quantity ?? "1"),
          })) 
        };
      });

      return Response.json(combinedData);
    } catch (err) {
      console.error("Error fetching data from Stripe:", err.message);
      return Response.json({ error: "Failed to fetch data from Stripe" });
    }
  }
  

// export async function GET() {
//     try {

//     //fetch all the active products from Stripe
//     const products = await stripe.products.list({active: true})

//     //fetch all the prices that are active
//     const prices = await stripe.prices.list({ active: true })

//     //combine the products and their associated prices
//     const combinedData = products.data.map((product) => {
//         const productPrices = prices.data.filter((price) => {
//             return price.product === product.id
//         })

//         return {
//             ...product,
//             prices: productPrices.map((price) => {
//                 return {
//                     id: price.id,
//                     unit_amount: price.unit_amount,
//                     currency: price.currency,
//                     recurring: price.recurring
//                 }
//             })
//         }

//     })

//     //send the combined data as json
//     return Response.json(combinedData)


//     } catch (err) {
//         console.error('Error fetching data from Stripe: ', err.message)
//         return Response.json({error: 'Failed to fetch data from Stripe' })
//     }
// }