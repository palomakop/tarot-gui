import { useNavigate } from "react-router-dom";

export const useViewTransitionNavigate = () => {
  const navigate = useNavigate();

  return (to: string) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(to));
    } else {
      navigate(to);
    }
  };
};