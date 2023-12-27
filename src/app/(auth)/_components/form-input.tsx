import { Input } from "@/components/ui/input";
import { XCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

interface FormInputProps {
    placeholder?: string;
    id: string;
    errors?: Record<string, string[] | undefined> | undefined;
    disabled?: boolean,
    type?: "password"
}

export const FormInput = ({
    placeholder,
    id,
    errors,
    disabled,
    type,
    ...props
}: FormInputProps) => {

    const {pending} = useFormStatus()

    return (
        <div className="w-full mt-[56px]">
            {errors?.[id]?.map((error: string) => (
                <p
                    key={error}
                    className="text-xs text-rose-600"
                >
                    *{error}
                </p>
            ))}
            <Input
                type={type}
                disabled={pending || disabled}
                id={id}
                name={id}
                className="bg-[#24252F] h-[72px] pl-[30px] font-light text-[24px] opacity-[0.16] rounded-[24px] outline-none border-none 
                focus-visible:ring-offset-0 placeholder:text-slate-400 focus:text-white"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};
