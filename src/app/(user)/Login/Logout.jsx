'use client';
import React, { useState } from 'react';
import axios from 'axios'; // تأكد من استيراد axios
import { toast } from 'react-toastify'; // تأكد من استيراد toast إذا كنت تستخدم react-toastify
import module from '../../_component/header/header.module.css';
import { useRouter } from 'next/navigation';
import ButtonSpinner from '../../_component/comments/buttonSpinner';
import { DOMAIN } from '@/app/utils/constants';

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${DOMAIN}/api/users/logout`); // استخدام POST بدلاً من GET
      router.replace('/');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleSubmit} className={module.btn}>
      {isLoading ? <ButtonSpinner /> : 'Logout'}
    </button>
  );
}
