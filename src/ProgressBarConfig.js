export const getProgressBarOptions = (totalSteps) => ({
    complete: '=',
    incomplete: ' ',
    total: totalSteps,
    width: 30
})

export const progressBarPattern = '    [:bar] [:status] :current/:total :percent :etas'