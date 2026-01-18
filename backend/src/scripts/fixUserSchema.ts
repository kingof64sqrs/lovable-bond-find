import client from '../config/weaviate';
import { classes } from '../models/WeaviateModels';

/**
 * This script fixes the User schema by deleting and recreating it
 * This is necessary when the schema is missing fields like 'role'
 */
const fixUserSchema = async () => {
  try {
    console.log('Checking User schema...');

    // Check if User class exists
    try {
      const schema = await client.schema.getter().do();
      const userClass = schema.classes?.find((c: any) => c.class === classes.USER);

      if (userClass) {
        console.log('Found existing User class. Checking for role field...');
        const hasRoleField = userClass.properties?.some((p: any) => p.name === 'role');

        if (!hasRoleField) {
          console.log('Role field is missing. Deleting and recreating User class...');

          // Delete the existing class
          await client.schema.classDeleter().withClassName(classes.USER).do();
          console.log('✓ Deleted old User class');

          // Recreate with correct schema
          await client.schema.classCreator().withClass({
            class: classes.USER,
            description: 'User authentication and account data',
            properties: [
              { name: 'name', dataType: ['string'], description: 'User full name' },
              { name: 'email', dataType: ['string'], description: 'User email (unique)' },
              { name: 'passwordHash', dataType: ['string'], description: 'Hashed password' },
              { name: 'role', dataType: ['string'], description: 'User role (user/admin)' },
              { name: 'gender', dataType: ['string'], description: 'User gender' },
              { name: 'profileFor', dataType: ['string'], description: 'Profile created for (self/son/daughter/etc)' },
              { name: 'profileComplete', dataType: ['boolean'], description: 'Profile completion status' },
              { name: 'verified', dataType: ['boolean'], description: 'Email verification status' },
              { name: 'active', dataType: ['boolean'], description: 'Account active status' },
              { name: 'createdAt', dataType: ['date'], description: 'Account creation date' },
              { name: 'lastLogin', dataType: ['date'], description: 'Last login timestamp' },
            ]
          }).do();
          console.log('✓ Created new User class with role field');
        } else {
          console.log('✓ User class already has role field');
        }
      } else {
        console.log('User class does not exist yet. It will be created during initialization.');
      }
    } catch (error: any) {
      console.error('Error checking schema:', error.message);
      throw error;
    }

    console.log('✓ User schema fix complete');
  } catch (error: any) {
    console.error('Error fixing User schema:', error.message);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  fixUserSchema()
    .then(() => {
      console.log('\n✓ Schema fix complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n✗ Schema fix failed:', error);
      process.exit(1);
    });
}

export default fixUserSchema;
