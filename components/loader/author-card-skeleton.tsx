import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const AuthorCardSkeleton = () => (
    <Card className="!min-w-[400px] max-w-[720px] w-full m-4 shadow-md p-3">
        {/* Header Loader */}
        <CardHeader className="flex items-center justify-center">
            <Avatar className="w-[120px] h-[120px] bg-gray-300 animate-pulse" />
        </CardHeader>

        {/* Content Loader */}
        <CardContent className="p-6">
            <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 animate-pulse"></div>

            {/* Stats Loader */}
            <div className="flex flex-col space-y-3 my-2">
                <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
            </div>
        </CardContent>

        {/* Footer Loader */}
        <CardFooter className="flex justify-end">
            <Button
                variant={"outline"}
                className='!min-w-[100px] bg-gray-300 rounded animate-pulse'
            ></Button>
        </CardFooter>
    </Card>
);
