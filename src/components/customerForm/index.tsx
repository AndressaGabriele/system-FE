// components/CustomerForm.tsx

import React, { useRef } from "react";

interface CustomerFormProps {
  onAddCustomer: (customer: { name: string; email: string }) => void;
}

function CustomerForm({ onAddCustomer }: CustomerFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    if (!name || !email) return;
    onAddCustomer({ name, email });
    nameRef.current!.value = "";
    emailRef.current!.value = "";
  }

  return (
    <form className="flex flex-col my-6" onSubmit={handleSubmit}>
      <label className="font-medium text-white">Nome:</label>
      <input
        type="text"
        placeholder="Digite seu nome completo..."
        className="w-full mb-5 p-2 rounded"
        ref={nameRef}
      />
      <label className="font-medium text-white">Email:</label>
      <input
        type="email"
        placeholder="Digite seu email..."
        className="w-full mb-5 p-2 rounded"
        ref={emailRef}
      />
      <input
        type="submit"
        value="Cadastrar"
        className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
      />
    </form>
  );
}

export default CustomerForm;
