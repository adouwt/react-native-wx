
const formateTime = (timeStr) => {
    if (!timeStr) {
        return
    }
    let formateTimeStr = '';
    let timeStamp = new Date(timeStr).getTime();
    let todayTime = new Date().getTime();
    let diffSameDate = new Date().getDate() - new Date(timeStr).getDate();
    let timeDiff = (todayTime - timeStamp) / 1000 / 60 / 60 / 24;
    let day = new Date(timeStamp).getDay();
    let daySnippetHour = new Date(timeStr).getHours();
    let daySnippetMinute = new Date(timeStr).getMinutes();
    if(diffSameDate<0) {
        formateTimeStr = '未来时间'
        return formateTimeStr
    }
    if(isNaN(diffSameDate)) {
        formateTimeStr = 'time不合法'
        return formateTimeStr
    }
    if (diffSameDate !== 0) { // 不是同一天
        if (timeDiff > 3) {
            formateTimeStr = '三天前'
        } else if (timeDiff > 1) {
            switch (day) {
                case 0:
                    formateTimeStr = '周日';
                    break;
                case 1:
                    formateTimeStr = '周一';
                    break;
                case 2:
                    formateTimeStr = '周二';
                    break;
                case 3:
                    formateTimeStr = '周三';
                    break;
                case 4:
                    formateTimeStr = '周四';
                    break;
                case 5:
                    formateTimeStr = '周五';
                    break;
                case 6:
                    formateTimeStr = '周六';
                    break;
            }
        }
    } else {
        if (daySnippetHour >= 0 && daySnippetHour <= 6) {
            formateTimeStr = `凌晨${daySnippetHour}:${daySnippetMinute}`
        }
        if (daySnippetHour > 6 && daySnippetHour <= 9) {
            formateTimeStr = `早上${daySnippetHour}:${daySnippetMinute}`
        }
        if (daySnippetHour > 9 && daySnippetHour <= 12) {
            formateTimeStr = `上午${daySnippetHour}:${daySnippetMinute}`
        }
        if (daySnippetHour > 12 && daySnippetHour <= 18) {
            formateTimeStr = `下午${daySnippetHour}:${daySnippetMinute}`
        }
        if (daySnippetHour > 18 && daySnippetHour < 24) {
            formateTimeStr = `晚上${daySnippetHour}:${daySnippetMinute}`
        }

    }
    return formateTimeStr
}

export { formateTime }