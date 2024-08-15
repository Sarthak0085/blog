import { RxCross1 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { useCustomSearchParams } from "@/hooks/useSearchParams";
import Link from "next/link";


export const DisplayQueryParams = () => {
    const { params, updateParam } = useCustomSearchParams();

    const handleResetFilters = () => {
        Object.keys(params).forEach(key => {
            updateParam(key, '');
        });
    };

    const hasFilters = Object.values(params).some(value => value !== '');

    return (
        <>
            <div className="flex justify-center items-center w-full max-w-[600px] my-2">
                <div className="flex items-start gap-4 flex-wrap">
                    {Object.entries(params).filter(([key, value]) => value !== '').map(([key, value]) => {
                        if (key === 'tags') {
                            const tags = value.split(',');
                            return (
                                <div key={key} className="flex items-start gap-4 flex-wrap">
                                    {tags.map((tag: string, index: number) => (
                                        <Button
                                            key={index}
                                            variant={"primary"}
                                            onClick={() => updateParam(key, tag)}
                                        >
                                            {tag}
                                            <RxCross1 className="ms-2" />
                                        </Button>
                                    ))}
                                </div>
                            );
                        } else {
                            let time, date;
                            if (key === "time" || key === "date") {
                                time = key === "time" && value.split(",").join("-");
                                date = key === "date" && (value.split(",").slice(4, 15).join("-") || value.slice(4, 15));
                            }
                            return (
                                <Button
                                    key={key}
                                    variant={"primary"}
                                    onClick={() => updateParam(key)}
                                >
                                    {time || date || value}
                                    <RxCross1 className="ms-2" />
                                </Button>
                            );
                        }
                    })}
                </div>
            </div>
            {hasFilters &&
                <Button asChild variant={"default"} onClick={handleResetFilters}>
                    <Link href={"/blogs"}>
                        Reset Filters
                    </Link>
                </Button>}
        </>
    )
}