"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";

const Test = () => {
    return (
        <div>
            <Button onClick={() => toast.success("Hello World")}>
                Click Me
            </Button>
        </div>
    );
};

export default Test;
