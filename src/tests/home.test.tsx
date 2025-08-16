import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import {describe, expect, it} from "@jest/globals";
import Page from "@/app/page";
import React from "react";

describe('Home', () => {
    it('renders homepage unchanged', () => {
        const { container } = render(<Page />)
        expect(container).toMatchSnapshot()
    })
})