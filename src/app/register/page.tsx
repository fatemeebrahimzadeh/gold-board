'use client';
import { useState } from 'react';

export default function Register() {
  const [shopName, setShopName] = useState('');
  
  const slug = shopName
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, ''); 

  const handleRegister = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ shopName, slug }),
    });
    if (res.ok) alert(`موفق بود! لینک شما: /shop/${slug}`);
  };

  return (
    <div className="p-10">
      <input 
        className="border p-2"
        placeholder="نام طلافروشی" 
        onChange={(e) => setShopName(e.target.value)} 
      />
      <p>لینک شما: /shop/{slug || '...'}</p>
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2">ثبت مغازه</button>
    </div>
  );
}