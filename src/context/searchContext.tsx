import { createContext, useContext, useState, ReactNode } from "react";

interface BucketListContextType {
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchContext = createContext<BucketListContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <SearchContext.Provider value={{ 
            focusedIndex, 
            setFocusedIndex, 
            searchTerm, 
            setSearchTerm
         }}>
            {children}
        </SearchContext.Provider>
    )
}

// Custom hook to use the BucketList context
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchListProvider');
    }
    return context;
}