import React from 'react';
import { render } from "@testing-library/react";
import InputContext from "../store/InputContextProvider";
import { InputContextInterface } from '../types/types';

export const renderWithCustomInputProvider = (tree: React.ReactNode, input: InputContextInterface) => render(
    <InputContext.Provider value={input}>{tree}</InputContext.Provider>
);