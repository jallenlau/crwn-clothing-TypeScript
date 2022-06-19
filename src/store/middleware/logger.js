const logger = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currenState: ', store.getState());

    next(action);

    console.log('next: ', store.getState());
}