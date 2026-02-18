import { Router } from "express";
import { archiveListing, createListing, getListing, listListings, updateListing } from "../controllers/listing.controller.js";

export const listingRouter = Router();

listingRouter.get("/listings", listListings);
listingRouter.get("/listings/:id", getListing);
listingRouter.post("/listings", createListing);
listingRouter.patch("/listings/:id", updateListing);
listingRouter.delete("/listings/:id", archiveListing);
