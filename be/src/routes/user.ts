import { Router } from "express";

const router = Router();

router.get('/', (req, res) => res.send("chces usera"));

export default router;
