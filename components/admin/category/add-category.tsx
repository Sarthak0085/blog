"use client";

import { useState } from "react";
import { CategoryModal } from "./category-modal";
import { Button } from "@/components/ui/button";

export const AddCategory = () => {
    const [open, setOpen] = useState(false);
    return (
        <CategoryModal open={open} setOpen={setOpen}>
            <Button
                variant={"outline"}
                className="bg-blue-500 text-white font-semibold"
                onClick={() => setOpen(true)}
            >
                Add Category
            </Button>
        </CategoryModal>
    );
};
