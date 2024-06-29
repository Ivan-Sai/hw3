import React, { useEffect, useState } from 'react';
import Button from "../../../components/Button";
import axios from "axios";
import config from "../../../config";
import {useIntl} from "react-intl";

function Profile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const {formatMessage} = useIntl();

    useEffect(() => {
        axios.get('/api/profile')
            .then(response => {
                setIsAuthenticated(true);
                setUser(response);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setIsAuthenticated(false);
                }
            });
    }, []);

    const handleLogin = () => {
        window.location.href = '/oauth/authenticate';
    };

    const handleLogout = () => {
        document.cookie = "SESSION-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthenticated(false);
    };

    return (
        <div>
            {isAuthenticated ?
                <div>
                    <h1>Profile</h1>
                    <p>{formatMessage({
                        id: "name"
                    })}: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <Button onClick={handleLogout}>{formatMessage({
                        id: "ButtonLogout"
                    })}</Button>
                </div>
                :
                <div>
                    <p>
                        {formatMessage({
                            id: 'NotAuthenticated'
                        })}
                    </p>
                    <Button onClick={handleLogin}>{formatMessage({
                        id: "ButtonAuthenticate"
                    })}</Button>
                </div>
            }
        </div>
    );
}

export default Profile;