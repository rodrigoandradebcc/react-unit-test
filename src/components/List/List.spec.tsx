import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react'; 
import { List } from './index';

describe('App Component', () => {
    it('should render list items', async () => {
        const firstRender = render(<List initialItems={['Rod', 'Erick', 'Qv']} />)

        expect(firstRender.getByText('Rod')).toBeInTheDocument()
        expect(firstRender.getByText('Erick')).toBeInTheDocument()
        expect(firstRender.getByText('Qv')).toBeInTheDocument()
    
        firstRender.unmount()
        const secondRender = render(<List initialItems={['Novo']} />)
    
        await waitFor(() => {
            expect(secondRender.getByText('Novo')).toBeInTheDocument()
            expect(secondRender.queryByText('Rod')).not.toBeInTheDocument()
        })
      });

    it('should be able to add new item to the list', async () => {
        const { getByPlaceholderText, getByText, findByText } = render(<List initialItems={[]}/>)

        const inputElement = getByPlaceholderText('Novo item');
        const addButton = getByText('Adicionar');

        fireEvent.change(inputElement, {
            target: {
                value: 'Novo'
            }
        });

        fireEvent.click(addButton);


        await waitFor(() => {
            expect(getByText('Novo')).toBeInTheDocument()
        })
    })

    it('should be able to remove item to the list', async () => {
        const { getByText, getAllByText, queryByText } = render(<List initialItems={['Rod']}/>)

        const removeButton = getAllByText('Remover');

        fireEvent.click(removeButton[0]);

        await waitForElementToBeRemoved(() => {
            return getByText('Rod')
        })

        // await waitFor(() => {
        //     expect(queryByText('Rod')).not.toBeInTheDocument()
        // })
    })
})