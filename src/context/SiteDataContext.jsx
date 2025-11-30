import { createContext, useContext, useEffect, useState } from "react";

const SiteDataContext = createContext();

export const SiteDataProvider = ({ children }) => {
    const [siteData, setSiteData] = useState(null);

    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((data) => setSiteData(data))
            .catch((err) => console.error("Failed to load data.json:", err));
    }, []);

    if (!siteData) return <div>Loading...</div>;

    return (
        <SiteDataContext.Provider value={siteData}>
            {children}
        </SiteDataContext.Provider>
    );
};

export const useSiteData = () => useContext(SiteDataContext);
