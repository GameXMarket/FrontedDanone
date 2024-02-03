import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SettingsInputProps {
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    className?: string
}

export const SettingsInput = ({
    disabled,
    placeholder,
    label,
    className,
    ...props
}: SettingsInputProps) => {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <Input
                className={cn("bg-transparent border-b border-muted-foreground rounded-none px-0", className)}
                {...props}
                disabled={disabled}
                placeholder={placeholder}
            />
        </div>
    );
};
