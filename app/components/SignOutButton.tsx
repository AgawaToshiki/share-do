'use client'
import React, { useState } from 'react'
import { handleSignOut } from '../actions/signOut'
import Button from '../components/elements/button/Button';
import ConfirmModal from '../components/layouts/ConfirmModal';


const SignOutButton = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }
  
  return (
    <>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenModal(e)}
        variant="danger"
        size="medium"
        attrs={
          { type: "button" }
        }
      >
        サインアウト
      </Button>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="サインアウト"
          message="サインアウトしますか？"
          setter={setIsOpen}
        >
          <form action={handleSignOut}>
            <Button
              variant="danger"
              size="medium"
              attrs={
                { type: "submit" }
              }
            >
              サインアウト
            </Button>
          </form>
        </ConfirmModal>
      )}

    </>
  );
}

export default SignOutButton