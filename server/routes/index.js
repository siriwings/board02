//api 루트 라우터 생성

import express from 'express';

import article from './article';
import board from './board';


const router = express.Router();

router.use('/article', article);

router.use('/board', board);

export default router;

