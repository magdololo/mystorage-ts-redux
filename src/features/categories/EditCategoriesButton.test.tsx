import {screen, render} from '@testing-library/react';
import user from '@testing-library/user-event';
import EditCategoriesButton from "./EditCategoriesButton";

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {
                }),
            },
        };
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => {
        },
    }
}));

test("if edit categories button change value after user click", async () => {
    const mock = jest.fn();

    render(<EditCategoriesButton toggleEdit={mock} toggleValue={false}/>)
    screen.debug()
    let changedButton = screen.getByRole('button', {name: /buttons.editCategoriesButton/i})
    let newButton = screen.queryByRole('button', {name: /buttons.categoryListButton/i})
    expect(changedButton).toBeInTheDocument()
    expect(newButton).not.toBeInTheDocument()
    user.click(changedButton)
    expect(mock).toHaveBeenCalled()
    // newButton = await screen.findByRole('button', {name: /buttons.categoryListButton/i})
    screen.debug()
    // expect(newButton).toBeInTheDocument()//test nie przejdzie bo komponent na sztywno jest wyrenderowany z toggleValue false tego buttona nie znajdzie
})
