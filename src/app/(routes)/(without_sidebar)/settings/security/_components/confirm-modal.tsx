import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { codeDto, emailWithCodeDto, passwordWithCodeDto } from "@/requests/user/schemas";
import { safeSendCodeToNewEmail, safeVerifyPasswordChange, userService } from "@/requests/user/user.service";
import { UserType } from "@/types/UserType";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ConfirmModalForPasswordProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    form: UseFormReturn<
        {
            password: string;
        },
        any,
        undefined
    >;
}

export const ConfirmModalForPassword = ({ open, setOpen, form: passwordForm }: ConfirmModalForPasswordProps) => {
    const { mutation } = useSafeMutation(safeVerifyPasswordChange, {
        onError: () => {
            setOpen(false)
            toast.error("Ашыпка");
            form.reset()
            passwordForm.reset()
        },
        onSuccess: () => {
            setOpen(false)
            toast.success("Нет ашыпки");
            form.reset()
            passwordForm.reset()
        },
    });

    const form = useForm<passwordWithCodeDto>({
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = (data: passwordWithCodeDto) => {
        mutation.mutate({...data, password: passwordForm.getValues("password")});
    };

    return (
        <Dialog open={open}>
            <DialogContent hasClose={false} className="flex flex-col items-center">
                <h3 className="text-center text-2xl">
                    На вашу почту отправлен код подтверждения, введите
                    его в поле ниже:
                </h3>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6 flex flex-col items-center"
                    >
                        <FormField
                            disabled={mutation.isPending}
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={4} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={0}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={1}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={2}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={3}
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button size="lg" variant="accent" type="submit" disabled={mutation.isPending}>
                            Далее
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

interface ConfirmModalForOldEmailProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    setOpenNewEmail: Dispatch<SetStateAction<boolean>>
    newEmail: string
}

export const ConfirmModalForOldEmail = ({ open, setOpen, setOpenNewEmail, newEmail}: ConfirmModalForOldEmailProps) => {
    const { mutation } = useSafeMutation(safeSendCodeToNewEmail, {
        onError: () => {
            setOpen(false)
            toast.error("Ашыпка");
            form.reset()
        },
        onSuccess: () => {
            setOpen(false)
            setOpenNewEmail(true)
            toast.success("Нет ашыпки");
            form.reset()
        },
    });

    const form = useForm<emailWithCodeDto>({
        defaultValues: {
            code_old: "",
        },
    });

    const onSubmit = (data: emailWithCodeDto) => {
        mutation.mutate({...data, email: newEmail});
    };

    return (
        <Dialog open={open}>
            <DialogContent hasClose={false} className="flex flex-col items-center">
                <h3 className="text-center text-2xl">
                    На вашу старую почту отправлен код подтверждения, введите
                    его в поле ниже:
                </h3>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6 flex flex-col items-center"
                    >
                        <FormField
                            disabled={mutation.isPending}
                            control={form.control}
                            name="code_old"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={4} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={0}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={1}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={2}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={3}
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button size="lg" variant="accent" type="submit" disabled={mutation.isPending}>
                            Далее
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

interface ConfirmModalForNewEmailProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfirmModalForNewEmail = ({ open, setOpen }: ConfirmModalForNewEmailProps) => {
    const {update} = useSession()
    const { mutation } = useSafeMutation<codeDto, UserType>(userService.verifyEmailChange, {
        onError: () => {
            setOpen(false)
            toast.error("Ашыпка");
            form.reset()
        },
        onSuccess: (data) => {
            update({email: data.email})
            setOpen(false)
            toast.success("Нет ашыпки");
            form.reset()
        },
    });

    const form = useForm<codeDto>({
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = (data: codeDto) => {
        mutation.mutate({...data});
    };

    return (
        <Dialog open={open}>
            <DialogContent hasClose={false} className="flex flex-col items-center">
                <h3 className="text-center text-2xl">
                    На вашу новую почту отправлен код подтверждения, введите
                    его в поле ниже:
                </h3>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6 flex flex-col items-center"
                    >
                        <FormField
                            disabled={mutation.isPending}
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={4} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={0}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={1}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={2}
                                                />
                                                <InputOTPSlot
                                                    className="border-b"
                                                    index={3}
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button size="lg" variant="accent" type="submit" disabled={mutation.isPending}>
                            Далее
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};