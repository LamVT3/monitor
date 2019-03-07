
export default class Helper {

    static convertTimeStampToDate(timestamp){

        let today = new Date(timestamp);
        let day = today.getDate() + "";
        let month = (today.getMonth() + 1) + "";
        let year = today.getFullYear() + "";
        let hour = today.getHours() + "";
        let minutes = today.getMinutes() + "";
        let seconds = today.getSeconds() + "";

        function checkZero(data){
            if(data.length === 1){
                data = "0" + data;
            }
            return data;
        }

        day = checkZero(day);
        month = checkZero(month);
        year = checkZero(year);
        hour = checkZero(hour);
        minutes = checkZero(minutes);
        seconds = checkZero(seconds);

        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;

    }
}