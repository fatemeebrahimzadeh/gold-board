'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Ad = { mediaUrl: string; duration: number };

export default function AdCarousel({ serverAds }: { serverAds: Ad[] }) {
  const { data: ads } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds, 
    initialData: serverAds, 
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, ads[index].duration * 1000);

    return () => clearInterval(timer);
  }, [index, ads]);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
            key={ads[index].mediaUrl}
            src={ads[index].mediaUrl}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover shadow-2xl rounded-2xl border-4 border-yellow-500/20"
        />
      </AnimatePresence>
    </div>
  );
}