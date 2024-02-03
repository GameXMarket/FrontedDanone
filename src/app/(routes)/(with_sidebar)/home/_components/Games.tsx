import { MainContentItem } from "./GamesItem";

const images = [
    {
        albumId: 1,
        id: 1,
        title: "CS 2",
        url: "/images/temp_main/cs2.png",
        thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
    {
        albumId: 1,
        id: 2,
        title: "Fortnite",
        url: "/images/temp_main/fortnite.png",
        thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
        albumId: 1,
        id: 3,
        title: "Diablo IV",
        url: "/images/temp_main/diablo.png",
        thumbnailUrl: "https://via.placeholder.com/150/24f355",
    },
    {
        albumId: 1,
        id: 4,
        title: "Minecraft",
        url: "/images/temp_main/minecraft.png",
        thumbnailUrl: "https://via.placeholder.com/150/d32776",
    },
    {
        albumId: 1,
        id: 5,
        title: "RUST",
        url: "/images/temp_main/rust.png",
        thumbnailUrl: "https://via.placeholder.com/150/f66b97",
    },
    {
        albumId: 1,
        id: 6,
        title: "Больше игр",
        url: "/images/temp_main/more_games.png",
        thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
    }
];

export const Games = () => {
    return (
        <div className="h-[480px] grid grid-cols-4 mobile:grid-cols-2 gap-6">
            {images.map((img, idx) => (
                <MainContentItem key={img.id} idx={idx} url={img.url} name={img.title} />
            ))}
        </div>
    );
};
