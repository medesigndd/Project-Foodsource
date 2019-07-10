
export const initialStateAuth = {
    role: '',
    authenticated: false,
    user_data: {
        full_name: '',
        default_customer: {
            cust_code: '',
            cust_name: '',
            ship_brand_name: '',
            ship_to_name: '',
            cust_img: '',
        },
        list_customer: [],
    },
};

export const initialStateShop = {
    showTab: {
        on: 1,
        value: 'CatalogList',
        transitionName: 'tabOne',
    },

    allSKU: [],
    extraFee: [],
    showCartBalance: 0,
    showItemDetail: {},

    orderDeliveryDate: '',
    orderDescription: '',
    orderCustomerPONumber: '',
    orderCustomerPOIMG: '',
    allOrder: [],
    orderExtraFee: {},
    confirmOrderSuccess: false,
    orderNumberSuccess: '',

    ordersHistory: [],
};

export const initialStateAnalytic = {
    salesByProducts: [],
    salesBySeller: [],
    salesByCustomer: [],
};