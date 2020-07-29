 export function getElapsedSecondsBetween(date1: Date, date2: Date) {
        const milliSecondsDiff = date2.getTime() - date1.getTime();
        return milliSecondsDiff / 1000;
    }