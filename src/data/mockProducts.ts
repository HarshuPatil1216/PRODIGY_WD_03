import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Organic Farm-Fresh Strawberries',
    category: 'Fresh Produce',
    price: 4.99,
    originalPrice: 6.50,
    unit: '400g pack',
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Organic', 'Local Farm', 'Top Seller'],
    farmOrigin: {
      name: 'Green Valley Organic Orchard',
      location: 'Sunny Slope Hills, 6 km away',
      distanceKm: 6,
      harvestTime: 'Harvested 5 hours ago',
      story: 'Family-run farm since 1988 using zero synthetic pesticides and 100% solar-powered irrigation.'
    },
    description: 'Sweet, juicy, sun-ripened strawberries hand-picked at peak ripeness. Packed with Vitamin C and antioxidant goodness for breakfast bowls, smoothies, or desserts.',
    nutritionInfo: {
      calories: '32 kcal / 100g',
      carbs: '7.7g',
      protein: '0.7g',
      fiber: '2.0g'
    },
    inStock: true,
    stockCount: 24,
    tags: ['Organic', 'Farm Fresh', 'Vegan', 'Superfood'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena Rostova',
        rating: 5,
        date: '2 days ago',
        comment: 'Unbelievably sweet! You can taste the difference compared to regular supermarket berries. Freshly delivered in under 40 mins.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Marcus Vance',
        rating: 5,
        date: '5 days ago',
        comment: 'Great packaging, no bruised berries. My kids devoured the pack in one sitting!',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Artisan Sourdough Boule',
    category: 'Bakery & Breads',
    price: 5.50,
    originalPrice: 6.00,
    unit: '650g loaf',
    rating: 4.8,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Fresh Baked', 'Local Bakery'],
    farmOrigin: {
      name: 'Old Mill Stoneground Bakery',
      location: 'Heritage District, 3 km away',
      distanceKm: 3,
      harvestTime: 'Baked fresh at 6:00 AM today',
      story: 'Fermented naturally for 36 hours using stone-ground heritage grains and local wild yeast culture.'
    },
    description: 'Crispy golden crust with a soft, chewy, open-crumb interior. Naturally fermented for high digestibility and deep flavorful tang.',
    nutritionInfo: {
      calories: '220 kcal / slice',
      carbs: '42g',
      protein: '8g',
      fiber: '3g'
    },
    inStock: true,
    stockCount: 12,
    tags: ['No Preservatives', 'Vegan', 'Stone Ground', 'Handcrafted'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Sarah Jenkins',
        rating: 5,
        date: 'Yesterday',
        comment: 'The crust crunch is perfection. Toasting a slice with local butter is heaven.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Grass-Fed A2 Whole Milk',
    category: 'Dairy & Eggs',
    price: 3.80,
    unit: '1 Litre Glass Bottle',
    rating: 4.9,
    reviewCount: 44,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['A2 Milk', 'Grass-Fed', 'Returnable Glass'],
    farmOrigin: {
      name: 'Sunny Acres Family Dairy',
      location: 'Oakridge Valley, 12 km away',
      distanceKm: 12,
      harvestTime: 'Bottled yesterday evening',
      story: 'Pasture-raised cows enjoying open green pastures year-round. Non-homogenized with rich cream top.'
    },
    description: 'Pure, unprocessed pasture milk in returnable eco-friendly glass bottles. Rich cream layer on top, naturally packed with calcium and protein.',
    nutritionInfo: {
      calories: '150 kcal / 250ml',
      carbs: '12g',
      protein: '8g',
      fiber: '0g'
    },
    inStock: true,
    stockCount: 18,
    tags: ['Grass-Fed', 'Eco Packaging', 'Zero Hormones', 'Rich Cream'],
    reviews: [
      {
        id: 'rev-4',
        author: 'David Kumar',
        rating: 5,
        date: '3 days ago',
        comment: 'Tastes like real milk from my childhood! Loving the glass bottle swap initiative.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Raw Unfiltered Wildflower Honey',
    category: 'Honey & Preserves',
    price: 8.90,
    originalPrice: 10.50,
    unit: '350g Glass Jar',
    rating: 5.0,
    reviewCount: 61,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['100% Pure', 'Raw & Unheated', 'Top Seller'],
    farmOrigin: {
      name: 'Pine Hill Apiaries',
      location: 'Pine Ridge Forest, 9 km away',
      distanceKm: 9,
      harvestTime: 'Extracted this week',
      story: 'Ethical beekeeping preserving indigenous bee colonies in untouched floral habitats.'
    },
    description: 'Raw, unheated, single-origin honey rich in natural enzymes, pollen, and floral floral notes. Perfect natural sweetener for teas, oats, and cheese pairings.',
    nutritionInfo: {
      calories: '60 kcal / tbsp',
      carbs: '17g',
      protein: '0g',
      fiber: '0g'
    },
    inStock: true,
    stockCount: 30,
    tags: ['Raw Honey', 'Gluten-Free', 'Superfood', 'Handcrafted'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Anita Desai',
        rating: 5,
        date: '4 days ago',
        comment: 'Fragrant floral notes and velvety texture. Great for sore throats or morning lemon water.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Pasture-Raised Free-Range Brown Eggs',
    category: 'Dairy & Eggs',
    price: 4.20,
    unit: 'Dozen (12 Eggs)',
    rating: 4.9,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Pasture-Raised', 'Soy-Free Feed'],
    farmOrigin: {
      name: 'Meadowland Free Farms',
      location: 'East Meadow Lane, 11 km away',
      distanceKm: 11,
      harvestTime: 'Collected yesterday',
      story: 'Hens roam freely on 20+ acres of organic grass, foraging bugs and natural seeds.'
    },
    description: 'Deep golden orange yolks with thick protective shells. High Omega-3 content from pastured diet.',
    nutritionInfo: {
      calories: '70 kcal / egg',
      carbs: '0.4g',
      protein: '6g',
      fiber: '0g'
    },
    inStock: true,
    stockCount: 15,
    tags: ['Pasture-Raised', 'High Omega-3', 'Farm Fresh'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Tom Harrison',
        rating: 5,
        date: '1 week ago',
        comment: 'The yolk color is incredible! Once you try pastured eggs, grocery store ones feel plain.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Cold-Pressed Extra Virgin Olive Oil',
    category: 'Local Pantry',
    price: 14.50,
    originalPrice: 16.00,
    unit: '500ml Dark Glass Bottle',
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Single Origin', 'First Cold Press'],
    farmOrigin: {
      name: 'Verdant Grove Estate',
      location: 'South Valley, 15 km away',
      distanceKm: 15,
      harvestTime: 'Pressed last month',
      story: 'Hand-picked olives pressed within 4 hours of harvest to lock in polyphenols and pepperiness.'
    },
    description: 'Bright green, peppery extra virgin olive oil with low acidity (<0.2%). Ideal for drizzling over fresh salads, sourdough bread dip, or finishing grilled veggies.',
    nutritionInfo: {
      calories: '120 kcal / tbsp',
      carbs: '0g',
      protein: '0g',
      fiber: '0g'
    },
    inStock: true,
    stockCount: 10,
    tags: ['Cold-Pressed', 'Keto', 'Vegan', 'Artisan'],
    reviews: [
      {
        id: 'rev-7',
        author: 'Chloe Bennet',
        rating: 5,
        date: '3 days ago',
        comment: 'Peppery kick on the throat that signals high quality antioxidants. Worth every penny.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Heirloom Vine-Ripe Tomatoes',
    category: 'Fresh Produce',
    price: 3.49,
    unit: '500g mix',
    rating: 4.7,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Organic', 'Heirloom Variety'],
    farmOrigin: {
      name: 'Sunray Organic Gardens',
      location: 'North Riverside, 5 km away',
      distanceKm: 5,
      harvestTime: 'Harvested this morning',
      story: 'Grown from non-GMO seeds passed down through generations for vibrant color and authentic flavor.'
    },
    description: 'Juicy colorful mix of Cherokee Purple, Brandywine, and Golden Jubilee heirlooms. Sweet, tangy, and bursting with real summer tomato fragrance.',
    nutritionInfo: {
      calories: '18 kcal / 100g',
      carbs: '3.9g',
      protein: '0.9g',
      fiber: '1.2g'
    },
    inStock: true,
    stockCount: 20,
    tags: ['Organic', 'Heirloom', 'Farm Fresh', 'Vegan'],
    reviews: [
      {
        id: 'rev-8',
        author: 'Julian Thorne',
        rating: 5,
        date: '4 days ago',
        comment: 'Made caprese salad with these and local mozzarella. Pure culinary perfection.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'Handcrafted Soy Wax Candle (Eucalyptus & Mint)',
    category: 'Artisan Crafts',
    price: 12.00,
    unit: '250g Jar (50 hr Burn)',
    rating: 4.9,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Hand poured', '100% Soy Wax'],
    farmOrigin: {
      name: 'Apothecary & Co. Studio',
      location: 'Downtown Craft Quarter, 2 km away',
      distanceKm: 2,
      harvestTime: 'Hand poured yesterday',
      story: 'Small batch artisan candle studio using 100% natural soy wax, cotton wicks, and pure essential oils.'
    },
    description: 'Clean-burning aromatherapy soy candle infused with invigorating eucalyptus, wild spearmint, and soft cedar notes. Non-toxic and soot-free.',
    inStock: true,
    stockCount: 8,
    tags: ['Handcrafted', 'Essential Oils', 'Eco-Friendly', 'Aromatherapy'],
    reviews: [
      {
        id: 'rev-9',
        author: 'Rebecca Lawson',
        rating: 5,
        date: '1 week ago',
        comment: 'Calming aroma fills the whole living room without being overpowering. Will buy again!',
        verified: true
      }
    ]
  },
  {
    id: 'prod-9',
    name: 'Small Batch Roasted Espresso Beans',
    category: 'Local Pantry',
    price: 11.00,
    originalPrice: 13.00,
    unit: '340g Whole Bean Bag',
    rating: 4.9,
    reviewCount: 47,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Fresh Roasted', 'Direct Trade'],
    farmOrigin: {
      name: 'Roastmasters Local Micro-Roastery',
      location: 'Railway District, 4 km away',
      distanceKm: 4,
      harvestTime: 'Roasted 2 days ago',
      story: 'Ethically sourced high-altitude Arabica beans micro-roasted weekly in small drum roasters.'
    },
    description: 'Notes of dark chocolate, toasted hazelnut, and brown sugar. Perfect for espresso machines, French press, or pour-overs.',
    nutritionInfo: {
      calories: '2 kcal / cup brewed',
      carbs: '0g',
      protein: '0g',
      fiber: '0g'
    },
    inStock: true,
    stockCount: 16,
    tags: ['Fresh Roasted', 'Direct Trade', 'Artisan', 'Whole Bean'],
    reviews: [
      {
        id: 'rev-10',
        author: 'Gareth Bell',
        rating: 5,
        date: 'Yesterday',
        comment: 'Fresh roast date printed right on the back! Amazing crema and rich taste.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-10',
    name: 'Artisanal Goat Cheese Log with Herbs',
    category: 'Dairy & Eggs',
    price: 6.80,
    unit: '200g Roll',
    rating: 4.8,
    reviewCount: 15,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Award Winning', 'Hand Crafted Cheese'],
    farmOrigin: {
      name: 'Highland Goat Creamery',
      location: 'Highland Foothills, 18 km away',
      distanceKm: 18,
      harvestTime: 'Handmade 3 days ago',
      story: 'Heritage goat breed raised on herbal hill pastures producing velvety, tangy milk.'
    },
    description: 'Creamy, tangy fresh goat cheese rolled in rosemary, thyme, and cracked black pepper. Perfect on crackers or warm crostini.',
    nutritionInfo: {
      calories: '75 kcal / 30g',
      carbs: '1g',
      protein: '5g',
      fiber: '0g'
    },
    inStock: true,
    stockCount: 9,
    tags: ['Artisan Cheese', 'Handcrafted', 'Low Lactose'],
    reviews: [
      {
        id: 'rev-11',
        author: 'Sophia Martinez',
        rating: 5,
        date: '5 days ago',
        comment: 'A staple on our weekend charcuterie board. Unbelievably smooth and herbal.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-11',
    name: 'Spiced Apple & Cinnamon Artisan Jam',
    category: 'Honey & Preserves',
    price: 5.90,
    unit: '280g Glass Jar',
    rating: 4.7,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Low Sugar', 'Small Batch'],
    farmOrigin: {
      name: 'Heritage Orchard Preserves',
      location: 'East Orchard Lane, 8 km away',
      distanceKm: 8,
      harvestTime: 'Cooked this week',
      story: 'Slow-cooked in copper kettles using local Honeycrisp apples and organic cane sugar.'
    },
    description: 'Chunky, fragrant apple preserve infused with Ceylon cinnamon, nutmeg, and a splash of lemon juice. Divine on warm scones or pancakes.',
    nutritionInfo: {
      calories: '35 kcal / tbsp',
      carbs: '9g',
      protein: '0g',
      fiber: '0.5g'
    },
    inStock: true,
    stockCount: 14,
    tags: ['Low Sugar', 'Vegan', 'Handcrafted'],
    reviews: [
      {
        id: 'rev-12',
        author: 'Lydia Sterling',
        rating: 4,
        date: '1 week ago',
        comment: 'Not overly sweet! Tastes like autumn in a jar.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-12',
    name: 'Hand-Woven Natural Jute Market Tote',
    category: 'Artisan Crafts',
    price: 18.50,
    originalPrice: 22.00,
    unit: '1 Heavy Duty Bag',
    rating: 4.9,
    reviewCount: 33,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Zero Waste', 'Artisan Fair Trade'],
    farmOrigin: {
      name: 'Local Women Weavers Co-op',
      location: 'Community Craft Hub, 1 km away',
      distanceKm: 1,
      harvestTime: 'Hand woven locally',
      story: 'Empowering local women artisans through sustainable hand-weaving crafts.'
    },
    description: 'Durable, waterproof cotton-lined natural jute tote bag with reinforced leather handles. Holds up to 15kg of fresh groceries.',
    inStock: true,
    stockCount: 7,
    tags: ['Zero Waste', 'Sustainable', 'Handcrafted', 'Fair Trade'],
    reviews: [
      {
        id: 'rev-13',
        author: 'Maya Lin',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Sturdy, chic, and eco-friendly! Fits all my weekend market haul easily.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-13',
    name: 'Fresh Crisp Hydroponic Butterhead Lettuce',
    category: 'Fresh Produce',
    price: 2.75,
    unit: '1 Head (Root-On)',
    rating: 4.8,
    reviewCount: 14,
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Hydroponic', 'Pesticide Free'],
    farmOrigin: {
      name: 'Urban Green Hydro-Farm',
      location: 'Westside Indoor Farm, 3 km away',
      distanceKm: 3,
      harvestTime: 'Harvested with roots live',
      story: 'Uses 95% less water than soil farming. Harvested live with roots attached for week-long kitchen freshness.'
    },
    description: 'Tender, sweet butterhead lettuce leaves with living roots intact. Stays fresh in water in your fridge for up to 10 days.',
    nutritionInfo: {
      calories: '15 kcal / 100g',
      carbs: '2.9g',
      protein: '1.4g',
      fiber: '1.1g'
    },
    inStock: true,
    stockCount: 25,
    tags: ['Hydroponic', 'Pesticide Free', 'Farm Fresh', 'Vegan'],
    reviews: [
      {
        id: 'rev-14',
        author: 'Kevin O’Connor',
        rating: 5,
        date: '3 days ago',
        comment: 'Keeping it with roots in water keeps it super crisp for days!',
        verified: true
      }
    ]
  },
  {
    id: 'prod-14',
    name: 'Flaky Almond Croissants (2 Pack)',
    category: 'Bakery & Breads',
    price: 6.20,
    unit: '2 Large Croissants',
    rating: 5.0,
    reviewCount: 40,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['French Butter', 'Baked Daily'],
    farmOrigin: {
      name: 'Old Mill Stoneground Bakery',
      location: 'Heritage District, 3 km away',
      distanceKm: 3,
      harvestTime: 'Baked fresh at 6:30 AM today',
      story: 'Laminated by hand with pure grass-fed butter, filled with rich frangipane almond cream.'
    },
    description: 'Buttery, golden, multi-layered croissants filled with rich almond cream and topped with toasted sliced almonds and powdered sugar.',
    nutritionInfo: {
      calories: '380 kcal / piece',
      carbs: '38g',
      protein: '7g',
      fiber: '2g'
    },
    inStock: true,
    stockCount: 8,
    tags: ['Fresh Baked', 'Handcrafted', 'Pastry'],
    reviews: [
      {
        id: 'rev-15',
        author: 'Isabella Rossi',
        rating: 5,
        date: 'Yesterday',
        comment: 'Warm them up for 3 minutes in an air fryer — unbelievable bakery quality delivered right home!',
        verified: true
      }
    ]
  },
  {
    id: 'prod-15',
    name: 'Stone-Ground Himalayan Pink Salt Rub',
    category: 'Local Pantry',
    price: 4.80,
    unit: '180g Glass Shaker',
    rating: 4.6,
    reviewCount: 11,
    image: 'https://images.unsplash.com/photo-1518110168401-f2877ee2c88c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518110168401-f2877ee2c88c?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Mineral Rich', '100% Natural'],
    farmOrigin: {
      name: 'Spice Artisan Lab',
      location: 'Old Town Market, 2 km away',
      distanceKm: 2,
      harvestTime: 'Blended this week',
      story: 'Hand blended with local organic herbs including garlic flakes, rosemary, and smoked paprika.'
    },
    description: 'Versatile seasoning rub with mineral-rich pink salt, cracked black pepper, organic garlic, and dried rosemary. Enhances grilled veggies, meats, and roast potatoes.',
    inStock: true,
    stockCount: 22,
    tags: ['Mineral Rich', 'Keto', 'Vegan', 'Handcrafted'],
    reviews: [
      {
        id: 'rev-16',
        author: 'Nathan Blake',
        rating: 5,
        date: '6 days ago',
        comment: 'Adds an awesome depth of flavor to roasted vegetables!',
        verified: true
      }
    ]
  },
  {
    id: 'prod-16',
    name: 'Fresh Organic Basil & Tomato Pesto',
    category: 'Local Pantry',
    price: 6.50,
    unit: '200g Fresh Tub',
    rating: 4.9,
    reviewCount: 26,
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Freshly Made', 'No Additives'],
    farmOrigin: {
      name: 'Green Valley Organic Orchard',
      location: 'Sunny Slope Hills, 6 km away',
      distanceKm: 6,
      harvestTime: 'Prepared this morning',
      story: 'Made with freshly clipped Genovese basil, pine nuts, aged parmesan, and cold pressed olive oil.'
    },
    description: 'Vibrant, fragrant green pesto packed with sweet basil, roasted pine nuts, extra virgin olive oil, garlic, and freshly grated Parmigiano-Reggiano.',
    nutritionInfo: {
      calories: '110 kcal / 20g',
      carbs: '1g',
      protein: '2g',
      fiber: '0.5g'
    },
    inStock: true,
    stockCount: 11,
    tags: ['Fresh Made', 'Organic', 'No Preservatives', 'Keto'],
    reviews: [
      {
        id: 'rev-17',
        author: 'Clara Oswald',
        rating: 5,
        date: '2 days ago',
        comment: 'So much brighter and fresher than jarred store pestos. Tossed with pasta for a 10 min meal!',
        verified: true
      }
    ]
  }
];
