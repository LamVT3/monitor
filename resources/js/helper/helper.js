
export default class Helper {
    static convertTimeStampToDate(timestamp){
        return new Date(timestamp).toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)
    }
}