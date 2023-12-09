import { render, screen } from '@testing-library/react'
import InitPage from "@/app/page"
import '@testing-library/jest-dom'
 
describe('Init', () => {
  it('renders an initial page', () => {
    render(<InitPage />)
 
    const main = screen.getByRole("main")

    expect(main).toBeInTheDocument()
  })
})