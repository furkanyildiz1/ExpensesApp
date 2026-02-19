import axios from "axios";
//https://console.firebase.google.com/u/0/project/expensesapp-73f47/database/expensesapp-73f47-default-rtdb/data/~2F?fb_gclid=Cj0KCQiA9t3KBhCQARIsAJOcR7zRZdYwKCdOUIUvd1hg7_OvdJICy3RxcDjf9tOGtTF8ShvRYYubkFgaAuhoEALw_wcB&fb_utm_campaign=Cloud-SS-DR-Firebase-FY26-global-gsem-1713590&fb_utm_content=text-ad&fb_utm_medium=cpc&fb_utm_source=google&fb_utm_term=KW_firebase
//bu url raldate ile istekleri dizi şeklinde isticem 
//.expenses.json gibi belirteçekleyebilecem burdaki .json firebase için gerekli

export function storeExpense(expenseData){
    axios.post('https://expensesapp-73f47-default-rtdb.firebaseio.com/expenses.json', 
        expenseData)
}