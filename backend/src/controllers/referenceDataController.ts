import { Request, Response, NextFunction } from 'express';
import client from '../config/weaviate';
import { classes } from '../models/WeaviateModels';

const getDataSafely = (response: any, className: string): any[] => {
  return response?.data?.Get?.[className] || [];
};

// Generic CRUD operations for reference data
const getAll = (className: string) => async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await client.graphql.get()
      .withClassName(className)
      .withFields('name active _additional { id }')
      .do();

    res.status(200).json({
      success: true,
      data: getDataSafely(response, className),
      count: getDataSafely(response, className).length
    });
  } catch (error) {
    next(error);
  }
};

const create = (className: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, active = true, ...rest } = req.body;

    const properties = {
      name,
      active,
      ...rest
    } as Record<string, unknown>;

    const response = await client.data.creator()
      .withClassName(className)
      .withProperties(properties)
      .do();

    res.status(201).json({
      success: true,
      message: `${className} created successfully`,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

const update = (className: string) => async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, active, ...rest } = req.body;

    const properties = {
      name,
      active,
      ...rest
    } as Record<string, unknown>;

    await client.data.updater()
      .withClassName(className)
      .withId(id)
      .withProperties(properties)
      .do();

    res.status(200).json({
      success: true,
      message: `${className} updated successfully`
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = (className: string) => async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    await client.data.deleter()
      .withClassName(className)
      .withId(id)
      .do();

    res.status(200).json({
      success: true,
      message: `${className} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};

// Religion
export const getReligions = getAll(classes.RELIGION);
export const createReligion = create(classes.RELIGION);
export const updateReligion = update(classes.RELIGION);
export const deleteReligion = deleteItem(classes.RELIGION);

// Caste
export const getCastes = getAll(classes.CASTE);
export const createCaste = create(classes.CASTE);
export const updateCaste = update(classes.CASTE);
export const deleteCaste = deleteItem(classes.CASTE);

// Sub Caste
export const getSubCastes = getAll(classes.SUB_CASTE);
export const createSubCaste = create(classes.SUB_CASTE);
export const updateSubCaste = update(classes.SUB_CASTE);
export const deleteSubCaste = deleteItem(classes.SUB_CASTE);

// Gotra
export const getGotras = getAll(classes.GOTRA);
export const createGotra = create(classes.GOTRA);
export const updateGotra = update(classes.GOTRA);
export const deleteGotra = deleteItem(classes.GOTRA);

// Country
export const getCountries = getAll(classes.COUNTRY);
export const createCountry = create(classes.COUNTRY);
export const updateCountry = update(classes.COUNTRY);
export const deleteCountry = deleteItem(classes.COUNTRY);

// State
export const getStates = getAll(classes.STATE);
export const createState = create(classes.STATE);
export const updateState = update(classes.STATE);
export const deleteState = deleteItem(classes.STATE);

// City
export const getCities = getAll(classes.CITY);
export const createCity = create(classes.CITY);
export const updateCity = update(classes.CITY);
export const deleteCity = deleteItem(classes.CITY);

// Occupation
export const getOccupations = getAll(classes.OCCUPATION);
export const createOccupation = create(classes.OCCUPATION);
export const updateOccupation = update(classes.OCCUPATION);
export const deleteOccupation = deleteItem(classes.OCCUPATION);

// Education
export const getEducations = getAll(classes.EDUCATION);
export const createEducation = create(classes.EDUCATION);
export const updateEducation = update(classes.EDUCATION);
export const deleteEducation = deleteItem(classes.EDUCATION);

// Mother Tongue
export const getMotherTongues = getAll(classes.MOTHER_TONGUE);
export const createMotherTongue = create(classes.MOTHER_TONGUE);
export const updateMotherTongue = update(classes.MOTHER_TONGUE);
export const deleteMotherTongue = deleteItem(classes.MOTHER_TONGUE);

// Star
export const getStars = getAll(classes.STAR);
export const createStar = create(classes.STAR);
export const updateStar = update(classes.STAR);
export const deleteStar = deleteItem(classes.STAR);

// Rasi
export const getRasis = getAll(classes.RASI);
export const createRasi = create(classes.RASI);
export const updateRasi = update(classes.RASI);
export const deleteRasi = deleteItem(classes.RASI);

// Annual Income
export const getAnnualIncomes = getAll(classes.ANNUAL_INCOME);
export const createAnnualIncome = create(classes.ANNUAL_INCOME);
export const updateAnnualIncome = update(classes.ANNUAL_INCOME);
export const deleteAnnualIncome = deleteItem(classes.ANNUAL_INCOME);

// Dosh
export const getDoshs = getAll(classes.DOSH);
export const createDosh = create(classes.DOSH);
export const updateDosh = update(classes.DOSH);
export const deleteDosh = deleteItem(classes.DOSH);
