import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

interface BucketListContextType {
    focusedIndex: number;
    setFocusedIndex: (index: number) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    dropdownIsOpen: boolean;
    setDropdownIsOpen: Dispatch<SetStateAction<boolean>>
}

export const SearchContext = createContext<BucketListContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    useEffect(() => {
        setDropdownIsOpen(searchTerm === '' ? false : true);
    }, [searchTerm])

    return (
        <SearchContext.Provider value={{ 
            focusedIndex, 
            setFocusedIndex, 
            searchTerm, 
            setSearchTerm,
            dropdownIsOpen,
            setDropdownIsOpen
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