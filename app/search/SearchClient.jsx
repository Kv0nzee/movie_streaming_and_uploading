'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import Input from "../components/Input";

const SearchClient = () => {
    const [name, setName] = useState("");
    const router = useRouter();

    const search = () => {
        const query = {
            search: name
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });
        router.push(url);
    }

    useEffect(() => {
        const timer = setTimeout(search, 1000);
        return () => clearTimeout(timer);
    }, [name, setName]);

    return ( 
        <div className="pt-20">
            <Input
                id="name"
                type="text"
                label="Search"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
     );
}
 
export default SearchClient;