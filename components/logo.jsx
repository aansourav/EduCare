import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
export const Logo = ({ className = "" }) => {
    return (
        <Image
            className={cn("max-w-[125px] mr-2", className)}
            src={logo}
            alt="logo"
        />
    );
};
