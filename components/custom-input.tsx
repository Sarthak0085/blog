import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

interface CustomInputProps {
    isPending: boolean;
    showPassword?: { [key: string]: boolean };
    handleShowPassword?: (key: string) => void;
    Icon: React.ComponentType<{ size?: number }>;
    name: string;
    type: string;
    field: any;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    label: string;
    handleChange?: (event: any) => void;
    placeholder?: string;
}

export const CustomInput = ({
    isPending,
    showPassword,
    Icon,
    name,
    value,
    onChange,
    onBlur,
    handleChange,
    field,
    handleShowPassword,
    type,
    placeholder,
    label
}: CustomInputProps) => {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="relative">
                    {
                        showPassword &&
                        <Input
                            {...field}
                            name={name}
                            value={value}
                            onChange={onChange ?? handleChange}
                            onBlur={onBlur}
                            disabled={isPending}
                            className="px-8"
                            placeholder={placeholder}
                            type={showPassword[name] ? "text" : "password"}
                        />
                    }
                    {
                        !showPassword &&
                        <Input
                            {...field}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            disabled={isPending}
                            className="px-8"
                            placeholder={placeholder}
                            type={type}
                        />
                    }
                    {Icon && <div
                        className="absolute cursor-pointer !left-2 !bottom-2"
                    >
                        <Icon size={20} />
                        <span className="sr-only">{name}</span>
                    </div>}
                    {
                        showPassword && handleShowPassword &&
                        <div
                            className="absolute cursor-pointer !right-2 !bottom-2"
                            onClick={() => handleShowPassword(name)}
                        >
                            {showPassword[name] ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                            <span className="sr-only">Show Password</span>
                        </div>
                    }
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>

    )
}