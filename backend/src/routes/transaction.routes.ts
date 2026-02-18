import { Router } from "express";
import { cancelTransaction, completeTransaction, createTransaction } from "../controllers/transaction.controller.js";

export const transactionRouter = Router();

transactionRouter.post("/transactions", createTransaction);
transactionRouter.patch("/transactions/:id/complete", completeTransaction);
transactionRouter.patch("/transactions/:id/cancel", cancelTransaction);
