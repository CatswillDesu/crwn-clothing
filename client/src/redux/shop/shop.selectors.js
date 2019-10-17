import { createSelector } from 'reselect';

const selectShop = state => state.shop;

const selectShopCollections = createSelector(
    selectShop,
    shop => shop.collections
)

export const selectShopCollectionsForPreview = createSelector(
    selectShop,
    shop => (shop.collections ? Object.keys(shop.collections).map(key => shop.collections[key]) : null)
)

export const selectShopCollection = collectionUrlParam => (
    createSelector(
        selectShopCollections,
        collections => (collections ? collections[collectionUrlParam] : null)
    )
)

export const selectIsCollectionsLoaded = createSelector(
    selectShop,
    shop => !!shop.collections
)