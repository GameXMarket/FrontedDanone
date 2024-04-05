import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import styles from '../register/_components/styles/register.module.css'

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
        <div className="w-full relative">
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
                className={styles.form_input}
                placeholder={placeholder}
                {...props}
            />
            {errors?.[id] && <Image className="absolute bottom-[23px] right-4" height={26} width={26} alt="incorrect" src="/images/auth/incorrect.svg" />}
            {!errors?.[id] && errors && <Image className="absolute bottom-[23px] right-4" height={26} width={26} alt="incorrect" src="/images/auth/correct.svg" />}
        </div>
    );
};
