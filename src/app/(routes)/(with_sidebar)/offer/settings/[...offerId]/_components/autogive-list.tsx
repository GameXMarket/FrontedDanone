"use client";

import { useAuthQuery } from "@/hooks/useAuthQuery";
import { DeliveryService } from "@/requests/delivery/delivery-service";
import { AutoGiveItem } from "./autogive-item";

interface AutogiveListProps {
    offerId: string | number;
}

export const AutogiveList = ({ offerId }: AutogiveListProps) => {
    const { data } = useAuthQuery({
        queryKey: ["deliveries", +offerId],
        queryFn: () => DeliveryService.getAllByOfferId(+offerId),
        enabled: !!offerId,
    });

    return (
        <ul className="space-y-3">
            {data?.map((el, idx) => (
                <li key={el.id}>
                    <AutoGiveItem text={el.value} idx={idx} />
                </li>
            ))}
        </ul>
    );
};
