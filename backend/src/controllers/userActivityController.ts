import { Request, Response } from 'express';
import client from '../config/weaviate';
import { classes } from '../models/WeaviateModels';

// ==================== EXPRESS INTEREST ====================
export const getAllExpressInterests = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.graphql
      .get()
      .withClassName(classes.EXPRESS_INTEREST)
      .withFields('fromUserId fromUserName fromProfileId toUserId toUserName toProfileId status createdAt respondedAt _additional { id }')
      .do();

    res.json({
      success: true,
      data: result.data.Get[classes.EXPRESS_INTEREST] || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch express interests', details: error instanceof Error ? error.message : error }
    });
  }
};

export const createExpressInterest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fromUserId, fromUserName, fromProfileId, toUserId, toUserName, toProfileId } = req.body;

    const id = await client.data
      .creator()
      .withClassName(classes.EXPRESS_INTEREST)
      .withProperties({
        fromUserId,
        fromUserName,
        fromProfileId,
        toUserId,
        toUserName,
        toProfileId,
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
      .do();

    res.status(201).json({
      success: true,
      message: 'Express interest created successfully',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to create express interest', details: error instanceof Error ? error.message : error }
    });
  }
};

export const updateExpressInterest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, respondedAt } = req.body;

    await client.data
      .updater()
      .withClassName(classes.EXPRESS_INTEREST)
      .withId(id)
      .withProperties({
        status,
        respondedAt: respondedAt || new Date().toISOString(),
      })
      .do();

    res.json({
      success: true,
      message: 'Express interest updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update express interest', details: error instanceof Error ? error.message : error }
    });
  }
};

export const deleteExpressInterest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await client.data
      .deleter()
      .withClassName(classes.EXPRESS_INTEREST)
      .withId(id)
      .do();

    res.json({
      success: true,
      message: 'Express interest deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to delete express interest', details: error instanceof Error ? error.message : error }
    });
  }
};

// ==================== MESSAGES ====================
export const getAllMessages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.graphql
      .get()
      .withClassName(classes.MESSAGE)
      .withFields('fromUserId fromUserName fromProfileId toUserId toUserName toProfileId subject message isRead createdAt readAt _additional { id }')
      .do();

    res.json({
      success: true,
      data: result.data.Get[classes.MESSAGE] || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch messages', details: error instanceof Error ? error.message : error }
    });
  }
};

export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fromUserId, fromUserName, fromProfileId, toUserId, toUserName, toProfileId, subject, message } = req.body;

    const id = await client.data
      .creator()
      .withClassName(classes.MESSAGE)
      .withProperties({
        fromUserId,
        fromUserName,
        fromProfileId,
        toUserId,
        toUserName,
        toProfileId,
        subject,
        message,
        isRead: false,
        createdAt: new Date().toISOString(),
      })
      .do();

    res.status(201).json({
      success: true,
      message: 'Message created successfully',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to create message', details: error instanceof Error ? error.message : error }
    });
  }
};

export const updateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isRead, readAt } = req.body;

    await client.data
      .updater()
      .withClassName(classes.MESSAGE)
      .withId(id)
      .withProperties({
        isRead,
        readAt: readAt || new Date().toISOString(),
      })
      .do();

    res.json({
      success: true,
      message: 'Message updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update message', details: error instanceof Error ? error.message : error }
    });
  }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await client.data
      .deleter()
      .withClassName(classes.MESSAGE)
      .withId(id)
      .do();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to delete message', details: error instanceof Error ? error.message : error }
    });
  }
};

// ==================== VIEWED PROFILES ====================
export const getAllViewedProfiles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.graphql
      .get()
      .withClassName(classes.VIEWED_PROFILE)
      .withFields('viewerUserId viewerUserName viewerProfileId viewedUserId viewedUserName viewedProfileId viewedAt viewTime _additional { id }')
      .do();

    res.json({
      success: true,
      data: result.data.Get[classes.VIEWED_PROFILE] || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch viewed profiles', details: error instanceof Error ? error.message : error }
    });
  }
};

export const createViewedProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { viewerUserId, viewerUserName, viewerProfileId, viewedUserId, viewedUserName, viewedProfileId } = req.body;
    
    const now = new Date();
    const viewTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const id = await client.data
      .creator()
      .withClassName(classes.VIEWED_PROFILE)
      .withProperties({
        viewerUserId,
        viewerUserName,
        viewerProfileId,
        viewedUserId,
        viewedUserName,
        viewedProfileId,
        viewedAt: now.toISOString(),
        viewTime,
      })
      .do();

    res.status(201).json({
      success: true,
      message: 'Viewed profile record created successfully',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to create viewed profile record', details: error instanceof Error ? error.message : error }
    });
  }
};

export const deleteViewedProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await client.data
      .deleter()
      .withClassName(classes.VIEWED_PROFILE)
      .withId(id)
      .do();

    res.json({
      success: true,
      message: 'Viewed profile record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to delete viewed profile record', details: error instanceof Error ? error.message : error }
    });
  }
};

// ==================== BLOCKED PROFILES ====================
export const getAllBlockedProfiles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.graphql
      .get()
      .withClassName(classes.BLOCKED_PROFILE)
      .withFields('blockerUserId blockerUserName blockerProfileId blockedUserId blockedUserName blockedProfileId reason blockedAt _additional { id }')
      .do();

    res.json({
      success: true,
      data: result.data.Get[classes.BLOCKED_PROFILE] || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch blocked profiles', details: error instanceof Error ? error.message : error }
    });
  }
};

export const createBlockedProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blockerUserId, blockerUserName, blockerProfileId, blockedUserId, blockedUserName, blockedProfileId, reason } = req.body;

    const id = await client.data
      .creator()
      .withClassName(classes.BLOCKED_PROFILE)
      .withProperties({
        blockerUserId,
        blockerUserName,
        blockerProfileId,
        blockedUserId,
        blockedUserName,
        blockedProfileId,
        reason: reason || '',
        blockedAt: new Date().toISOString(),
      })
      .do();

    res.status(201).json({
      success: true,
      message: 'Profile blocked successfully',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to block profile', details: error instanceof Error ? error.message : error }
    });
  }
};

export const deleteBlockedProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await client.data
      .deleter()
      .withClassName(classes.BLOCKED_PROFILE)
      .withId(id)
      .do();

    res.json({
      success: true,
      message: 'Profile unblocked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to unblock profile', details: error instanceof Error ? error.message : error }
    });
  }
};

// ==================== SHORTLISTED PROFILES ====================
export const getAllShortlistedProfiles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.graphql
      .get()
      .withClassName(classes.SHORTLISTED_PROFILE)
      .withFields('userId userName userProfileId shortlistedUserId shortlistedUserName shortlistedProfileId shortlistedAt _additional { id }')
      .do();

    res.json({
      success: true,
      data: result.data.Get[classes.SHORTLISTED_PROFILE] || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch shortlisted profiles', details: error instanceof Error ? error.message : error }
    });
  }
};

export const createShortlistedProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, userName, userProfileId, shortlistedUserId, shortlistedUserName, shortlistedProfileId } = req.body;

    const id = await client.data
      .creator()
      .withClassName(classes.SHORTLISTED_PROFILE)
      .withProperties({
        userId,
        userName,
        userProfileId,
        shortlistedUserId,
        shortlistedUserName,
        shortlistedProfileId,
        shortlistedAt: new Date().toISOString(),
      })
      .do();

    res.status(201).json({
      success: true,
      message: 'Profile shortlisted successfully',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to shortlist profile', details: error instanceof Error ? error.message : error }
    });
  }
};

export const deleteShortlistedProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await client.data
      .deleter()
      .withClassName(classes.SHORTLISTED_PROFILE)
      .withId(id)
      .do();

    res.json({
      success: true,
      message: 'Profile removed from shortlist successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to remove from shortlist', details: error instanceof Error ? error.message : error }
    });
  }
};
