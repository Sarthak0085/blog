"use client";

import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { DatePicker } from "./date-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useCustomSearchParams } from "@/hooks/useSearchParams";

export const FilterList = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const queryTime = time?.split(",");
    console.log(queryTime)
    const [minTime, setMinTime] = useState((queryTime && Number(queryTime[0])) || 1);
    const [maxTime, setMaxTime] = useState((queryTime && Number(queryTime[1])) || 60);
    const [minThumb, setMinThumb] = useState(0);
    const [maxThumb, setMaxThumb] = useState(0);
    const { updateParam } = useCustomSearchParams();

    const min = 1, max = 60;

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxTime - 1);
        setMinTime(value);
    };

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minTime + 1);
        setMaxTime(value);
    };


    useEffect(() => {
        const newMinThumb = ((minTime - min) / (max - min)) * 100;
        const newMaxThumb = 100 - (((maxTime - min) / (max - min)) * 100);

        setMinThumb(newMinThumb);
        setMaxThumb(newMaxThumb);
    }, [minTime, maxTime]);

    // const handleClick = () => {
    //     const tagQuery = tags ? `tags=${encodeURIComponent(tags)}` : '';
    //     const categoryQuery = category ? `category=${encodeURIComponent(category)}` : '';
    //     const timeQuery = minTime ? `time=${encodeURIComponent(minTime)},${encodeURIComponent(maxTime)}` : '';

    //     const queryString = [timeQuery, tagQuery, categoryQuery].filter(Boolean).join('&');

    //     const url = `/blogs${queryString ? `?${queryString}` : ''}`;

    //     router.push(url);
    // }

    return (
        <div className="max-w-[600px] px-4 w-full flex flex-col items-center justify-center">
            <div className="relative max-w-xl w-full">
                <div>
                    <Input
                        type="range"
                        id="min-time"
                        min={min}
                        max={max}
                        step="1"
                        name="min-time"
                        value={minTime}
                        onChange={(e) => setMinTime(Number(e.target.value))}
                        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                    />
                    <Input
                        type="range"
                        min={min}
                        max={max}
                        step="1"
                        value={maxTime}
                        onChange={handleMaxChange}
                        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer" />

                    <div className="relative z-10 h-2">
                        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
                        <div
                            className="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
                            style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
                        ></div>
                        <div
                            id="min-time"
                            className="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
                            style={{ left: `${minThumb}%` }}
                        ></div>

                        <div className="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
                            style={{ right: `${maxThumb}%` }}
                        ></div>

                    </div>

                </div>

                <div className="flex justify-between items-center py-5">
                    <div>
                        <Input
                            type="number"
                            maxLength={2}
                            value={minTime}
                            onChange={handleMinChange}
                            className="px-3 py-2 border border-gray-300 shadow-sm rounded w-24 text-center"
                        />
                    </div>
                    <div>
                        <Input
                            type="number"
                            maxLength={2}
                            value={maxTime}
                            onChange={handleMaxChange}
                            className="px-3 py-2 border border-gray-300 shadow-sm rounded w-24 text-center"
                        />
                    </div>
                </div>
            </div>
            <Button
                variant={"default"}
                onClick={() => updateParam("time", [minTime, maxTime])}
            >
                Filter
            </Button>
        </div>
    )
}