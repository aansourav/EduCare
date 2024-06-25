import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "../model/enrollment-model";

export async function getEnrollmentsForCourse(courseId) {
    const enrollments = await Enrollment.find({ course_id: courseId }).lean();
    // console.log("enrollments", enrollments);
    return replaceMongoIdInArray(enrollments);
}
