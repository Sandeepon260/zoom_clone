import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

const MAX_RETRIES = 5;

export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call>()
    const [isCallLoading, setIsCallLoading] = useState(true)

    /* RETRIES */
    const [error, setError] = useState<string | null>(null)
    /* RETRIES */

    const client = useStreamVideoClient();

    useEffect(() => {
        if(!client) return;
        const loadCall = async () => {
            try {
                const { calls } = await client?.queryCalls({
                    filter_conditions:{
                        id
                    }
                });
                if (calls.length > 0) setCall(calls[0]);
                setIsCallLoading(false);
            } catch(error) {
                console.error(error);
                setIsCallLoading(false);
            }
        };
        loadCall();
        
    }, [client, id]);
    return { call, isCallLoading};

}