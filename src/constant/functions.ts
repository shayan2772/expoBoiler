export const  getLangLabel = (code: string) => {
    switch (code) {
      case "ur":
        return "اردو";
      case "fr":
        return "Français";
      default:
        return "English";
    }
  };