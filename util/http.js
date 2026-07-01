import axios from "axios";

const BACKEND_URL = 'https://gelir-gider-takip-7894e-default-rtdb.firebaseio.com'
//https://console.firebase.google.com/u/0/project/expensesapp-73f47/database/expensesapp-73f47-default-rtdb/data/~2F?fb_gclid=Cj0KCQiA9t3KBhCQARIsAJOcR7zRZdYwKCdOUIUvd1hg7_OvdJICy3RxcDjf9tOGtTF8ShvRYYubkFgaAuhoEALw_wcB&fb_utm_campaign=Cloud-SS-DR-Firebase-FY26-global-gsem-1713590&fb_utm_content=text-ad&fb_utm_medium=cpc&fb_utm_source=google&fb_utm_term=KW_firebase
//bu url raldate ile istekleri dizi şeklinde isticem 
//.expenses.json gibi belirteçekleyebilecem burdaki .json firebase için gerekli

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL +'/expenses.json',
        expenseData)
    const id = response.data.name; //firebase id oluştururken name olarak dönüyor
    return id;
}

export async function fetchExpenses(){
    const response= await axios.get(BACKEND_URL + '/expenses.json')

    const expenses = [];

    for (const key in response.data){
        const expensObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
            category: response.data[key].category || 'Diğer'
        }
        expenses.push(expensObj);
        }
    return expenses;
}

export  function updateExpense(id, expenseData){
    return axios.put (BACKEND_URL+ `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id){
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

export async function fetchBusinessData() {
    const response = await axios.get(BACKEND_URL + '/business.json');
    return response.data;
}

export function updateBusinessData(businessData) {
    return axios.put(BACKEND_URL + '/business.json', businessData);
}
