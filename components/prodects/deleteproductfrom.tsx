'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import { deleteProduct } from '@/action/action.products';

interface DeleteButtonProps {
    productId: number;
}



const DeleteButton: React.FC<DeleteButtonProps> = ({ productId }) => {
  const router = useRouter();

  const onClickrefresh = () => {
  router.push("/admin");
};
  const handleDelete = async () => {
    try {
      const deletedPost = await deleteProduct(productId);

      if (deletedPost) {
        console.log('Post deleted successfully');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleBothClicks = () => {
    handleDelete();
    onClickrefresh();
  };
  return (
    <button
      onClick={handleBothClicks}
      
      className="bg-red-500 text-white px-4 py-2 rounded w-32"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
