import { getCoursesByInstructor } from "@/database/queries/courses";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";
import Image from "next/image";

const CourseInstructor = async ({ instructor }) => {
    const courseDetailsByInstructor = await getCoursesByInstructor(
        instructor._id
    );
    // console.log(courseDetailsByInstructor);
    const { courses, enrollments, reviews, ratings } =
        courseDetailsByInstructor;

    return (
        <div className="bg-gray-50 rounded-md p-8">
            <div className="md:flex md:gap-x-5 mb-8">
                <div className="h-[310px] w-[270px] max-w-full  flex-none rounded mb-5 md:mb-0">
                    <Image
                        src={instructor?.profile_picture}
                        alt=""
                        className="w-full h-full object-cover rounded"
                        width={270}
                        height={310}
                    />
                </div>
                <div className="flex-1">
                    <div className="max-w-[300px]">
                        <h4 className="text-[34px] font-bold leading-[51px]">
                            {instructor?.first_name} {instructor?.last_name}
                        </h4>
                        <div className="text-gray-600 font-medium mb-6">
                            {instructor?.role}
                        </div>
                        <ul className="list space-y-4">
                            <li className="flex items-center space-x-3">
                                <Presentation className="text-gray-600" />
                                <div>
                                    {courses > 1
                                        ? `${courses}+ Courses`
                                        : "1 Course"}
                                </div>
                            </li>
                            <li className="flex space-x-3">
                                <UsersRound className="text-gray-600" />
                                <div>
                                    {enrollments > 0
                                        ? `${enrollments}+ Students Learned`
                                        : "No student enrolled"}
                                </div>
                            </li>
                            <li className="flex space-x-3">
                                <MessageSquare className="text-gray-600" />
                                <div>
                                    {reviews > 0
                                        ? `${reviews}+ Reviews`
                                        : "No Reviews"}
                                </div>
                            </li>
                            <li className="flex space-x-3">
                                <Star className="text-gray-600" />
                                <div>
                                    {ratings > 0
                                        ? `${ratings} Average Rating`
                                        : "No Rating"}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className="text-gray-600">{instructor?.bio}</p>
        </div>
    );
};

export default CourseInstructor;
