import { Request, Response, NextFunction } from 'express';
import client from '../config/weaviate';
import { classes } from '../models/WeaviateModels';

type FormDataBody = {
  name: string;
  email: string;
  phone: string;
  status?: string;
};

type SettingsBody = Record<string, unknown>;

const getDataSafely = (response: any, className: string): any[] => {
  return response?.data?.Get?.[className] || [];
};

// Form Data Controller
export const getFormData = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.ADMIN_FORM_DATA)
      .withFields('name email phone submittedAt status _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.ADMIN_FORM_DATA)
    });
  } catch (error) {
    next(error);
  }
};

export const addFormData = async (
  req: Request<any, any, FormDataBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, status } = req.body;

    const response = await client.data.creator()
      .withClassName(classes.ADMIN_FORM_DATA)
      .withProperties({
        name,
        email,
        phone,
        status: status || 'pending',
        submittedAt: new Date().toISOString()
      } as Record<string, unknown>)
      .do();

    res.status(201).json({
      success: true,
      message: 'Form data added successfully',
      data: response
    });
  } catch (error) {
    next(error);
  }
};

// Settings Controller
export const getSettings = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.SITE_SETTINGS)
      .withFields('siteName siteEmail sitePhone supportEmail maintenanceMode maxProfileViews maxInterestsSent minAge maxAge verificationRequired _additional { id }')
      .do();

    const data = getDataSafely(response, classes.SITE_SETTINGS);
    res.status(200).json({
      success: true,
      data: data.length > 0 ? data[0] : null
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (
  req: Request<any, any, SettingsBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const settings = req.body;

    const getResponse = await client.graphql.get()
      .withClassName(classes.SITE_SETTINGS)
      .withFields('_additional { id }')
      .do();

    const existingData = getDataSafely(getResponse, classes.SITE_SETTINGS);
    const existingId = existingData[0]?._additional?.id;

    if (existingId) {
      await client.data.updater()
        .withClassName(classes.SITE_SETTINGS)
        .withId(existingId)
        .withProperties(settings)
        .do();
    } else {
      await client.data.creator()
        .withClassName(classes.SITE_SETTINGS)
        .withProperties(settings)
        .do();
    }

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// Members Controller
export const getMembers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.MEMBERS)
      .withFields('name email joinDate status plan _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.MEMBERS)
    });
  } catch (error) {
    next(error);
  }
};

// Matches Controller
export const getMatches = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.MATCHES)
      .withFields('user1 user2 matchScore matchedAt status _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.MATCHES)
    });
  } catch (error) {
    next(error);
  }
};

// Membership Plans Controller
export const getMembershipPlans = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.MEMBERSHIP_PLAN)
      .withFields('name price features active _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.MEMBERSHIP_PLAN)
    });
  } catch (error) {
    next(error);
  }
};

export const createMembershipPlan = async (
  req: Request<any, any, { name: string; price: string; features: string[]; active?: boolean }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, price, features, active } = req.body;

    const response = await client.data.creator()
      .withClassName(classes.MEMBERSHIP_PLAN)
      .withProperties({
        name,
        price,
        features: Array.isArray(features) ? features : [features],
        active: active !== false
      } as Record<string, unknown>)
      .do();

    res.status(201).json({
      success: true,
      message: 'Membership plan created successfully',
      data: response
    });
  } catch (error) {
    next(error);
  }
};

// Approvals Controller
export const getApprovals = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.APPROVALS)
      .withFields('userName type submittedAt status _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.APPROVALS)
    });
  } catch (error) {
    next(error);
  }
};

// User Activity Controller
export const getUserActivity = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.USER_ACTIVITY)
      .withFields('userName action details timestamp _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.USER_ACTIVITY)
    });
  } catch (error) {
    next(error);
  }
};

// Content Controller
export const getContent = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.CONTENT)
      .withFields('title category content status createdAt _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.CONTENT)
    });
  } catch (error) {
    next(error);
  }
};

export const createContent = async (
  req: Request<any, any, { title: string; category: string; content: string; status?: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, category, content, status } = req.body;

    const response = await client.data.creator()
      .withClassName(classes.CONTENT)
      .withProperties({
        title,
        category,
        content,
        status: status || 'draft',
        createdAt: new Date().toISOString()
      } as Record<string, unknown>)
      .do();

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: response
    });
  } catch (error) {
    next(error);
  }
};

// Email Templates Controller
export const getEmailTemplates = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.EMAIL_TEMPLATE)
      .withFields('name subject body status _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.EMAIL_TEMPLATE)
    });
  } catch (error) {
    next(error);
  }
};

export const createEmailTemplate = async (
  req: Request<any, any, { name: string; subject: string; body: string; status?: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, subject, body, status } = req.body;

    const response = await client.data.creator()
      .withClassName(classes.EMAIL_TEMPLATE)
      .withProperties({
        name,
        subject,
        body,
        status: status || 'active'
      } as Record<string, unknown>)
      .do();

    res.status(201).json({
      success: true,
      message: 'Email template created successfully',
      data: response
    });
  } catch (error) {
    next(error);
  }
};

// Contact Data Controller
export const getContactData = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.CONTACT_DATA)
      .withFields('name email phone subject message submittedAt _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.CONTACT_DATA)
    });
  } catch (error) {
    next(error);
  }
};

// Member Report Controller
export const getMemberReport = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.MEMBER_REPORT)
      .withFields('memberName joinDate plan status revenue _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.MEMBER_REPORT)
    });
  } catch (error) {
    next(error);
  }
};

// Payment Options Controller
export const getPaymentOptions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(classes.PAYMENT_OPTION)
      .withFields('gateway enabled _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, classes.PAYMENT_OPTION)
    });
  } catch (error) {
    next(error);
  }
};

// Delete Controller
export const deleteItem = async (
  req: Request<{ className: string; id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { className, id } = req.params;

    await client.data.deleter()
      .withClassName(className)
      .withId(id)
      .do();

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
