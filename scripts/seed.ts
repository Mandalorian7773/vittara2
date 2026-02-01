import prisma from '../src/lib/prisma';

async function seedDatabase() {
  try {
    // Clear existing data
    await prisma.review.deleteMany({});
    await prisma.variant.deleteMany({});
    await prisma.product.deleteMany({});

    // Create sample products
    const productsData = [
      {
        name: "Pearled Ivory White pantenga",
        description: "Exquisite ivory white pantenga crafted with premium silk fabric for elegant occasions.",
        price: 12999,
        image: "/images/new-collection/Pant 11/pant1.jpg",
        variants: [
          { size: "S", stock: 5, color: "#9C7C5C" },
          { size: "M", stock: 8, color: "#9C7C5C" },
          { size: "L", stock: 3, color: "#9C7C5C" },
        ]
      },
      {
        name: "Blue Elegance pantenga",
        description: "Stunning blue pantenga made with comfortable cotton blend fabric.",
        price: 7999,
        image: "/images/new-collection/Pant 11/pant2.png",
        variants: [
          { size: "S", stock: 7, color: "#1C3A63" },
          { size: "M", stock: 10, color: "#1C3A63" },
          { size: "L", stock: 5, color: "#1C3A63" },
        ]
      },
      {
        name: "Wine Hued Elegance pantenga",
        description: "Sophisticated wine-colored pantenga with premium net fabric.",
        price: 7999,
        image: "/images/new-collection/Pant 11/pant3.jpg",
        variants: [
          { size: "M", stock: 6, color: "#4B1F3A" },
          { size: "L", stock: 4, color: "#4B1F3A" },
          { size: "XL", stock: 9, color: "#4B1F3A" },
        ]
      },
      {
        name: "Beige Cream Sitara pantenga",
        description: "Luxurious beige cream pantenga with silk finish for premium feel.",
        price: 14999,
        image: "/images/new-collection/Pant 11/pant4.jpg",
        variants: [
          { size: "S", stock: 3, color: "#D9C9B0" },
          { size: "L", stock: 7, color: "#D9C9B0" },
          { size: "XL", stock: 2, color: "#D9C9B0" },
        ]
      },
      {
        name: "Classic Ivory Gurkha",
        description: "Timeless ivory gurkha pants with traditional craftsmanship and modern fit.",
        price: 12499,
        image: "/images/new-collection/Pant 22/p1.png",
        variants: [
          { size: "M", stock: 8, color: "#F5F5DC" },
          { size: "L", stock: 5, color: "#F5F5DC" },
          { size: "XL", stock: 4, color: "#F5F5DC" },
        ]
      },
      {
        name: "Navy Sharp Gurkha",
        description: "Sharp navy gurkha pants with wool blend fabric for formal occasions.",
        price: 13999,
        image: "/images/new-collection/Pant 22/p2.png",
        variants: [
          { size: "L", stock: 6, color: "#000080" },
          { size: "XL", stock: 3, color: "#000080" },
        ]
      },
      {
        name: "Classic White Linen Shirt",
        description: "Premium white linen shirt perfect for summer wear with breathable fabric.",
        price: 4999,
        image: "/images/new-collection/Shirts/shirt1.jpg",
        variants: [
          { size: "S", stock: 10, color: "#FFFFFF" },
          { size: "M", stock: 12, color: "#FFFFFF" },
          { size: "L", stock: 8, color: "#FFFFFF" },
          { size: "XL", stock: 5, color: "#FFFFFF" },
        ]
      },
      {
        name: "Navy Blue Formal Shirt",
        description: "Elegant navy blue formal shirt with premium cotton fabric.",
        price: 5499,
        image: "/images/new-collection/Shirts/shirt2.jpg",
        variants: [
          { size: "M", stock: 7, color: "#000080" },
          { size: "L", stock: 9, color: "#000080" },
          { size: "XL", stock: 6, color: "#000080" },
        ]
      },
      {
        name: "Sky Blue Casual Shirt",
        description: "Light sky blue casual shirt with comfortable cotton blend.",
        price: 4499,
        image: "/images/new-collection/Shirts/shirt3.png",
        variants: [
          { size: "S", stock: 5, color: "#87CEEB" },
          { size: "M", stock: 8, color: "#87CEEB" },
          { size: "L", stock: 4, color: "#87CEEB" },
        ]
      },
      {
        name: "Black Satin Party Shirt",
        description: "Lustrous black satin shirt for party occasions with elegant finish.",
        price: 6999,
        image: "/images/new-collection/Shirts/shirt4.png",
        variants: [
          { size: "S", stock: 3, color: "#000000" },
          { size: "M", stock: 6, color: "#000000" },
          { size: "L", stock: 7, color: "#000000" },
        ]
      }
    ];

    for (const productData of productsData) {
      const product = await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image: productData.image,
          variants: {
            create: productData.variants
          }
        }
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();