import Image from "next/image";

export const Review = () => {
    return (
        <div className="flex gap-x-3">
            <div className="relative w-[40px] h-[40px] shrink-0">
                <Image
                    src="/images/temp_main/seller.png"
                    alt="seller"
                    fill
                    className="absolute object-cover rounded-full"
                />
            </div>
            <div>
                <p className="text-gradient text-xl leading-5">Heronwater</p>
                <div className="flex items-center gap-x-1">
                    <span className="text-muted-foreground text-sm mr-1">
                        Оценка:
                    </span>
                    {Array.from({ length: 5 }, (_, idx) => (
                        <Image
                            key={idx}
                            src="/images/main/star.svg"
                            alt="star"
                            width={12}
                            height={12}
                        />
                    ))}
                    <span className="text-sm">5.0</span>
                </div>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nam repudiandae voluptates exercitationem quaerat libero officia asperiores. Rerum velit quis error. Sed rem perferendis ea id pariatur nostrum explicabo dolores!</p>
            </div>
        </div>
    );
};
