'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchAds } from '@/lib/api';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Ad = { mediaUrl: string; duration: number | null };

export default function AdCarousel({ serverAds }: { serverAds: Ad[] }) {
  const { data: ads } = useQuery({
    queryKey: ['ads'],
    queryFn: fetchAds, 
    initialData: serverAds, 
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
  
  const safeAds = ads ?? serverAds;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!safeAds || safeAds.length === 0) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeAds.length);
    }, (safeAds[index]?.duration ?? 5) * 1000);

    return () => clearInterval(timer);
  }, [index, safeAds]);

  if (!safeAds || safeAds.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900 text-sm text-gray-400">
        No cached ads available offline.
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
            key={safeAds[index].mediaUrl}
            src={safeAds[index].mediaUrl}
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
