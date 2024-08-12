import { cn } from '@/lib/utils';
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '../ui/input';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DatePicker = () => {
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [showFromHourPicker, setShowFromHourPicker] = useState(false);
    const [showToHourPicker, setShowToHourPicker] = useState(false);
    const [showFromMinutePicker, setShowFromMinutePicker] = useState(false);
    const [showToMinutePicker, setShowToMinutePicker] = useState(false);
    const [timePickerDisabled, setTimePickerDisabled] = useState(false);
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [endToShow, setEndToShow] = useState('');
    const [timeMode, setTimeMode] = useState(12);
    const [hourFromValue, setHourFromValue] = useState(12);
    const [hourToValue, setHourToValue] = useState(11);
    const [minuteFromValue, setMinuteFromValue] = useState('00');
    const [minuteToValue, setMinuteToValue] = useState('59');
    const [meridiemFrom, setMeridiemFrom] = useState('am');
    const [meridiemTo, setMeridiemTo] = useState('pm');
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
    const [blankDays, setBlankDays] = useState<number[]>([]);

    const getNoOfDays = useCallback(() => {
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);
        const daysArray = [];
        const dayOfWeek = start.getDay();
        const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i);
        let current = start;

        while (current <= end) {
            daysArray.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        setBlankDays(blankdaysArray);
        setDaysInMonth(daysArray);
    }, [month, year]);

    useEffect(() => {
        getNoOfDays();
    }, [getNoOfDays]);

    const handleDayClick = (date: Date) => {
        if (endToShow === 'from') {
            setDateFrom(date);
            if (!dateTo) {
                setDateTo(date);
            } else if (date > dateTo) {
                setEndToShow('to');
                setDateFrom(dateTo);
                setDateTo(date);
            }
        } else if (endToShow === 'to') {
            setDateTo(date);
            if (!dateFrom) {
                setDateFrom(date);
            } else if (date < dateFrom) {
                setEndToShow('from');
                setDateTo(dateFrom);
                setDateFrom(date);
            }
        }
        setTimePickerDisabled(!dateFrom);
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        let formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        if (timeMode === 12) {
            const hours = date.getHours() % 12 || 12;
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
            formattedDate += ` ${hours}:${minutes} ${ampm}`;
        } else {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            formattedDate += ` ${hours}:${minutes}`;
        }
        return formattedDate;
    };

    const handleMonthChange = (direction: string) => {
        setMonth(prevMonth => {
            const newMonth = direction === 'next' ? (prevMonth + 1) % 12 : (prevMonth - 1 + 12) % 12;
            return newMonth;
        });
        setYear(prevYear => (month === 11 && direction === 'next') ? prevYear + 1 : (month === 0 && direction === 'prev') ? prevYear - 1 : prevYear);
    };

    const timeOptions = (isFrom: boolean) => {
        const hours = Array.from({ length: timeMode === 24 ? 24 : 12 }, (_, i) => {
            const value = timeMode === 12 ? (i === 0 ? 12 : i) : i;
            return {
                id: value,
                label: value.toString().padStart(2, '0'),
                disabled: isFrom ? (isSingleDay() && (value > hourToValue)) : (isSingleDay() && (value < hourFromValue))
            };
        });

        const minutes = Array.from({ length: 60 }, (_, i) => {
            const value = i;
            return {
                id: i,
                label: i.toString().padStart(2, '0'),
                disabled: isFrom
                    ? (isSingleDay() && (hourFromValue === hourToValue && value > Number(minuteToValue)))
                    : (isSingleDay() && (hourFromValue === hourToValue && value < Number(minuteFromValue)))
            }
        });

        return {
            hours,
            minutes
        };
    };

    const isSingleDay = () => {
        return dateFrom && dateTo && dateFrom.toDateString() === dateTo.toDateString();
    };

    return (
        <div className="w-full mx-auto py-2 md:py-10">
            <div>
                <label htmlFor="datepicker" className="font-bold mt-3 mb-1 text-gray-700 block">Select Date/Time Range</label>
                <div className="relative">
                    <div className="inline-flex items-center border rounded-md mt-3 bg-transparent">
                        <Input
                            type="text"
                            onClick={() => { setEndToShow('from'); setShowDatepicker(true); }}
                            value={formatDate(dateFrom)}
                            readOnly
                            className={cn('focus:outline-none border-none p-2 w-64 rounded-l-md border-r border-gray-300', endToShow === 'from' && 'font-semibold')}
                        />
                        <div className="inline-block px-2 h-full">to</div>
                        <Input
                            type="text"
                            onClick={() => { setEndToShow('to'); setShowDatepicker(true); }}
                            value={formatDate(dateTo)}
                            readOnly
                            className={cn('focus:outline-none border-none p-2 w-64 rounded-r-md border-l border-gray-300', endToShow === 'to' && 'font-semibold')}
                        />
                    </div>
                    {showDatepicker && (
                        <div className="absolute bg-white mt-2 rounded-lg shadow p-4 sm:w-80 w-full">
                            <div className="flex flex-col items-center">
                                <div className="w-full flex justify-between items-center mb-2">
                                    <div>
                                        <span className="text-lg font-bold text-gray-800">
                                            {MONTH_NAMES[month]}
                                        </span>
                                        <span className="ml-1 text-lg text-gray-600 font-normal">
                                            {year}
                                        </span>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                            onClick={() => handleMonthChange('prev')}
                                        >
                                            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                            onClick={() => handleMonthChange('next')}
                                        >
                                            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap mb-3 -mx-1">
                                    {DAYS.map((day, index) => (
                                        <div key={index} style={{ width: '14.26%' }} className="px-1">
                                            <div className="text-gray-800 font-medium text-center text-xs">
                                                {day}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap -mx-1">
                                    {blankDays.map((_, index) => (
                                        <div key={index} style={{ width: '14.28%' }} className="text-center border p-1 border-transparent text-sm"></div>
                                    ))}
                                    {daysInMonth.map((date, index) => (
                                        <div key={index} style={{ width: '14.28%' }}>
                                            <div
                                                onClick={() => handleDayClick(date)}
                                                className={`p-1 text-center cursor-pointer rounded-full text-sm ${date.toDateString() === (dateFrom && dateFrom.toDateString()) ? 'bg-blue-500 text-white' : date.toDateString() === (dateTo && dateTo.toDateString()) ? 'bg-blue-500 text-white' : ''} ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500' : ''}`}
                                            >
                                                {date.getDate()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {timePickerDisabled && (
                        <div className="absolute bg-white mt-2 rounded-lg shadow p-4 sm:w-80 w-full">
                            <div className="flex flex-col items-center">
                                {showFromHourPicker && (
                                    <div className="flex flex-wrap -mx-1">
                                        {timeOptions(true).hours.map(hour => (
                                            <div key={hour.id} className="w-1/4 px-1">
                                                <button
                                                    className={`p-2 w-full text-center ${hour.disabled ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'}`}
                                                    onClick={() => setHourFromValue(hour.id)}
                                                    disabled={!!hour.disabled}
                                                >
                                                    {hour.label}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {showToHourPicker && (
                                    <div className="flex flex-wrap -mx-1">
                                        {timeOptions(false).hours.map(hour => (
                                            <div key={hour.id} className="w-1/4 px-1">
                                                <button
                                                    className={`p-2 w-full text-center ${hour.disabled ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'}`}
                                                    onClick={() => setHourToValue(hour.id)}
                                                    disabled={!!hour.disabled}
                                                >
                                                    {hour.label}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {showFromMinutePicker && (
                                    <div className="flex flex-wrap -mx-1">
                                        {timeOptions(true).minutes.map(minute => (
                                            <div key={minute.id} className="w-1/4 px-1">
                                                <button
                                                    className={`p-2 w-full text-center ${minute.disabled ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'}`}
                                                    onClick={() => setMinuteFromValue(minute.label)}
                                                    disabled={!!minute.disabled}
                                                >
                                                    {minute.label}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {showToMinutePicker && (
                                    <div className="flex flex-wrap -mx-1">
                                        {timeOptions(false).minutes.map(minute => (
                                            <div key={minute.id} className="w-1/4 px-1">
                                                <button
                                                    className={`p-2 w-full text-center ${minute.disabled ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'}`}
                                                    onClick={() => setMinuteToValue(minute.label)}
                                                    disabled={!!minute.disabled}
                                                >
                                                    {minute.label}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {/* {showDatepicker && (
                        <div className="absolute bg-white mt-2 rounded-lg shadow p-4 sm:w-80 w-full">
                            <div className="flex flex-col items-center">
                                <div className="w-full flex justify-between items-center mb-2">
                                    <div>
                                        <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
                                        <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                            onClick={() => handleMonthChange('prev')}
                                        >
                                            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                                            onClick={() => handleMonthChange('next')}
                                        >
                                            <svg className="h-6 w-6 text-gray-500 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap mb-3 -mx-1">
                                    {DAYS.map((day, index) => (
                                        <div key={index} style={{ width: '14.28%' }} className="px-1">
                                            <div className="text-gray-800 font-medium text-center text-xs">{day}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap -mx-1">
                                    {blankDays.map((_, index) => (
                                        <div key={index} style={{ width: '14.28%' }} className="text-center border p-1 border-transparent text-sm" />
                                    ))}
                                    {noOfDays.map(date => (
                                        <div key={date} style={{ width: '14.28%' }}>
                                            <div
                                                onClick={() => handleDateClick(date)}
                                                className={cn('p-1 cursor-pointer text-center text-sm leading-none leading-loose transition ease-in-out duration-100', {
                                                    'font-bold': new Date(year, month, date).toDateString() === new Date().toDateString(),
                                                    'bg-blue-800 text-white rounded-l-full': dateFrom && new Date(year, month, date).getTime() === dateFrom.getTime(),
                                                    'bg-blue-800 text-white rounded-r-full': dateTo && new Date(year, month, date).getTime() === dateTo.getTime(),
                                                    'bg-blue-200': dateFrom && dateTo && new Date(year, month, date) > dateFrom && new Date(year, month, date) < dateTo,
                                                })}
                                            >
                                                {date}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <button onClick={() => setShowDatepicker(false)} className="px-2 py-1 border border-gray-300 hover:border-gray-500 rounded-md">Cancel</button>
                                    <button onClick={() => { setShowDatepicker(false); } className="px-2 py-1 border border-blue-600 bg-blue-500 hover:bg-blue-300 text-white rounded-md">OK</button>
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

