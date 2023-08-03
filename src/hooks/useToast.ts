import { useContext } from "react";
import { DefaultValue, ToastContext } from "contexts/ToastContext";

type ReturnType = {
  success: (value: string) => void,
  error:(value: string) => void,
  remove: DefaultValue["removeToast"]
}

const useToast = ():ReturnType => {
  const { addToast, removeToast } = useContext(ToastContext);
  
  const success = (value: string) => {
    addToast(value, "success");
  };

  const error = (value: string) => {
    addToast(value, "error");
  };

  return { success, error, remove: removeToast };
};

export default useToast;
