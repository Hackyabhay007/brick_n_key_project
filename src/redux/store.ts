import { configureStore } from "@reduxjs/toolkit";
import heroSectionReducer from "./slices/heroSectionSlice";
import unlockSectionReducer from "./slices/unlockSectionSlice";
import whyChooseUsSectionReducer from "./slices/whyChooseUsSlice";
import headerSectionReducer from "./slices/headerSlice";
import popularSectionReducer from "./slices/popularSlice";
import propertyItemsReducer from "./slices/propertyItemSlice";
import luxuryListingItemsReducer from "./slices/luxuryListingSlice";
import brandSectionReducer from "./slices/brandSlice";
import detailPageReducer from "./slices/detailSlice";
import popularListingReducer from "./slices/popularListingSlice";
import peopleTrustUsReducer from "./slices/peopleTrust_usSlice";
import contactSectionReducer from "./slices/Contact_Section_Slice";



export const store = configureStore({
  reducer: {
    heroSection: heroSectionReducer,
    unlockSection: unlockSectionReducer,
    whyChooseUsSection: whyChooseUsSectionReducer,
    headerSection: headerSectionReducer,
    popularSection: popularSectionReducer,
    propertyItems : propertyItemsReducer,
    luxuryListingItems : luxuryListingItemsReducer,
    brandSection: brandSectionReducer,
    detailPage: detailPageReducer,
    popularListingSection: popularListingReducer,
    peopleTrustUsSection: peopleTrustUsReducer,
    contactSection: contactSectionReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
