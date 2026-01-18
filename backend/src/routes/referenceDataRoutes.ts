import express from 'express';
import {
  getReligions, createReligion, updateReligion, deleteReligion,
  getCastes, createCaste, updateCaste, deleteCaste,
  getSubCastes, createSubCaste, updateSubCaste, deleteSubCaste,
  getGotras, createGotra, updateGotra, deleteGotra,
  getCountries, createCountry, updateCountry, deleteCountry,
  getStates, createState, updateState, deleteState,
  getCities, createCity, updateCity, deleteCity,
  getOccupations, createOccupation, updateOccupation, deleteOccupation,
  getEducations, createEducation, updateEducation, deleteEducation,
  getMotherTongues, createMotherTongue, updateMotherTongue, deleteMotherTongue,
  getStars, createStar, updateStar, deleteStar,
  getRasis, createRasi, updateRasi, deleteRasi,
  getAnnualIncomes, createAnnualIncome, updateAnnualIncome, deleteAnnualIncome,
  getDoshs, createDosh, updateDosh, deleteDosh
} from '../controllers/referenceDataController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Religion routes
router.get('/religions', getReligions);
router.post('/religions', createReligion);
router.put('/religions/:id', updateReligion);
router.delete('/religions/:id', deleteReligion);

// Caste routes
router.get('/castes', getCastes);
router.post('/castes', createCaste);
router.put('/castes/:id', updateCaste);
router.delete('/castes/:id', deleteCaste);

// Sub Caste routes
router.get('/sub-castes', getSubCastes);
router.post('/sub-castes', createSubCaste);
router.put('/sub-castes/:id', updateSubCaste);
router.delete('/sub-castes/:id', deleteSubCaste);

// Gotra routes
router.get('/gotras', getGotras);
router.post('/gotras', createGotra);
router.put('/gotras/:id', updateGotra);
router.delete('/gotras/:id', deleteGotra);

// Country routes
router.get('/countries', getCountries);
router.post('/countries', createCountry);
router.put('/countries/:id', updateCountry);
router.delete('/countries/:id', deleteCountry);

// State routes
router.get('/states', getStates);
router.post('/states', createState);
router.put('/states/:id', updateState);
router.delete('/states/:id', deleteState);

// City routes
router.get('/cities', getCities);
router.post('/cities', createCity);
router.put('/cities/:id', updateCity);
router.delete('/cities/:id', deleteCity);

// Occupation routes
router.get('/occupations', getOccupations);
router.post('/occupations', createOccupation);
router.put('/occupations/:id', updateOccupation);
router.delete('/occupations/:id', deleteOccupation);

// Education routes
router.get('/educations', getEducations);
router.post('/educations', createEducation);
router.put('/educations/:id', updateEducation);
router.delete('/educations/:id', deleteEducation);

// Mother Tongue routes
router.get('/mother-tongues', getMotherTongues);
router.post('/mother-tongues', createMotherTongue);
router.put('/mother-tongues/:id', updateMotherTongue);
router.delete('/mother-tongues/:id', deleteMotherTongue);

// Star routes
router.get('/stars', getStars);
router.post('/stars', createStar);
router.put('/stars/:id', updateStar);
router.delete('/stars/:id', deleteStar);

// Rasi routes
router.get('/rasis', getRasis);
router.post('/rasis', createRasi);
router.put('/rasis/:id', updateRasi);
router.delete('/rasis/:id', deleteRasi);

// Annual Income routes
router.get('/annual-incomes', getAnnualIncomes);
router.post('/annual-incomes', createAnnualIncome);
router.put('/annual-incomes/:id', updateAnnualIncome);
router.delete('/annual-incomes/:id', deleteAnnualIncome);

// Dosh routes
router.get('/doshs', getDoshs);
router.post('/doshs', createDosh);
router.put('/doshs/:id', updateDosh);
router.delete('/doshs/:id', deleteDosh);

export default router;
