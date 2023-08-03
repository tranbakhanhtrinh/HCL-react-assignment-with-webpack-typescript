import { useEffect, useState } from "react";
import useToast from "hooks/useToast";

interface Props{
  id: number,
  value: string,
  type: string
}

const Toast:React.FC<Props> = ({ id, value, type }) => {
  const { remove } = useToast();
  const [shouldRender, setRender] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {remove(id); setRender(false);}, 4000);

    return () => clearTimeout(timer);
  }, [id, remove]);


  const handleonAnimationEnd = () => {
    setRender(false);
  };

  return (
    <div className={`custom-toast toast--${type}`} onAnimationEnd={handleonAnimationEnd} style={{ animation: `${shouldRender ? "fadeIn" : "fadeOut"} 2s` }} data-testid="toast">
      <span>{value}</span>
      <button onClick={() => {remove(id);setRender(false);}} data-testid="close-toast-btn">x</button>
    </div>
  );
};

export default Toast;
