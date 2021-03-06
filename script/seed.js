const db = require('../server/db')
const {Spoon, User, Order, SpoonOrder} = require('../server/db/models')

const anHourFromNow = new Date(Date.now() + 60 * (60 * 1000)).toString()

const users = [
  {
    name: 'Karle Moodies',
    address: '756 Spoon Ave',
    email: 'i_love_spoons@gmail.com',
    password: '12345'
  },
  {
    name: 'Cindiaria Tyelsif',
    address: '756 Woodbond Ln',
    email: 'spoon_fantatic@gmail.com',
    password: '12345'
  },
  {
    name: 'Happy Happiness',
    address: '23448 Neverfield Rd',
    email: 'crazyspoon@gmail.com',
    password: '12345'
  },
  {
    name: 'Doing Great Thank you',
    address: '994443 College St',
    email: 'luv2spoon@gmail.com',
    password: '12345'
  },
  {
    name: 'Love My Life',
    address: '474 Archway Pk',
    email: 'iwantspoons@gmail.com',
    password: '12345',
    isAdmin: true
  }
]

const brands = [
  'IKEA',
  'Falalala',
  'Ceramica',
  'Crusty',
  'Crate & Barrel',
  'Square',
  'Milkbar',
  'Ladelmate',
  'Sporker',
  'Matchaful',
  'SLX',
  'Fishpond',
  'Baromone',
  'Star',
  'Joom',
  'Webstaraunt',
  'Spoontacular'
]

const nameWords = [
  'Blue',
  'Spoon',
  'Cute',
  'Bright',
  'Moon',
  'Whole',
  'Full',
  'Squirrel',
  'Bird',
  'Golden',
  'Hour',
  'Soft',
  'Horizon',
  'Special',
  'Gourmet',
  'Incredible',
  'Simple',
  'Bliss',
  'Nourish',
  'Well',
  'Scooper',
  'Fairy',
  'Sporty',
  'Funky',
  'Spoony',
  'Spoonerism',
  'Ladle',
  'Soup',
  'Rounded',
  'Scoop',
  'Stir',
  'Serve',
  'Carver'
]

function generateRandomName(nameArr) {
  let name = ''
  let finish = Math.ceil(Math.random() * 3)
  for (let i = 0; i < finish; i++) {
    name += `${nameArr[Math.floor(Math.random() * nameArr.length)]} `
  }
  return name
}

const materials = [
  'Plastic',
  'Stainless Steel',
  'Ceramic',
  'Copper',
  'Silicone',
  'Wood'
]

const categories = [
  'Dining',
  'Kitchen',
  'Dessert',
  'Soup',
  'Travel',
  'Barista',
  'Slotted',
  'Restaurant',
  'Novelty'
]

const imageUrls = [
  'https://images.replacements.com/cdn-cgi/image/format=auto,width=555px/https://images.replacements.com/images/images1/flatware/I/P0000339625S0011T1.jpg',
  'https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw16c1edcd/productimages/901969DT01VAR0039908-901969US01VAR0040346-BI-1.jpg?sw=450&sh=450&sm=fit',
  'https://cdn.shopify.com/s/files/1/0552/3117/products/bspink.jpg?v=1571439120',
  'https://img.joomcdn.net/34b8d54a59862d4214e60ed770327086ddd3ca4c_400_400.jpeg',
  'https://ae01.alicdn.com/kf/H59e205ec163a48b68f146a08572add4a8/Stainless-Steel-Spoon-Gifts-Beautiful-Korean-Spoon-Long-Handle-Spoon-Stir-Drinking-Home-Kitchen-Dessert-Milk.jpeg',
  'https://i2.wp.com/ae01.alicdn.com/kf/HLB1qw1GX5frK1RjSspbxh74pFXau/1pcs-Thicken-Stainless-Steel-Long-Handle-Ladle-Spoon-Big-Soup-Ladle-Useful-Kitchen-Cooking-Tool-Utensil.jpeg?fit=600%2C600&ssl=1',
  'https://cdn.chv.me/images/thumbnails/Stainless-Steel-Spoon-Fork-ZtLv5AXw.jpeg.thumb_800x800.jpg',
  'https://cdn.shopify.com/s/files/1/0898/3392/products/31X_2BDxVW3CL_1080x.jpeg?v=1449438395',
  'https://www.slx-hospitality.com/app/uploads/2016/09/53481.jpeg',
  'https://cdn-o.fishpond.com/0192/320/731/869833523/original.jpeg',
  'https://cdnimg.webstaurantstore.com/images/products/extra_large/525451/1951622.jpg',
  'https://cdn.shopify.com/s/files/1/0384/9722/2787/products/product-image-1321668478_530x@2x.jpg?v=1586858573',
  'https://img.joomcdn.net/99aa39d5b31f6ce65d1f6d1b94a1dcbe7145bab1_original.jpeg',
  'https://www.zoro.com/static/cms/product/full/Z30O-xfo5oy.JPG'
]

const spoons = [
  {
    brand: 'IKEA',
    name: 'Ajaaka',
    material: 'Stainless Steel',
    category: 'Dining',
    description: 'Your standard spoon',
    price: 900,
    imageUrl:
      'https://images.replacements.com/cdn-cgi/image/format=auto,width=555px/https://images.replacements.com/images/images1/flatware/I/P0000339625S0011T1.jpg'
  },
  {
    brand: 'Falalala',
    name: 'Lamp',
    material: 'Plastic',
    category: 'Dining',
    description: 'You definitely want one',
    price: 800,
    imageUrl:
      'https://www.davidstea.com/dw/image/v2/BBXZ_PRD/on/demandware.static/-/Sites-davidstea-master-catalog/default/dw16c1edcd/productimages/901969DT01VAR0039908-901969US01VAR0040346-BI-1.jpg?sw=450&sh=450&sm=fit'
  },
  {
    brand: 'Ceramica',
    name: 'Sawdust',
    material: 'Ceramic',
    category: 'Dining',
    description: 'Handmade ceramic dining spoon.',
    price: 1200,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0552/3117/products/bspink.jpg?v=1571439120'
  },
  {
    brand: 'Crusty',
    name: 'Spoonerism',
    material: 'Stainless Steel',
    category: 'Kitchen',
    description: 'Big scooping spoon',
    price: 800,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0552/3117/products/bspink.jpg?v=1571439120'
  },
  {
    brand: 'Square',
    name: 'Noam Spoonsky',
    material: 'Stainless Steel',
    category: 'Kitchen',
    description: 'A spoon and a shovel',
    price: 600,
    imageUrl:
      'https://img.joomcdn.net/34b8d54a59862d4214e60ed770327086ddd3ca4c_400_400.jpeg'
  },
  {
    brand: 'Milk bar',
    name: 'Milky baby',
    material: 'Copper',
    category: 'Dessert',
    description: 'Fancy ice cream spoon',
    price: 700,
    imageUrl:
      'https://ae01.alicdn.com/kf/H59e205ec163a48b68f146a08572add4a8/Stainless-Steel-Spoon-Gifts-Beautiful-Korean-Spoon-Long-Handle-Spoon-Stir-Drinking-Home-Kitchen-Dessert-Milk.jpeg'
  },
  {
    brand: 'Ladelmate',
    name: 'Soup genius',
    material: 'Silicone',
    category: 'Soup',
    description: 'Big spoon for like soup and stuff',
    price: 500,
    imageUrl:
      'https://i2.wp.com/ae01.alicdn.com/kf/HLB1qw1GX5frK1RjSspbxh74pFXau/1pcs-Thicken-Stainless-Steel-Long-Handle-Ladle-Spoon-Big-Soup-Ladle-Useful-Kitchen-Cooking-Tool-Utensil.jpeg?fit=600%2C600&ssl=1'
  },
  {
    brand: 'Sporker',
    name: 'Sporky the pig',
    material: 'Stainless Steel',
    category: 'Travel',
    description: 'Dual edged utensil for scooping or sticking',
    price: 1000,
    imageUrl:
      'https://cdn.chv.me/images/thumbnails/Stainless-Steel-Spoon-Fork-ZtLv5AXw.jpeg.thumb_800x800.jpg'
  },
  {
    brand: 'Matchaful',
    name: 'Cottage culture',
    material: 'Stainless Steel',
    category: 'Barista',
    description: 'Perfect portions for matcha and tea',
    price: 400,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0898/3392/products/31X_2BDxVW3CL_1080x.jpeg?v=1449438395'
  },
  {
    brand: 'SLX',
    name: 'Netti',
    material: 'Stainless Steel',
    category: 'Slotted',
    description: 'You know, so you can strain what you are scooping',
    price: 1100,
    imageUrl: 'https://www.slx-hospitality.com/app/uploads/2016/09/53481.jpeg'
  },
  {
    brand: 'Fishpond',
    name: 'Siren',
    material: 'Stainless Steel',
    category: 'Barista',
    description: 'Mermaid machiatto spoon!',
    price: 4500,
    imageUrl: 'https://cdn-o.fishpond.com/0192/320/731/869833523/original.jpeg'
  },
  {
    brand: 'Baromone',
    name: 'Bar-bara',
    material: 'Stainless steel',
    category: 'Restaraunt',
    description: 'Threaded bar spoon for all of your cocktail hours',
    price: 900,
    imageUrl:
      'https://cdnimg.webstaurantstore.com/images/products/extra_large/525451/1951622.jpg'
  },
  {
    brand: 'Star',
    name: 'Spoon Lightyear',
    material: 'Stainless Steel',
    category: 'Novelty',
    description: 'Beat your cat to polluting your beverages with this spoon!',
    price: 800,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0384/9722/2787/products/product-image-1321668478_530x@2x.jpg?v=1586858573'
  },
  {
    brand: 'Joom',
    name: 'Bloom',
    material: 'Stainless Steel',
    category: 'Barista',
    description: 'Gold, stainless steel coffee spoon',
    price: 1300,
    imageUrl:
      'https://img.joomcdn.net/99aa39d5b31f6ce65d1f6d1b94a1dcbe7145bab1_original.jpeg'
  },
  {
    brand: 'Webstaraunt',
    name: 'Splinter',
    material: 'Wood',
    category: 'Kitchen',
    description: 'If grandma has it in her hand, run!',
    price: 700,
    imageUrl: 'https://www.zoro.com/static/cms/product/full/Z30O-xfo5oy.JPG'
  }
]

let orders = [
  {
    id: 1,
    status: false,
    userId: 4
  },
  {
    id: 2,
    status: false,
    userId: 2
  },
  {
    id: 3,
    status: false,
    userId: 5
  },
  {
    id: 4,
    status: false,
    userId: 3
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    const customers = await Promise.all(
      users.map(user =>
        User.create({
          name: user.name,
          address: user.address,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin
        })
      )
    )

    const spoonInfo = await Promise.all(
      spoons.map(spoon =>
        Spoon.create({
          brand: spoon.brand,
          name: spoon.name,
          material: spoon.material,
          category: spoon.category,
          description: spoon.description,
          price: spoon.price,
          imageUrl: spoon.imageUrl
        })
      )
    )
    const fakeOrder = await Promise.all(
      orders.map(order =>
        Order.create({
          status: order.status,
          userId: order.userId
        })
      )
    )

    for (let i = 0; i < 85; i++) {
      await Spoon.create({
        brand: brands[Math.floor(Math.random() * brands.length)],
        name: generateRandomName(nameWords),
        material: materials[Math.floor(Math.random() * materials.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        description: 'A very useful spoon',
        price: Math.floor(Math.random() * 5000),
        imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
      })
    }

    await fakeOrder[0].addSpoon(spoonInfo[0], {through: {quantity: 4}})
    await fakeOrder[0].addSpoon(spoonInfo[8], {through: {quantity: 5}})
    await fakeOrder[0].addSpoon(spoonInfo[7], {through: {quantity: 19}})
    await fakeOrder[0].addSpoon(spoonInfo[6], {through: {quantity: 13}})
    await fakeOrder[2].addSpoon(spoonInfo[3], {through: {quantity: 3}})
    await fakeOrder[0].addSpoon(spoonInfo[11], {through: {quantity: 4}})
    await fakeOrder[0].addSpoon(spoonInfo[12], {through: {quantity: 4}})
    await fakeOrder[1].addSpoon(spoonInfo[5], {through: {quantity: 4}})
    await fakeOrder[2].addSpoon(spoonInfo[5], {through: {quantity: 4}})
    await fakeOrder[3].addSpoon(spoonInfo[5], {through: {quantity: 4}})

    // seed your database here!
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!')
      db.close()
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
      db.close()
    })
}
