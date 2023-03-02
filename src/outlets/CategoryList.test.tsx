import {screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import CategoryList from "./CategoryList";
import setupStore from "../app/store";
import {addCategory} from "../slices/categoriesSlice";

import {renderWithProviders} from "../utils/utils-for-tests";
import {setCurrentStorage} from "../slices/usersSlice";


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
const renderedComponentWithData = () => {
    const store = setupStore()
    store.dispatch(addCategory({
        id: '1',
        path: "slodycze",
        url: "../images/search_screen_1-ImResizer.webp",
        title: 'słodycze',
        user: '1',
        required: 'false',
        type: 'storage'
    }))

    store.dispatch(addCategory({
        id: '2',
        path: "warzywa",
        url: "../images/search_screen_en-ImResizer.webp",
        title: 'warzywa',
        user: '1',
        required: 'true',
        type: 'storage'
    }))
    store.dispatch(addCategory({
        id: '3',
        path: "makarony",
        url: "../images/search_screen_en-ImResizer.webp",
        title: 'makarony',
        user: '1',
        required: 'false',
        type: 'storage'
    }))
    store.dispatch(addCategory({
        id: '4',
        path: "kasze",
        url: "../images/search_screen_4-ImResizer.webp",
        title: 'kasze',
        user: '1',
        required: 'false',
        type: 'storage'
    }))
    store.dispatch(addCategory({
        id: '5',
        path: "przyprawy",
        url: "../images/search_screen_5-ImResizer.webp",
        title: 'przyprawy',
        user: '1',
        required: 'true',
        type: 'storage'
    }))
    store.dispatch(addCategory({
        id: '6',
        path: "slodycze",
        url: "../images/search_screen_1-ImResizer.webp",
        title: 'słodycze',
        user: '2',
        required: 'false',
        type: 'storage'
    }))
    store.dispatch(setCurrentStorage('1'))

    renderWithProviders(<CategoryList/>, {store})

}
test('5 categories display on the screen', () => {

    renderedComponentWithData()
    const categoriesPaths = screen.getAllByRole('link');

    //Assertion - make sure the component is doing what we expect it to do
    expect(categoriesPaths).toHaveLength(5);
})
test(' display only not required categories after click edit categories button', async () => {
    renderedComponentWithData()
    const editCategoriesButton = screen.getByRole('button', {name: /buttons.editCategoriesButton/i})
    const addNewCategoryButton = screen.getByRole('button', {name: /buttons.addCategory/i})
    let backToCategoryListButton = screen.queryByRole('button', {name: /buttons.categoryListButton/i})
    expect(editCategoriesButton).toBeInTheDocument()
    expect(addNewCategoryButton).toBeInTheDocument()
    expect(backToCategoryListButton).not.toBeInTheDocument()
    user.click(editCategoriesButton)
    const categoriesPaths = screen.getAllByRole('link');
    backToCategoryListButton = await screen.findByRole('button', {name: /buttons.categoryListButton/i})
    expect(categoriesPaths).toHaveLength(3);

    expect(backToCategoryListButton).toBeInTheDocument()
    expect(addNewCategoryButton).not.toBeInTheDocument()

})