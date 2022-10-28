import React from 'react';
import { render } from "@testing-library/react";
import InputContext from "../store/InputContextProvider";
import { InputContextInterface } from '../types/types';
import LoadingContextProvider from '../store/LoadingContext';

export const renderWithCustomInputProvider = (tree: React.ReactNode, input: InputContextInterface) => render(
    <InputContext.Provider value={input}>{tree}</InputContext.Provider>
);

export const renderWithLoadingProvider = (tree: React.ReactNode) => render(
    <LoadingContextProvider>{tree}</LoadingContextProvider>
);

export const renderWithAllProviders = (tree: React.ReactNode, input: InputContextInterface) => render(
    <LoadingContextProvider>
        <InputContext.Provider value={input}>{tree}</InputContext.Provider>
    </LoadingContextProvider>
);