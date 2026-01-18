import { Request, Response, NextFunction } from 'express';
import client from '../config/weaviate';
import { classes } from '../models/WeaviateModels';

const getDataSafely = (response: any, className: string): any[] => {
  return response?.data?.Get?.[className] || [];
};

// Favicon & Logo
export const getFaviconLogo = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.FAVICON_LOGO)
      .withFields('faviconUrl logoUrl updatedAt _additional { id }')
      .do();

    const data = getDataSafely(response, classes.FAVICON_LOGO);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateFaviconLogo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { faviconUrl, logoUrl } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.FAVICON_LOGO)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.FAVICON_LOGO);
    const properties = {
      faviconUrl,
      logoUrl,
      updatedAt: new Date().toISOString()
    } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.FAVICON_LOGO)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.FAVICON_LOGO)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Favicon and logo updated' });
  } catch (error) {
    next(error);
  }
};

// Home Banner
export const getHomeBanner = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.HOME_BANNER)
      .withFields('bannerUrl title subtitle active _additional { id }')
      .do();

    const data = getDataSafely(response, classes.HOME_BANNER);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateHomeBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { bannerUrl, title, subtitle, active } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.HOME_BANNER)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.HOME_BANNER);
    const properties = { bannerUrl, title, subtitle, active: active !== false } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.HOME_BANNER)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.HOME_BANNER)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Home banner updated' });
  } catch (error) {
    next(error);
  }
};

// Watermark
export const getWatermark = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.WATERMARK)
      .withFields('enabled watermarkUrl text position opacity _additional { id }')
      .do();

    const data = getDataSafely(response, classes.WATERMARK);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateWatermark = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { enabled, watermarkUrl, text, position, opacity } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.WATERMARK)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.WATERMARK);
    const properties = { enabled, watermarkUrl, text, position, opacity: parseInt(opacity || '50') } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.WATERMARK)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.WATERMARK)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Watermark settings updated' });
  } catch (error) {
    next(error);
  }
};

// Field Configuration
export const getFieldConfig = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.FIELD_CONFIG)
      .withFields('fieldId fieldName enabled required _additional { id }')
      .do();

    res.status(200).json({ success: true, data: getDataSafely(response, classes.FIELD_CONFIG) });
  } catch (error) {
    next(error);
  }
};

export const updateFieldConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fields } = req.body;

    for (const field of fields) {
      const properties = {
        fieldId: field.fieldId,
        fieldName: field.fieldName,
        enabled: field.enabled,
        required: field.required
      } as Record<string, unknown>;

      await client.data.creator()
        .withClassName(classes.FIELD_CONFIG)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Field configuration updated' });
  } catch (error) {
    next(error);
  }
};

// Menu Configuration
export const getMenuConfig = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.MENU_CONFIG)
      .withFields('menuId menuName enabled order _additional { id }')
      .do();

    res.status(200).json({ success: true, data: getDataSafely(response, classes.MENU_CONFIG) });
  } catch (error) {
    next(error);
  }
};

export const updateMenuConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { menus } = req.body;

    for (const menu of menus) {
      const properties = {
        menuId: menu.menuId,
        menuName: menu.menuName,
        enabled: menu.enabled,
        order: menu.order || 0
      } as Record<string, unknown>;

      await client.data.creator()
        .withClassName(classes.MENU_CONFIG)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Menu configuration updated' });
  } catch (error) {
    next(error);
  }
};

// Profile ID Configuration
export const getProfileIdConfig = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.PROFILE_ID_CONFIG)
      .withFields('prefix startNumber format _additional { id }')
      .do();

    const data = getDataSafely(response, classes.PROFILE_ID_CONFIG);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateProfileIdConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prefix, startNumber, format } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.PROFILE_ID_CONFIG)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.PROFILE_ID_CONFIG);
    const properties = { prefix, startNumber: parseInt(startNumber), format } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.PROFILE_ID_CONFIG)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.PROFILE_ID_CONFIG)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Profile ID configuration updated' });
  } catch (error) {
    next(error);
  }
};

// Email Settings
export const getEmailSettings = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.EMAIL_SETTINGS)
      .withFields('smtpHost smtpPort smtpUser fromEmail fromName encryption _additional { id }')
      .do();

    const data = getDataSafely(response, classes.EMAIL_SETTINGS);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateEmailSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { smtpHost, smtpPort, smtpUser, smtpPassword, fromEmail, fromName, encryption } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.EMAIL_SETTINGS)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.EMAIL_SETTINGS);
    const properties = {
      smtpHost,
      smtpPort: parseInt(smtpPort),
      smtpUser,
      smtpPassword,
      fromEmail,
      fromName,
      encryption
    } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.EMAIL_SETTINGS)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.EMAIL_SETTINGS)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Email settings updated' });
  } catch (error) {
    next(error);
  }
};

// Basic Site Configuration
export const getBasicSiteConfig = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.BASIC_SITE_CONFIG)
      .withFields('timezone currency dateFormat allowRegistration emailVerification phoneVerification maxProfilePhotos minAge maxAge _additional { id }')
      .do();

    const data = getDataSafely(response, classes.BASIC_SITE_CONFIG);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateBasicSiteConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const config = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.BASIC_SITE_CONFIG)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.BASIC_SITE_CONFIG);
    const properties = {
      ...config,
      maxProfilePhotos: parseInt(config.maxProfilePhotos || '5'),
      minAge: parseInt(config.minAge || '18'),
      maxAge: parseInt(config.maxAge || '60')
    } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.BASIC_SITE_CONFIG)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.BASIC_SITE_CONFIG)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Basic site configuration updated' });
  } catch (error) {
    next(error);
  }
};

// Analytics Code
export const getAnalyticsCode = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.ANALYTICS_CODE)
      .withFields('googleAnalytics facebookPixel customCode _additional { id }')
      .do();

    const data = getDataSafely(response, classes.ANALYTICS_CODE);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateAnalyticsCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { googleAnalytics, facebookPixel, customCode } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.ANALYTICS_CODE)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.ANALYTICS_CODE);
    const properties = { googleAnalytics, facebookPixel, customCode } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.ANALYTICS_CODE)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.ANALYTICS_CODE)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Analytics code updated' });
  } catch (error) {
    next(error);
  }
};

// Social Media
export const getSocialMedia = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.SOCIAL_MEDIA)
      .withFields('facebook instagram twitter youtube linkedin _additional { id }')
      .do();

    const data = getDataSafely(response, classes.SOCIAL_MEDIA);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateSocialMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { facebook, instagram, twitter, youtube, linkedin } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.SOCIAL_MEDIA)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.SOCIAL_MEDIA);
    const properties = { facebook, instagram, twitter, youtube, linkedin } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.SOCIAL_MEDIA)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.SOCIAL_MEDIA)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'Social media links updated' });
  } catch (error) {
    next(error);
  }
};

// App Banner
export const getAppBanner = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.APP_BANNER)
      .withFields('enabled bannerUrl title description playStoreUrl appStoreUrl _additional { id }')
      .do();

    const data = getDataSafely(response, classes.APP_BANNER);
    res.status(200).json({ success: true, data: data[0] || null });
  } catch (error) {
    next(error);
  }
};

export const updateAppBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { enabled, bannerUrl, title, description, playStoreUrl, appStoreUrl } = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.APP_BANNER)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.APP_BANNER);
    const properties = { enabled, bannerUrl, title, description, playStoreUrl, appStoreUrl } as Record<string, unknown>;

    if (existingData[0]?._additional?.id) {
      await client.data.updater()
        .withClassName(classes.APP_BANNER)
        .withId(existingData[0]._additional.id)
        .withProperties(properties)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.APP_BANNER)
        .withProperties(properties)
        .do();
    }

    res.status(200).json({ success: true, message: 'App banner settings updated' });
  } catch (error) {
    next(error);
  }
};
