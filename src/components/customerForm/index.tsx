import React, { useRef, useState } from "react";

interface CustomerFormProps {
  onAddCustomer: (customer: { name: string; email: string }) => void;
}

function CustomerForm({ onAddCustomer }: CustomerFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    
    // Verifica se os campos estão preenchidos
    if (!name.trim() || !email.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Verifica se o email é válido
    if (!isValidEmail(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    // Limpa os erros se não houver nenhum
    setError(null);

    // Adiciona o cliente
    onAddCustomer({ name, email });
    
    // Limpa os campos do formulário
    nameRef.current!.value = "";
    emailRef.current!.value = "";

    // Exibe a mensagem de sucesso por 3 segundos
    setSuccessMessage("Cliente cadastrado com sucesso!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  }

  // Função para validar o email
  function isValidEmail(email: string) {
    // Utilize uma expressão regular para validar o email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Limpa as mensagens de erro quando o usuário começa a digitar nos campos
  function handleNameChange() {
    setError(null);
  }

  function handleEmailChange() {
    setError(null);
  }

  return (
    <form className="flex flex-col my-6" onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      
      <label className="font-medium text-white">Nome:</label>
      <input
        type="text"
        placeholder="Digite seu nome completo..."
        className="w-full mb-5 p-2 rounded"
        ref={nameRef}
        onChange={handleNameChange}
      />
      <label className="font-medium text-white">Email:</label>
      <input
        type="email"
        placeholder="Digite seu email..."
        className="w-full mb-5 p-2 rounded"
        ref={emailRef}
        onChange={handleEmailChange}
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
