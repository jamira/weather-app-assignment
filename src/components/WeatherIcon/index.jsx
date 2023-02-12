import React from 'react';
import useDynamicSVG from "../../hooks/useDynamicSGV";

const ICON_MAP = [
    [0, 1, 'sun'],
    [2, 'cloud-sun'],
    [3, 'cloud'],
    [45, 48, 'smog'],
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 'cloud-showers-heavy'],
    [71, 73, 75, 77, 85, 86, 'snowflake'],
    [95, 96, 99, 'cloud-bolt']
];

export default function WeatherIcon({ iconCode }) {
    let icon;

    ICON_MAP.forEach((_, index) => {
        if (ICON_MAP[index].includes(iconCode)) {
            icon = ICON_MAP[index].slice(-1).toString()
        }
    })

    const { SvgIcon } = useDynamicSVG(icon);

    if (SvgIcon) {
        return <SvgIcon />;
    }

    return null;

}
