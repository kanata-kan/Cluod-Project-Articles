'use client'; // Make this component a client component
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

function EditButton({ id }) {
  return (
    <Link
      className='text-blue-500 hover:text-blue-700 focus:outline-none'
      href={`Articles-tables/Edit-article/${id}`}
    >
      <EditIcon />
    </Link>
  );
}

export default EditButton;
