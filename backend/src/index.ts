import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { listingRouter } from "./routes/listing.routes.js";
import { transactionRouter } from "./routes/transaction.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", listingRouter);
app.use("/api", transactionRouter);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`GearSwap API running on http://localhost:${port}`);
});
