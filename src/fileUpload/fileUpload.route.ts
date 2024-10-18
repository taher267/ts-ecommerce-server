import express from 'express';
import controllers from './fileUpload.controller';
import validations from './fileUpload.validation';
const router = express.Router();
router.post('/', validations.isValidUploadFile, controllers.imageUpload);
router.get('/', controllers.allImages);
router.delete('/:id', controllers.imageDelete);
export default router;
