import {createContext} from "react";
import {useSelector} from "react-redux";


export const ProfileContext = createContext({})

const ProfileProvider = ({
                          children
                      }) => {
    const {
        isAuthenticated,
    } = useSelector(({auth}) => ({
        isAuthenticated: auth.isAuthenticated,
    }));


    return (
        <ProfileContext.Provider
            value={{
                isAuthenticated: isAuthenticated,
            }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;