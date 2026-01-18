import bcrypt from 'bcrypt';
import client from '../config/weaviate';
import { classes } from '../models/WeaviateModels';

const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@lovable.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    console.log('Checking for existing admin user...');

    // Check if admin already exists
    const existingAdmin = await client.graphql
      .get()
      .withClassName(classes.USER)
      .withFields('email role')
      .withWhere({
        path: ['email'],
        operator: 'Equal',
        valueString: adminEmail
      })
      .do();

    if (existingAdmin.data?.Get?.User?.length > 0) {
      console.log('✓ Admin user already exists');
      return;
    }

    console.log('Creating admin user...');

    // Hash password
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const result = await client.data
      .creator()
      .withClassName(classes.USER)
      .withProperties({
        name: 'Admin User',
        email: adminEmail,
        passwordHash,
        role: 'admin',
        gender: 'male',
        profileFor: 'self',
        profileComplete: true,
        verified: true,
        active: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      })
      .do();

    console.log('✓ Admin user created successfully');
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log(`  User ID: ${result.id}`);

  } catch (error: any) {
    console.error('Error creating admin user:', error.message);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  createAdminUser()
    .then(() => {
      console.log('\n✓ Admin user setup complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n✗ Admin user setup failed:', error);
      process.exit(1);
    });
}

export default createAdminUser;
