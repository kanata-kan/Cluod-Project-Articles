// DeleteButton.jsx
'use client';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { DOMAIN } from '@/app/utils/constants';
import DeleteIcon from '@material-ui/icons/Delete';

function DeleteButton({ id }) {
  const router = useRouter();

  const handleDeleteClick = async () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`${DOMAIN}/api/article/${id}`);
        toast.success('Comment deleted successfully');
        router.refresh();
      } catch (error) {
        toast.error(error?.response?.data?.message || 'An error occurred');
        console.log(error);
      }
    }
  };

  return (
    <button
      className='text-red-500 hover:text-red-700 focus:outline-none ml-2'
      onClick={() => handleDeleteClick()}
    >
      <DeleteIcon />
    </button>
  );
}

export default DeleteButton;
