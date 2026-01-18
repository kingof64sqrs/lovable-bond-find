import client from '../config/weaviate';

export const classes = {
  ADMIN_FORM_DATA: 'AdminFormData',
  SITE_SETTINGS: 'SiteSettings',
  MEMBERS: 'Members',
  MATCHES: 'Matches',
  MEMBERSHIP_PLAN: 'MembershipPlan',
  APPROVALS: 'Approvals',
  ADVERTISEMENTS: 'Advertisements',
  USER_ACTIVITY: 'UserActivity',
  CONTENT: 'Content',
  EMAIL_TEMPLATE: 'EmailTemplate',
  PAYMENT_OPTION: 'PaymentOption',
  MEMBER_REPORT: 'MemberReport',
  CONTACT_DATA: 'ContactData',
  FAVICON_LOGO: 'FaviconLogo',
  HOME_BANNER: 'HomeBanner',
  WATERMARK: 'Watermark',
  FIELD_CONFIG: 'FieldConfig',
  MENU_CONFIG: 'MenuConfig',
  PROFILE_ID_CONFIG: 'ProfileIdConfig',
  EMAIL_SETTINGS: 'EmailSettings',
  BASIC_SITE_CONFIG: 'BasicSiteConfig',
  ANALYTICS_CODE: 'AnalyticsCode',
  SOCIAL_MEDIA: 'SocialMedia',
  APP_BANNER: 'AppBanner',
  RELIGION: 'Religion',
  CASTE: 'Caste',
  SUB_CASTE: 'SubCaste',
  GOTRA: 'Gotra',
  COUNTRY: 'Country',
  STATE: 'State',
  CITY: 'City',
  OCCUPATION: 'Occupation',
  EDUCATION: 'Education',
  MOTHER_TONGUE: 'MotherTongue',
  STAR: 'Star',
  RASI: 'Rasi',
  ANNUAL_INCOME: 'AnnualIncome',
  DOSH: 'Dosh',
} as const;

export interface PropertyDefinition {
  name: string;
  dataType: string[];
  description?: string;
}

export interface ClassDefinition {
  class: string;
  description: string;
  properties: PropertyDefinition[];
}

const classDefinitions: ClassDefinition[] = [
  {
    class: classes.ADMIN_FORM_DATA,
    description: 'Form submission data',
    properties: [
      { name: 'name', dataType: ['string'], description: 'Name of form submitter' },
      { name: 'email', dataType: ['string'], description: 'Email address' },
      { name: 'phone', dataType: ['string'], description: 'Phone number' },
      { name: 'submittedAt', dataType: ['date'], description: 'Submission timestamp' },
      { name: 'status', dataType: ['string'], description: 'Verification status' },
    ]
  },
  {
    class: classes.SITE_SETTINGS,
    description: 'Site configuration settings',
    properties: [
      { name: 'siteName', dataType: ['string'] },
      { name: 'siteEmail', dataType: ['string'] },
      { name: 'sitePhone', dataType: ['string'] },
      { name: 'supportEmail', dataType: ['string'] },
      { name: 'maintenanceMode', dataType: ['boolean'] },
      { name: 'maxProfileViews', dataType: ['int'] },
      { name: 'maxInterestsSent', dataType: ['int'] },
      { name: 'minAge', dataType: ['int'] },
      { name: 'maxAge', dataType: ['int'] },
      { name: 'verificationRequired', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.MEMBERS,
    description: 'Member information',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'email', dataType: ['string'] },
      { name: 'joinDate', dataType: ['date'] },
      { name: 'status', dataType: ['string'] },
      { name: 'plan', dataType: ['string'] },
    ]
  },
  {
    class: classes.MATCHES,
    description: 'Match information between users',
    properties: [
      { name: 'user1', dataType: ['string'] },
      { name: 'user2', dataType: ['string'] },
      { name: 'matchScore', dataType: ['number'] },
      { name: 'matchedAt', dataType: ['date'] },
      { name: 'status', dataType: ['string'] },
    ]
  },
  {
    class: classes.MEMBERSHIP_PLAN,
    description: 'Membership plan details',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'price', dataType: ['string'] },
      { name: 'features', dataType: ['string[]'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.APPROVALS,
    description: 'Approval queue for profiles/photos',
    properties: [
      { name: 'userName', dataType: ['string'] },
      { name: 'type', dataType: ['string'] },
      { name: 'submittedAt', dataType: ['date'] },
      { name: 'status', dataType: ['string'] },
    ]
  },
  {
    class: classes.ADVERTISEMENTS,
    description: 'Advertisement campaigns',
    properties: [
      { name: 'title', dataType: ['string'] },
      { name: 'url', dataType: ['string'] },
      { name: 'startDate', dataType: ['date'] },
      { name: 'endDate', dataType: ['date'] },
    ]
  },
  {
    class: classes.USER_ACTIVITY,
    description: 'User activity logs',
    properties: [
      { name: 'userName', dataType: ['string'] },
      { name: 'action', dataType: ['string'] },
      { name: 'details', dataType: ['text'] },
      { name: 'timestamp', dataType: ['date'] },
    ]
  },
  {
    class: classes.CONTENT,
    description: 'Content management items',
    properties: [
      { name: 'title', dataType: ['string'] },
      { name: 'category', dataType: ['string'] },
      { name: 'content', dataType: ['text'] },
      { name: 'status', dataType: ['string'] },
      { name: 'createdAt', dataType: ['date'] },
    ]
  },
  {
    class: classes.EMAIL_TEMPLATE,
    description: 'Email templates',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'subject', dataType: ['string'] },
      { name: 'body', dataType: ['text'] },
      { name: 'status', dataType: ['string'] },
    ]
  },
  {
    class: classes.PAYMENT_OPTION,
    description: 'Payment gateway configuration',
    properties: [
      { name: 'gateway', dataType: ['string'] },
      { name: 'apiKey', dataType: ['string'] },
      { name: 'enabled', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.MEMBER_REPORT,
    description: 'Member statistics and reports',
    properties: [
      { name: 'memberName', dataType: ['string'] },
      { name: 'joinDate', dataType: ['date'] },
      { name: 'plan', dataType: ['string'] },
      { name: 'status', dataType: ['string'] },
      { name: 'revenue', dataType: ['string'] },
    ]
  },
  {
    class: classes.CONTACT_DATA,
    description: 'Contact form submissions',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'email', dataType: ['string'] },
      { name: 'phone', dataType: ['string'] },
      { name: 'subject', dataType: ['string'] },
      { name: 'message', dataType: ['text'] },
      { name: 'submittedAt', dataType: ['date'] },
    ]
  },
  {
    class: classes.FAVICON_LOGO,
    description: 'Site favicon and logo settings',
    properties: [
      { name: 'faviconUrl', dataType: ['string'] },
      { name: 'logoUrl', dataType: ['string'] },
      { name: 'updatedAt', dataType: ['date'] },
    ]
  },
  {
    class: classes.HOME_BANNER,
    description: 'Homepage banner settings',
    properties: [
      { name: 'bannerUrl', dataType: ['string'] },
      { name: 'title', dataType: ['string'] },
      { name: 'subtitle', dataType: ['text'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.WATERMARK,
    description: 'Photo watermark configuration',
    properties: [
      { name: 'enabled', dataType: ['boolean'] },
      { name: 'watermarkUrl', dataType: ['string'] },
      { name: 'text', dataType: ['string'] },
      { name: 'position', dataType: ['string'] },
      { name: 'opacity', dataType: ['int'] },
    ]
  },
  {
    class: classes.FIELD_CONFIG,
    description: 'Profile field visibility configuration',
    properties: [
      { name: 'fieldId', dataType: ['string'] },
      { name: 'fieldName', dataType: ['string'] },
      { name: 'enabled', dataType: ['boolean'] },
      { name: 'required', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.MENU_CONFIG,
    description: 'Navigation menu item configuration',
    properties: [
      { name: 'menuId', dataType: ['string'] },
      { name: 'menuName', dataType: ['string'] },
      { name: 'enabled', dataType: ['boolean'] },
      { name: 'order', dataType: ['int'] },
    ]
  },
  {
    class: classes.PROFILE_ID_CONFIG,
    description: 'Profile ID generation settings',
    properties: [
      { name: 'prefix', dataType: ['string'] },
      { name: 'startNumber', dataType: ['int'] },
      { name: 'format', dataType: ['string'] },
    ]
  },
  {
    class: classes.EMAIL_SETTINGS,
    description: 'SMTP email configuration',
    properties: [
      { name: 'smtpHost', dataType: ['string'] },
      { name: 'smtpPort', dataType: ['int'] },
      { name: 'smtpUser', dataType: ['string'] },
      { name: 'smtpPassword', dataType: ['string'] },
      { name: 'fromEmail', dataType: ['string'] },
      { name: 'fromName', dataType: ['string'] },
      { name: 'encryption', dataType: ['string'] },
    ]
  },
  {
    class: classes.BASIC_SITE_CONFIG,
    description: 'Basic site configuration',
    properties: [
      { name: 'timezone', dataType: ['string'] },
      { name: 'currency', dataType: ['string'] },
      { name: 'dateFormat', dataType: ['string'] },
      { name: 'allowRegistration', dataType: ['boolean'] },
      { name: 'emailVerification', dataType: ['boolean'] },
      { name: 'phoneVerification', dataType: ['boolean'] },
      { name: 'maxProfilePhotos', dataType: ['int'] },
      { name: 'minAge', dataType: ['int'] },
      { name: 'maxAge', dataType: ['int'] },
    ]
  },
  {
    class: classes.ANALYTICS_CODE,
    description: 'Analytics and tracking codes',
    properties: [
      { name: 'googleAnalytics', dataType: ['text'] },
      { name: 'facebookPixel', dataType: ['text'] },
      { name: 'customCode', dataType: ['text'] },
    ]
  },
  {
    class: classes.SOCIAL_MEDIA,
    description: 'Social media profile links',
    properties: [
      { name: 'facebook', dataType: ['string'] },
      { name: 'instagram', dataType: ['string'] },
      { name: 'twitter', dataType: ['string'] },
      { name: 'youtube', dataType: ['string'] },
      { name: 'linkedin', dataType: ['string'] },
    ]
  },
  {
    class: classes.APP_BANNER,
    description: 'Mobile app download banner settings',
    properties: [
      { name: 'enabled', dataType: ['boolean'] },
      { name: 'bannerUrl', dataType: ['string'] },
      { name: 'title', dataType: ['string'] },
      { name: 'description', dataType: ['text'] },
      { name: 'playStoreUrl', dataType: ['string'] },
      { name: 'appStoreUrl', dataType: ['string'] },
    ]
  },
  {
    class: classes.RELIGION,
    description: 'Religion master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.CASTE,
    description: 'Caste master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'religionId', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.SUB_CASTE,
    description: 'Sub Caste master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'casteId', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.GOTRA,
    description: 'Gotra master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.COUNTRY,
    description: 'Country master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'code', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.STATE,
    description: 'State master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'countryId', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.CITY,
    description: 'City master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'stateId', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.OCCUPATION,
    description: 'Occupation master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.EDUCATION,
    description: 'Education master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.MOTHER_TONGUE,
    description: 'Mother Tongue master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.STAR,
    description: 'Star/Nakshatra master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.RASI,
    description: 'Rasi/Moonsign master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.ANNUAL_INCOME,
    description: 'Annual Income range master data',
    properties: [
      { name: 'range', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
  {
    class: classes.DOSH,
    description: 'Dosh master data',
    properties: [
      { name: 'name', dataType: ['string'] },
      { name: 'active', dataType: ['boolean'] },
    ]
  },
];

const createClassIfNotExists = async (classObj: ClassDefinition): Promise<void> => {
  try {
    // Try to create, handle duplicates gracefully
    try {
      await client.schema.classCreator().withClass(classObj).do();
      console.log(`✓ Created class: ${classObj.class}`);
    } catch (error: any) {
      if (error?.message?.includes('already exists') || error?.statusCode === 422) {
        console.log(`✓ Class already exists: ${classObj.class}`);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`Error with class ${classObj.class}:`, error instanceof Error ? error.message : error);
  }
};

export const initializeSchemas = async (): Promise<void> => {
  try {
    console.log('Initializing Weaviate schemas...');
    for (const classObj of classDefinitions) {
      await createClassIfNotExists(classObj);
    }
    console.log('✓ All Weaviate schemas initialized successfully');
  } catch (error) {
    console.error('Error initializing schemas:', error instanceof Error ? error.message : error);
  }
};
