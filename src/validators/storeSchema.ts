// src/validators/storeSchema.ts
import { checkSchema } from "express-validator";

export const storeSchema = checkSchema({
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Store name is required",
        },
        isString: {
            errorMessage: "Store name must be a string",
        },
    },
    address: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Address is required",
        },
        isString: {
            errorMessage: "Address must be a string",
        },
    },
});