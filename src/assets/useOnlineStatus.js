import { useEffect, useState } from "react"
const useOnlineStatus = () => {
    const [OnlineStatus,SetOnlineStatus] = useState(true);

    useEffect(() => {
        window.addEventListener("offline", () => {
            SetOnlineStatus(false);
        });

        window.addEventListener("online", () =>{
            SetOnlineStatus(true);
        });
    },[]);

    return OnlineStatus;
};

export default useOnlineStatus;