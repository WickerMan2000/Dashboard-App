import React from 'react';
import { render } from "@testing-library/react";
import InputContext from "../store/InputContextProvider";
import { EnablerContextInterface, InputContextInterface } from '../types/types';
import LoadingContextProvider from '../store/LoadingContext';
import InputContextProvider from '../store/InputContext';
import EnablerContext from '../store/EnablerContextProvider';
import EnablerContextProvider from '../store/EnablerContext';

export const renderWithCustomInputProvider = (tree: React.ReactNode, input: InputContextInterface) => render(
    <InputContext.Provider value={input}>{tree}</InputContext.Provider>
);

export const renderWithLoadingProvider = (tree: React.ReactNode) => render(
    <LoadingContextProvider>{tree}</LoadingContextProvider>
);

export const renderWithAllCustomProviders = (tree: React.ReactNode, enable: EnablerContextInterface) => render(
    <LoadingContextProvider>
        <EnablerContext.Provider value={enable}>
            <InputContextProvider>{tree}</InputContextProvider>
        </EnablerContext.Provider>
    </LoadingContextProvider>
);

export const renderWithAllProviders = (tree: React.ReactNode) => render(
    <LoadingContextProvider>
        <EnablerContextProvider>
            <InputContextProvider>{tree}</InputContextProvider>
        </EnablerContextProvider>
    </LoadingContextProvider>
);