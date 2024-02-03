import { Button } from "@/components/ui/button";

const SupportPage = () => {
    return (
        <div className="w-[calc(100%-87px)] mobile:w-full ml-auto flex flex-col gap-y-12 mobile:gap-y-6 items-center mt-6">
            <h1 className="hidden mobile:inline mobile:text-2xl">Помогите нам стать лучше!</h1>
            <h1 className="text-4xl mobile:text-lg text-center leading-relaxed mobile:text-muted-foreground">
                Сообщите в техническую поддержку, какую игру вы хотели бы выдеть
                в нашем каталоге.
                <br />
                <span className="mobile:hidden">Вы очень поможете нам стать лучше!</span>
            </h1>
            <Button size="lg" className="text-lg rounded-xl" variant="accent">Техническая поддержка</Button>
        </div>
    );
};

export default SupportPage;
