const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  // 1. Clean up database in reverse order of relationships
  console.log('Cleaning up existing database records...');
  await prisma.activityLog.deleteMany({});
  await prisma.temple.deleteMany({});
  await prisma.templeCategory.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});

  // 2. Create Roles
  console.log('Seeding roles...');
  const superAdminRole = await prisma.role.create({
    data: { id: 1, name: 'Super Admin' },
  });
  const adminRole = await prisma.role.create({
    data: { id: 2, name: 'Admin' },
  });
  const userRole = await prisma.role.create({
    data: { id: 3, name: 'User' },
  });

  // 3. Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 4. Create Users
  console.log('Seeding users...');
  const superAdmin = await prisma.user.create({
    data: {
      name: 'Atreal Super Admin',
      email: 'admin@teertha.com',
      password: hashedPassword,
      role_id: superAdminRole.id,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: 'Staff Administrator',
      email: 'staff@teertha.com',
      password: hashedPassword,
      role_id: adminRole.id,
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      name: 'Rahul Kumar',
      email: 'user@teertha.com',
      password: hashedPassword,
      role_id: userRole.id,
    },
  });

  // 5. Create Temple Categories
  console.log('Seeding categories...');
  const charDham = await prisma.templeCategory.create({
    data: {
      name: 'Char Dham',
      slug: 'char-dham',
      description: 'The four holy pilgrimage sites in India: Badrinath, Dwarka, Puri, and Rameswaram, representing the cardinal points of the country.',
    },
  });

  const jyotirlinga = await prisma.templeCategory.create({
    data: {
      name: 'Jyotirlinga',
      slug: 'jyotirlinga',
      description: 'The twelve sacred shrines dedicated to Lord Shiva, where he is worshipped in the form of a fiery column of light (Jyotirlinga).',
    },
  });

  const shaktiPeeth = await prisma.templeCategory.create({
    data: {
      name: 'Shakti Peeth',
      slug: 'shakti-peeth',
      description: 'Significant shrines and pilgrimage destinations in Shaktism, the goddess-focused Hindu tradition, marking where Sati\'s body parts fell.',
    },
  });

  const historic = await prisma.templeCategory.create({
    data: {
      name: 'Historic Temple',
      slug: 'historic',
      description: 'Architectural marvels and ancient temples that hold deep historical, cultural, and spiritual significance through centuries.',
    },
  });

  // 6. Create Temples
  console.log('Seeding temples...');
  await prisma.temple.create({
    data: {
      category_id: jyotirlinga.id,
      name: 'Kedarnath Temple',
      slug: 'kedarnath-temple',
      description: 'Located in the majestic Himalayas near the Mandakini river, Kedarnath Temple is one of the most sacred pilgrimage sites dedicated to Lord Shiva. Accessible only through a trek or helicopter service, it stands at an altitude of 3,583 meters and is part of the famous Chota Char Dham circuit. Built with heavy stone slabs on a rectangular platform, this ancient shrine is enveloped in snow for half the year.',
      location: 'Garhwal Himalayas, Rudraprayag, Uttarakhand',
      thumbnail: 'https://images.unsplash.com/photo-1626621422472-fe0cf6bbf451?auto=format&fit=crop&q=80&w=800',
      status: 'Active',
    },
  });

  await prisma.temple.create({
    data: {
      category_id: jyotirlinga.id,
      name: 'Kashi Vishwanath Temple',
      slug: 'kashi-vishwanath',
      description: 'Situated on the western bank of the holy river Ganga in Varanasi, the Kashi Vishwanath Temple is one of the twelve revered Jyotirlingas. Varanasi is widely considered the oldest living city in the world, and this temple is its spiritual core. The temple\'s gold-plated dome and spire shine brightly, hosting thousands of devotees daily who seek spiritual liberation (Moksha) at the feet of Lord Vishwanatha.',
      location: 'Varanasi, Uttar Pradesh',
      thumbnail: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
      status: 'Active',
    },
  });

  await prisma.temple.create({
    data: {
      category_id: charDham.id,
      name: 'Badrinath Temple',
      slug: 'badrinath-temple',
      description: 'Dedicated to Lord Vishnu (in the form of Badrinarayan), this vibrant, colorful temple is located along the Alaknanda River in the Chamoli district of Uttarakhand. Perched at an elevation of 3,133 meters, Badrinath is both a part of the major Char Dham and Chota Char Dham pilgrimages. The temple features a traditional stone facade and houses a self-manifested black stone (Shaligram) idol of Vishnu meditating.',
      location: 'Chamoli District, Uttarakhand',
      thumbnail: 'https://images.unsplash.com/photo-1624314144365-06a147051df1?auto=format&fit=crop&q=80&w=800',
      status: 'Active',
    },
  });

  await prisma.temple.create({
    data: {
      category_id: jyotirlinga.id,
      name: 'Somnath Temple',
      slug: 'somnath-temple',
      description: 'The Somnath Temple, located in Prabhas Patan on the western coast of Gujarat, is celebrated as the first among the twelve Jyotirlinga shrines of Lord Shiva. Known as "the Shrine Eternal," it has been destroyed and rebuilt multiple times throughout history, standing as a symbol of resilience and architectural splendor in the Chalukya style, directly overlooking the Arabian Sea.',
      location: 'Veraval, Gujarat',
      thumbnail: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=800',
      status: 'Active',
    },
  });

  await prisma.temple.create({
    data: {
      category_id: shaktiPeeth.id,
      name: 'Vaishno Devi Temple',
      slug: 'vaishno-devi',
      description: 'One of the most popular holy shrines in India, Vaishno Devi Temple is nestled in the Trikuta Mountains of Jammu & Kashmir. The shrine represents the goddess Vaishno Devi, an incarnation of Durga, worshipped in the form of three natural rock formations (Pindies) inside a cave. Millions of pilgrims undertake a scenic 12 km trek from Katra to reach this high-energy spiritual center.',
      location: 'Katra, Jammu and Kashmir',
      thumbnail: 'https://images.unsplash.com/photo-1596116250580-0a2b0bc235cf?auto=format&fit=crop&q=80&w=800',
      status: 'Active',
    },
  });

  await prisma.temple.create({
    data: {
      category_id: historic.id,
      name: 'Brihadeeswarar Temple',
      slug: 'brihadeeswarar-temple',
      description: 'An architectural masterpiece of the Chola dynasty, the Brihadeeswarar Temple (also known as the Big Temple) is located in Thanjavur, Tamil Nadu. Built by Emperor Raja Raja Chola I in 1010 AD, it is part of the Great Living Chola Temples UNESCO World Heritage Site. The temple boasts one of the tallest temple towers (Vimana) in the world, carved out of single granite blocks, radiating historical grandeur.',
      location: 'Thanjavur, Tamil Nadu',
      thumbnail: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800',
      status: 'Active',
    },
  });

  // 7. Seeding Activity Logs
  console.log('Seeding activity logs...');
  await prisma.activityLog.create({
    data: {
      user_id: superAdmin.id,
      action: 'System initialized and default roles/categories/temples seeded.',
    },
  });

  await prisma.activityLog.create({
    data: {
      user_id: superAdmin.id,
      action: 'Super Admin account created.',
    },
  });

  await prisma.activityLog.create({
    data: {
      user_id: admin.id,
      action: 'Staff Admin account created.',
    },
  });

  await prisma.activityLog.create({
    data: {
      user_id: normalUser.id,
      action: 'Registered new user account.',
    },
  });

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
