import moment from 'moment'

export default function formatCurrency(date:string, formatDate="DD-MM-YYYY hh:mm:ss") {
    
    if(!date) {
        return moment().format(formatDate);
    }

    return moment(date).format(formatDate);
    
}