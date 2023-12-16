import { Input } from "@/components/ui/input";

interface FormInputProps {
    placeholder: string;
}

export const FormInput = ({ placeholder, ...props }: FormInputProps) => {
    return (
        <div className="w-full">
            <Input
                className="bg-[#070707] outline-none border-none 
                focus-visible:ring-offset-0 placeholder-slate-800"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};
