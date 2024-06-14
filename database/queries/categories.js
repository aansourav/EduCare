import { replaceMongoIdInArray } from "@/lib/convertData";
import { connectDB } from "../connection";
import { Category } from "../model/category-model";

export async function getCategories() {
    // await connectDB();
    const categories = await Category.find({}).lean();
    return replaceMongoIdInArray(categories);
}
