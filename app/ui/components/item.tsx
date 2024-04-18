"use client";

import { ReactNode } from 'react';
import React from 'react';
import '@/app/ui/global.css'

interface Props {
    children?: ReactNode
    name: String
    // any props that come into the component
}


export default function ItemComponent({name}: Props) {

    return (
        <div>
            <div className="absolute z-2 item">{name}</div>
        </div>
        
    );
};