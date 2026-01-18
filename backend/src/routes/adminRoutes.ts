import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import * as siteSettingsController from '../controllers/siteSettingsController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Apply authentication middleware to all admin routes
router.use(authenticate);

// Form Data Routes
router.get('/form-data', adminController.getFormData);
router.post('/form-data', adminController.addFormData);

// Settings Routes
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

// Site Settings Sub-Routes
router.get('/settings/favicon-logo', siteSettingsController.getFaviconLogo);
router.put('/settings/favicon-logo', siteSettingsController.updateFaviconLogo);

router.get('/settings/home-banner', siteSettingsController.getHomeBanner);
router.put('/settings/home-banner', siteSettingsController.updateHomeBanner);

router.get('/settings/watermark', siteSettingsController.getWatermark);
router.put('/settings/watermark', siteSettingsController.updateWatermark);

router.get('/settings/fields', siteSettingsController.getFieldConfig);
router.put('/settings/fields', siteSettingsController.updateFieldConfig);

router.get('/settings/menu-items', siteSettingsController.getMenuConfig);
router.put('/settings/menu-items', siteSettingsController.updateMenuConfig);

router.get('/settings/profile-id', siteSettingsController.getProfileIdConfig);
router.put('/settings/profile-id', siteSettingsController.updateProfileIdConfig);

router.get('/settings/email', siteSettingsController.getEmailSettings);
router.put('/settings/email', siteSettingsController.updateEmailSettings);

router.get('/settings/basic-config', siteSettingsController.getBasicSiteConfig);
router.put('/settings/basic-config', siteSettingsController.updateBasicSiteConfig);

router.get('/settings/analytics', siteSettingsController.getAnalyticsCode);
router.put('/settings/analytics', siteSettingsController.updateAnalyticsCode);

router.get('/settings/social-media', siteSettingsController.getSocialMedia);
router.put('/settings/social-media', siteSettingsController.updateSocialMedia);

router.get('/settings/app-banner', siteSettingsController.getAppBanner);
router.put('/settings/app-banner', siteSettingsController.updateAppBanner);

// Members Routes
router.get('/members', adminController.getMembers);

// Matches Routes
router.get('/matches', adminController.getMatches);

// Membership Plans Routes
router.get('/membership-plans', adminController.getMembershipPlans);
router.post('/membership-plans', adminController.createMembershipPlan);

// Approvals Routes
router.get('/approvals', adminController.getApprovals);

// Advertisements Routes
router.get('/advertisements', adminController.getAdvertisements);
router.post('/advertisements', adminController.createAdvertisement);

// User Activity Routes
router.get('/user-activity', adminController.getUserActivity);

// Content Routes
router.get('/content', adminController.getContent);
router.post('/content', adminController.createContent);

// Email Templates Routes
router.get('/email-templates', adminController.getEmailTemplates);
router.post('/email-templates', adminController.createEmailTemplate);

// Contact Data Routes
router.get('/contact-data', adminController.getContactData);

// Member Report Routes
router.get('/member-report', adminController.getMemberReport);

// Payment Options Routes
router.get('/payment-options', adminController.getPaymentOptions);
router.post('/payment-options', adminController.createPaymentOption);

// Delete Route
router.delete('/:className/:id', adminController.deleteItem);

export default router;
