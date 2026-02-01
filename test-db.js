const { PrismaClient } = require('@prisma/client');

async function testDb() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    const products = await prisma.product.findMany();
    console.log(`Found ${products.length} products in database`);
    
    if (products.length > 0) {
      console.log('First product:', products[0]);
    }
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDb();