import { Review } from "@/components/Review";

const ReviewsPage = () => {
    return (
        <div className="w-[570px] overflow-y-auto h-[500px] space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
                <Review key={idx} />
            ))}
        </div>
    );
};

export default ReviewsPage;