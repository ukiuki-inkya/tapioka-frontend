export const state = () => ({
  result: {
    yasashi: 0.00,
    reisei: 0.00,
    uchiki: 0.00,
    narushisuto: 0.00,
    genki: 0.00
  }
})

export const mutations = {
  setResultState(state, result) {
    state.result = result.data
  }
}
