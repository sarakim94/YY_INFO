export const state = () => ({
    title: 'EMPTY TITLE',
})

export const mutations = {
    SET_TITLE: function (state, text) {
      state.title = text
    },
  }

  