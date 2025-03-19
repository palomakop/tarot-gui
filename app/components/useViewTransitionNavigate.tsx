import { useNavigate } from "react-router-dom";

export const useViewTransitionNavigate = () => {
  const navigate = useNavigate();

  return (to: string, state: Object) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(to, state));
    } else {
      navigate(to, state);
    }
  };
};