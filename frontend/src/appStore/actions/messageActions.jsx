import axios from '../../axios.config'
import { loadMessage } from '../reducers/messageSlice'

export const getMessages = (id) => async (dispatch, getState) =>{
    try {
        const {data} = await axios.get(`/api/message/messages?id=${id}`)
        dispatch(loadMessage(data.messages))
        console.log(getState())
    } catch (error) {
        console.log(error)
    }
}