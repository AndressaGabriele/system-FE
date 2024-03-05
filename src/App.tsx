// App.tsx

import { useEffect, useState } from "react";
import CustomerForm from "./components/customerForm";
import CustomerList from "./components/customerList";
import { api } from "./services/api";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get<Customer[]>("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error loading customers:", error);
      // Handle error loading customers
    }
  }

  async function handleDeleteCustomer(id: string) {
    try {
      await api.delete("/customer", {
        params: {
          id: id,
        }
      })

      const allCustomers = customers.filter((customer) => customer.id !== id)
      setCustomers(allCustomers)
      setDeleteStatus("Cliente deletado com sucesso!");

      setTimeout(() => {
        setDeleteStatus(null);
      }, 3000)

    } catch (err) {
      console.log(err)
      setDeleteStatus("Erro ao deletar cliente.")
    }
  }

  async function handleAddCustomer(customerData: { name: string; email: string }) {
    try {
      const response = await api.post<Customer>("/customer", customerData);
      setCustomers([...customers, response.data]);
    } catch (error) {
      console.error("Error adding customer:", error);
      // Handle error adding customer
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        {deleteStatus && <p className="text-green-500 my-4">{deleteStatus}</p>}
        <CustomerForm onAddCustomer={handleAddCustomer} />
        <CustomerList customers={customers} onDeleteCustomer={handleDeleteCustomer} />
      </main>
    </div>
  );
}

export default App;
