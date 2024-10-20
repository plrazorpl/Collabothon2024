import React, {useState} from 'react';
import {useTheme} from "../../context/ThemeContext.tsx";
import { FaCloudMoon } from "react-icons/fa6";
import {Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";

function Navbar() {
    const { switchTheme } = useTheme();
    const [isDark, setIsDark] = useState(false);
    const [isEnglish, setIsEnglish] = useState(true);
    const { t} = useTranslation();

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        switchTheme(event.target.checked ? 'dark' : 'light');
        setIsDark(event.target.checked);
    };

    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={'bg-cb-blue p-4 w-full flex justify-between items-center'}>
            <div className={'flex justify-around gap-2 items-center'}>
                <Typography onClick={() => {
                    changeLanguage('en')
                    setIsEnglish(true);
                }} color="gray" className={`${isEnglish ? 'font-bold underline' : ''} hover:cursor-pointer text-cb-yellow text-xl my-2`}>EN</Typography>
                <Typography color="gray" className={'text-cb-yellow text-xl my-2'}>|</Typography>
                <Typography onClick={() => {
                    changeLanguage('de')
                    setIsEnglish(false);
                }} color="gray" className={`${isEnglish ? 'font-medium no-underline' : 'font-bold underline'} hover:cursor-pointer text-cb-yellow text-xl my-2`}>DE</Typography>
            </div>
            <div className="flex items-center justify-center">
                <div className={'text-cb-yellow mr-4 text-xl flex justify-center gap-2 items-center'}><FaCloudMoon/>{t('darkTheme')}</div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={isDark}
                        onChange={handleToggle}
                    />
                    <div className={`w-11 h-6 rounded-full shadow-inner ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`dot absolute w-5 h-5 rounded-full shadow transition-transform duration-200 ease-in-out ${isDark ? 'bg-gray-800 left-5' : 'bg-white left-0'}`}></div>
                </label>
            </div>
        </div>
    );
}

export default Navbar;