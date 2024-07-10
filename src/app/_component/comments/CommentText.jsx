'use client';
import React, { useState } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import UpdateCommentModal from './UpdateCommentModal';
import { DOMAIN } from '@/app/utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function CommentText({ comment, date, userId }) {
  const [openModel, setOpenModel] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      try {
        const res = await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        toast.success('Comment deleted successfully');
        router.refresh();
        setOpenModel(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error deleting comment');
        console.log(error);
      }
    }
  };

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-md mb-4'>
      <p className='text-lg font-semibold mb-2'>{comment.User.username}</p>
      <p className='text-lg mb-2'>{comment.text}</p>
      <p className='text-sm text-gray-600 mb-2'>Commented on: {date}</p>
      <div className='flex space-x-2'>
        {userId && userId === comment.userId && (
          <>
            <button
              className='bg-red-500 text-white py-1 px-2 rounded-md flex items-center space-x-1'
              aria-label='Delete comment'
              onClick={handleDelete}
            >
              <FaTrash className='h-4 w-4' />
              <span>Delete</span>
            </button>
            <button
              className='bg-blue-500 text-white py-1 px-2 rounded-md flex items-center space-x-1'
              aria-label='Edit comment'
              onClick={() => {
                setOpenModel(true);
              }}
            >
              <FaPencilAlt className='h-4 w-4' />
              <span>Edit</span>
            </button>
          </>
        )}
      </div>
      {openModel && (
        <UpdateCommentModal comment={comment} setOpenModel={setOpenModel} />
      )}
    </div>
  );
}

export default CommentText;
