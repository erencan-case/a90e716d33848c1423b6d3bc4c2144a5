import {createStore} from 'vuex'
import {version} from './../package.json';

const store = createStore({
    state: {
        version: '',
        currentStep: 'SelectHotel',
        currentHotel: null,
        hotels: [],
        order: {
            selectedAdultSize: 2,
            selectedChildSize: 0,
            card: {
                cardName: "",
                cardNumber: "",
                cardMonth: "",
                cardYear: "",
                cardCvv: "",
            }
        }
    },
    mutations: {
        initialiseStore(state) {
            // Check if the store exists
            if (localStorage.getItem('store')) {
                let store = JSON.parse(localStorage.getItem('store'));

                // Check the version stored against current. If different, don't
                // load the cached version
                if (store.version === version) {
                    this.replaceState(
                        Object.assign(state, store)
                    );
                } else {
                    state.version = version;
                }
            }
        },
        setHotels(state, payload) {
            state.hotels = payload
        },
        setCurrentHotel(state, payload) {
            state.currentHotel = payload
        },
        setOrder(state, payload) {
            state.order = {
                ...state.order,
                ...payload
            }
        },
        resetOrder(state) {
            state.order = {
                selectedAdultSize: 2,
                selectedChildSize: 0,
                card: {
                    cardName: "",
                    cardNumber: "",
                    cardMonth: "",
                    cardYear: "",
                    cardCvv: "",
                }
            }
        },
        setStep(state, payload) {
            state.currentStep = payload
        }
    },
    actions: {
        setStep({commit}, payload) {
            commit('setStep', payload)
        },
        getHotels({commit}) {
            fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels").then(async results => {
                let hotels = await results.json()
                commit('setHotels', hotels)
            })
        },
        selectHotel({commit}, payload) {
            fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details/" + payload).then(async results => {
                let currentHotel = await results.json()
                if (currentHotel.child_status === false) {
                    commit('setOrder', {selectedChildSize: 0})
                }
                commit('setCurrentHotel', currentHotel)
            })
        },
        saveHotel({commit}, payload) {
            commit('setOrder', payload)
            commit('setStep', "SelectScene")

        },
        saveScene({commit}, payload) {
            commit('setOrder', payload)
            commit('setStep', "MakePayment")
        },
        makePayment({commit}, payload) {
            commit('setOrder', payload)
            let postData = {
                "hotel_id": payload.selectHotel,
                "start_date": payload.selectedDates[0],
                "end_date": payload.selectedDates[0],
                "adult": payload.selectedAdultSize,
                "child": payload.selectedChildSize,
                "room_type": payload.selectedRoomType,
                "room_scenic": payload.selectedRoomScenic,
                "price": payload.totalPrice,
                "coupon_code": payload.discountCode,
                "card_name": payload.card.cardName,
                "card_number": payload.card.cardNumber,
                "card_date_month": payload.card.cardMonth,
                "card_date_year": payload.card.cardYear,
                "card_cvv": payload.card.cardCvv
            }
            if (payload.id) {
                return new Promise(resolve => {
                    fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/" + payload.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    }).then(async results => {
                        let result = await results.json()
                        commit('setOrder', {id: result.id})
                        resolve(results.status)
                    })
                })
            }
            return new Promise(resolve => {
                fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                }).then(async results => {
                    let result = await results.json()
                    commit('setOrder', {id: result.id})
                    resolve(results.status)
                })
            })
        },
        applyCode({commit}, payload) {
            return new Promise(resolve => {
                fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=" + payload).then(async results => {
                    let discountCode = await results.json()
                    if (discountCode.length) {
                        console.log(new Date(discountCode[0].expiration_at), new Date())
                        if (new Date(discountCode[0].expiration_at) > new Date()) {
                            commit('setOrder', {discount: discountCode[0]})
                            resolve(false)
                        } else {
                            resolve("Kuponun süresi dolmuş.")
                        }
                    } else {
                        resolve("Kupon kodu geçersiz.")
                    }
                })
            })
        },
        removeDiscount({commit}) {
            commit('setOrder', {discount: null})
        },
        newReservation({commit}) {
            commit('resetOrder')
            commit('setStep', 'SelectHotel')
        },
        cancelReservation({commit}, payload) {
            return new Promise(resolve => {
                fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/" + payload.id, {
                    method: 'DELETE'
                }).then(async results => {
                    resolve(results.status)
                })
            })
        }
    }
})

store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
});

export default store
