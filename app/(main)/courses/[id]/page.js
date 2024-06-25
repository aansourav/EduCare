import { getCourseDetails } from "@/database/queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";
const SingleCoursePage = async ({ params: { id } }) => {
    const course = await getCourseDetails(id);
    return (
        <>
            <CourseDetailsIntro
                title={course?.title}
                subtitle={course?.subtitle}
                thumbnail={course?.thumbnail}
            />
            <CourseDetails course={course} />
            {course?.testimonials && (
                <Testimonials
                    testimonials={replaceMongoIdInArray(course?.testimonials)}
                />
            )}
            <RelatedCourses />
        </>
    );
};
export default SingleCoursePage;
