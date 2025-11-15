import { DreamsAPI } from "@/api/dreams";
import { useMutation } from "@tanstack/react-query";

export const usePublicInterpretation = () => {
  return useMutation({
    mutationFn: DreamsAPI.getPublicInterpretation,
    mutationKey: ['public-inter'],
  });
};