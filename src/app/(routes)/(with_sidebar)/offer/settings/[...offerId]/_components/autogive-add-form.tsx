import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSafeMutation } from "@/hooks/useSafeMutation";
import { safeCreateDelivery } from "@/requests/delivery/delivery-service";
import { CreateDeliveryDto } from "@/requests/delivery/schemas";
import { DeliveryType } from "@/types/DeliveryType";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AutogiveAddFormProps {
    offerId: string | number;
}

export const AutogiveAddForm = ({ offerId }: AutogiveAddFormProps) => {
    const queryClient = useQueryClient()
    const form = useForm<CreateDeliveryDto>({
        defaultValues: {
            offer_id: +offerId,
            value: "",
        },
    });

    const {mutation, fieldErrors} = useSafeMutation<CreateDeliveryDto, DeliveryType[]>(safeCreateDelivery, {
        onSuccess(data) {
            queryClient.invalidateQueries({queryKey: ["deliveries", data[0].offer_id]}) //TODO: add offer_id to query key 
            toast.success("Успешно добавлено!")
        },
        onError() {
            toast.error("Что-то пошло не так")
        }
    })

    const onSubmit = (values: CreateDeliveryDto) => {
        mutation.mutate(values)
        form.reset()
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Image
                    src="/ui-assets/add-circle.svg"
                    alt="add"
                    width={26}
                    height={26}
                    className="cursor-pointer hover:opacity-80"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Добавить автовыдачу</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        //disabled={mutation.isPending}
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                placeholder="Введите значение"
                                className="text-black"
                            />
                        )}
                    />
                    <div className="text-sm text-rose-600 my-2">{fieldErrors?.["value"]?.map((el) => <p>{el}</p>)}</div>
                    <DialogFooter>
                        <Button className="mt-4" variant="accent" type="submit">Добавить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
