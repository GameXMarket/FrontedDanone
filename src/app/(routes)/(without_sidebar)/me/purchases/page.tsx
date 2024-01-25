import { Avatar } from "@/components/Avatar";
import { PurchaseItem } from "./_components/purchase-item";

const PurchasesPage = () => {
    return (
        <div className="grid grid-cols-3 gap-8 w-full">
            {Array.from({ length: 10 }).map((_, idx) => (
                <PurchaseItem key={idx} />
            ))}
        </div>
    );
};

export default PurchasesPage;
