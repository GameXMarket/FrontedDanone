import { Input } from '@/components/ui/input'
import styles from './search.module.css'
import { SearchIcon } from '../../icons/catalog-icons'

export const SearchInput = () => {
    return (
        <div className="w-[448px] flex h-[72px] px-[32px] py-5 border-none bg-[#24252F] rounded-[24px]">
            <SearchIcon/>
            <Input
                className={styles.input_search}
                placeholder='Поиск'
            />
        </div>
    )
}