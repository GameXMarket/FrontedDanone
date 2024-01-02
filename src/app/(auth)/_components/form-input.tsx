import { Input } from "@/components/ui/input";
import Image from "next/image";
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
        <div className="w-full mt-[56px] relative">
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
            {errors?.[id] && <Image className="absolute bottom-[23px] right-4" height={26} width={26} alt="incorrect" src="/images/auth/incorrect.svg" />}
            {!errors?.[id] && errors && <Image className="absolute bottom-[23px] right-4" height={26} width={26} alt="incorrect" src="/images/auth/correct.svg" />}
        </div>
    );
};
