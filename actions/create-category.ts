"use server";

import * as z from "zod";
import { CategorySchema } from "@/schemas";
import { getCategoryByName } from "@/data/category";

export const createCategory = async (values: z.infer<typeof CategorySchema>) => {
    const validatedFields = CategorySchema.safeParse(values);

    if (validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const { name } = validatedFields.data;

    const category = await getCategoryByName(name);
}