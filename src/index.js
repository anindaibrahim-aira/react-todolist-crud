import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Mengimpor komponen utama yang berisi Task List
import reportWebVitals from './reportWebVitals';
// Baris yang dihighlight: Mengimpor CSS Bootstrap agar styling-nya berfungsi di seluruh aplikasi
import 'bootstrap/dist/css/bootstrap.min.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Jika Anda ingin mulai mengukur kinerja di aplikasi Anda, kirim fungsi
// untuk mencatat hasilnya (misalnya: reportWebVitals(console.log))
// atau kirim ke endpoint analitik. Pelajari lebih lanjut: https://bit.ly/CRA-vitals
reportWebVitals();