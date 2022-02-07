import {createStore} from 'vuex'

const store = createStore({
    state: {
        currentStep: 'SelectHotel',
        currentHotel: null,
        hotels: [],
        order: {}
    },
    actions: {
        setStep({state}, payload) {
            state.currentStep = payload
        },
        getHotels({state}) {
            fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels").then(async results => {
                state.hotels = await results.json()
            })
        },
        selectHotel({state}, payload) {
            fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details/" + payload).then(async results => {
                state.currentHotel = await results.json()
            })
        },
        saveHotel({state}, payload) {
            state.order = {
                ...state.order,
                ...payload
            }
            state.currentStep = "SelectScene"
        },
        saveScene({state}, payload) {
            state.order = {
                ...state.order,
                ...payload
            }
            state.currentStep = "MakePayment"
        }
    }
})

export default store