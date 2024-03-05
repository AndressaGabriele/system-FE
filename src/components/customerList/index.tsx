// components/CustomerList.tsx
import { FiTrash } from "react-icons/fi";

interface CustomerListProps {
  customers: Customer[];
  onDeleteCustomer: (id: string) => void;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

function CustomerList({ customers, onDeleteCustomer }: CustomerListProps) {
  return (
    <section className="flex flex-col gap-4">
      {customers.map((customer) => (
        <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
          <p><span className="font-medium">Nome: </span>{customer.name}</p>
          <p><span className="font-medium">Email: </span>{customer.email}</p>
          <p><span className="font-medium">Status: </span>{customer.status ? "ATIVO" : "INATIVO"}</p>
          <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2" onClick={() => onDeleteCustomer(customer.id)}>
            <FiTrash size={18} color="#fff" />
          </button>
        </article>
      ))}
    </section>
  );
}

export default CustomerList;
