
import axios from "axios"

//Yeni .NET API adresimiz (Yerel ağ IP'niz ve API portunuz)
const BACKEND_URL = 'http://192.168.1.34:5231/api';

// İşletme verileri için geçici olarak Firebase adresini saklıyoruz (Hata almamak için)
const FIREBASE_URL = 'https://gelir-gider-takip-7894e-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
    // POST isteği ile gideri ekliyoruz. API bize oluşturulan nesneyi döner.
    const response = await axios.post(BACKEND_URL + '/expenses', expenseData);
    return response.data.id; // API'den gelen id değerini dönüyoruz
}
export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses');

    // API doğrudan dizi döndüğü için map kullanarak JavaScript tarih nesnesine dönüştürüyoruz
    return response.data.map(expense => ({
        id: expense.id.toString(), // ID değerini frontend'in string beklemesi ihtimaline karşı string'e çeviriyoruz
        amount: expense.amount,
        date: new Date(expense.date),
        description: expense.description,
        category: expense.category || 'Diğer'
    }));
}
export function updateExpense(id, expenseData) {
    // PUT isteğinde URL'ye id verip gövdede (body) hem id'yi hem de yeni veriyi yolluyoruz
    return axios.put(BACKEND_URL + `/expenses/${id}`, {
        id: parseInt(id), // ID'yi integer'a çevirerek API'nin beklediği formata sokuyoruz
        ...expenseData
    });
}
export function deleteExpense(id) {
    // DELETE isteğinde url sonuna id veriyoruz
    return axios.delete(BACKEND_URL + `/expenses/${id}`);
}
export async function fetchBusinessData() {
    // İşletme verisi henüz .NET tarafında olmadığı için Firebase'e yönlendiriyoruz
    const response = await axios.get(FIREBASE_URL + '/business.json');
    return response.data;
}
export function updateBusinessData(businessData) {
    // İşletme verisi güncellemesini de Firebase'e yönlendiriyoruz
    return axios.put(FIREBASE_URL + '/business.json', businessData);
}