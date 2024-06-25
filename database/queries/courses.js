import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "@/lib/convertData";
import { connectDB } from "../connection";
import { Category } from "../model/category-model";
import { Course } from "../model/course-model";
import { Module } from "../model/module.model";
import { Testimonial } from "../model/testimonial-model";
import { User } from "../model/user-model";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
    await connectDB();
    const courses = await Course.find({})
        .select([
            "title",
            "subtitle",
            "thumbnail",
            "modules",
            "price",
            "category",
            "instructor",
        ])
        .populate({
            path: "category",
            model: Category,
        })
        .populate({
            path: "instructor",
            model: User,
        })
        .populate({
            path: "modules",
            model: Module,
        })
        .populate({
            path: "testimonials",
            model: Testimonial,
        })
        .lean();
    return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
    await connectDB();
    const course = await Course.findById(id)
        .populate({
            path: "category",
            model: Category,
        })
        .populate({
            path: "instructor",
            model: User,
        })
        .populate({
            path: "testimonials",
            model: Testimonial,
            populate: {
                path: "user",
                model: User,
            },
        })
        .populate({
            path: "modules",
            model: Module,
        })
        .lean();
    return replaceMongoIdInObject(course);
}

export async function getCoursesByInstructor(instructorId) {
    await connectDB();
    const courses = await Course.find({ instructor: instructorId }).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(
                course._id.toString()
            );
            // console.log("Courses enrollment", enrollment);
            return enrollment;
        })
    );

    const totalEnrollments = enrollments.length;
    console.log("totalEnrollments", totalEnrollments);
    //     enrollments.reduce((item, currentValue) => {
    //     console.log("totalEnrollments", item.length + currentValue.length);
    //     return item.length + currentValue.length;
    // });

    const testimonials = await Promise.all(
        courses.map(async (course) => {
            const testimonial = await getTestimonialsForCourse(
                course._id.toString()
            );
            return testimonial;
        })
    );

    const totalTestimonials = testimonials.flat();
    const avgRating =
        totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0) / totalTestimonials.length;

    return {
        courses: courses.length,
        enrollments: totalEnrollments,
        reviews: totalTestimonials.length,
        ratings: avgRating.toPrecision(2),
    };
}
