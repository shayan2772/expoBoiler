import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { themes } from "../theme/colors";


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
 

export const useTheme=()=>{
    const { theme,themeType } = useAppSelector((s) => s.general);
    const  colors =themes[theme];
    return {colors,theme,themeType};
};
 