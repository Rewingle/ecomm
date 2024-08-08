import { actionResponseType } from '@/app/types';


const actionResponse = (props: actionResponseType ):actionResponseType => {
    return (
        {
            success: props.success,
            message: props.message,
            data: props.data
        }
    )
}

export default actionResponse