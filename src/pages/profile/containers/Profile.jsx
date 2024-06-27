import React, { useEffect, useState } from 'react';
import Button from "../../../components/Button";
import axios from "axios";
import config from "../../../config";
import {useIntl} from "react-intl";

function Profile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { SERVER } = config;
    const {formatMessage} = useIntl();

    useEffect(() => {
        axios.get(SERVER + '/api/profile')
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
        window.location.href = SERVER + '/oauth/authenticate';
    };

    return (
        <div>
            {isAuthenticated ?
                <div>
                    <h1>Profile</h1>
                    <p>Name: {user?.name}</p>
                    <p>{formatMessage({
                        id: "name"
                    })}: {user?.email}</p>
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
