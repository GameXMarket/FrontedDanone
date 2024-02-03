import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AutoGiveForm } from "./_components/autogive-form";

const OfferSettingsPage = () => {
    return (
        <div className="w-[calc(100%-382px)] mobile:w-full h-full flex flex-col items-start justify-center gap-y-12">
            <AutoGiveForm />
            <div className="flex mobile:flex-col mobile:gap-y-4 items-center gap-x-4 self-start ml-8 mobile:ml-0">
                <h2 className="text-3xl mobile:text-center">
                    Подключить автоматическое поднятие?
                </h2>
                <Switch />
            </div>
            <Button variant="accent" size="lg" className="rounded-xl text-lg self-center">
                Выставить на продажу
            </Button>
        </div>
    );
};

export default OfferSettingsPage;
