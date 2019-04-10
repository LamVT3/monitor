import * as ACTION_TYPES from './ActionTypes'

export const dataTable = (data) => {
    return {
        type: ACTION_TYPES.HELIOS_DATA_TRACKING,
        data: data
    }
};