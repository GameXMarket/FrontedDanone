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
        <div className="w-full">
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
                className="bg-[#070707] outline-none border-none 
                focus-visible:ring-offset-0 placeholder:text-slate-400"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};
