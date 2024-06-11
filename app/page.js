import Test from "@/components/Test";
import { getCourses } from "@/database/queries/courses";

export default async function Home() {
    const courses = await getCourses();
    
    return (
        <main>
            EduCare
            <Test />
        </main>
    );
}
