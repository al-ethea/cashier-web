import { ICashier } from "@/types/cashier.type";
import apiInstance from "@/utils/api/apiInstance";
import { all, AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";

export default function useAdminCashiers({id}:{id?:string} = {}) {
  const [allCashiers, setAllCashiers] = React.useState([]);
  const fetchAllCashiers = async () => {
    try {
      const response = await apiInstance.get('/cashier/all');
      setAllCashiers(response.data.cashiers);
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    fetchAllCashiers();
  }, []);

  const [addCashierDialogOpen, setAddCashierDialogOpen] = React.useState(false);

  const [editCashierDialogOpen, setEditCashierDialogOpen] = React.useState(false);

  const [currentCashier, setCurrentCashier] = React.useState<ICashier | null>(null);
  const fetchCashierById = async () => {
    try {
      const response = await apiInstance.get(`/cashier/id/${id}`);
      console.log(response.data.cashier); 
      setCurrentCashier(response.data.cashier);
    } catch (error) {
      const errResponse = error as AxiosError<{ message: string }>;
      console.error(errResponse.response?.data.message);
    }
  };

  const handleDeleteCashier = async (id: string, password?: string) => {
    try {
      const response = await apiInstance.delete(`/cashier/delete/${id}`
      );
      toast.warning(response.data.message);
      fetchAllCashiers();
    } catch (error) {
      const errResponse = error as AxiosError<{ message: string }>;
      console.error(errResponse.response?.data.message);
    }
  }

  return {
    allCashiers,
    addCashierDialogOpen,
    fetchAllCashiers,
    setAddCashierDialogOpen,
    editCashierDialogOpen,
    setEditCashierDialogOpen,
    currentCashier,
    setCurrentCashier,
    fetchCashierById,
    handleDeleteCashier
  }
}