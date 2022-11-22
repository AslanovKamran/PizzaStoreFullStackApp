import { RootState } from "../../store";

export const searchValueSelector = (state:RootState) => (state.search.searchValue);