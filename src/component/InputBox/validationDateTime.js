import React from 'react';


export default function validationDateTime(targetEvnet){
    const parsingDate = (targetDate) =>{
        const parsedDate = {
            'year' : targetDate.getYear(),
            'month' : targetDate.getMonth(),
            'day' : targetDate.getDate()
        }
        return parsedDate;
    }
    const target = new Date(targetEvnet.value);
    const today = new Date();
    if(target - today < 0){
        const parsedTarget = parsingDate(target);
        const parsedToday = parsingDate(today);
        if(parsedTarget.year === parsedToday.year && parsedTarget.month === parsedToday.month && parsedTarget.day === parsedToday.day){
            // 10 letter Date is based on 00:00, So Today have to Checked for Time
            // Valid Today
            return true;
        }
        else{
            setTimeout(()=>{
                alert("Invalid Date");
            },500);
            return false;
        }   
    }else{
        // Valid
        return true;
    }
}

